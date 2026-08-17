const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const GEMINI_MODEL_CANDIDATES = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

const priorityMap = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"],
};

const donorNotificationQueue = [];

function buildGeminiPayload({ prompt, imageBuffer = null, mimeType = null, systemInstruction = "" }) {
  const parts = [];

  if (systemInstruction) {
    parts.push({ text: systemInstruction });
  }

  if (imageBuffer && mimeType) {
    parts.push({ inline_data: { mime_type: mimeType, data: imageBuffer.toString("base64") } });
  }

  parts.push({ text: prompt });

  return {
    system_instruction: systemInstruction
      ? {
          parts: [{ text: systemInstruction }],
        }
      : undefined,
    contents: [
      {
        role: "user",
        parts,
      },
    ],
  };
}

async function callGemini({ prompt, imageBuffer = null, mimeType = null, systemInstruction = "" }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Add it to your .env file.");
  }

  let lastError = null;

  for (const model of GEMINI_MODEL_CANDIDATES) {
    try {
      const payload = buildGeminiPayload({ prompt, imageBuffer, mimeType, systemInstruction });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`Gemini API error for ${model}: ${response.status} - ${errorText}`);

        if (response.status !== 404) {
          throw lastError;
        }

        continue;
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .join("")
        .trim();

      if (!rawText) {
        throw new Error(`Gemini returned an empty response for ${model}.`);
      }

      return rawText;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Gemini API request failed.");
}

function extractJsonFromText(text) {
  const cleaned = text.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end < start) {
    return JSON.parse(cleaned);
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// =========================
// 1) SMART TRIAGE & NOTIFICATION SYSTEM
// =========================
router.post("/triage-request", async (req, res) => {
  try {
    const {
      hospitalId,
      hospitalName,
      patientName,
      bloodGroup,
      doctorNotes,
      location,
      searchRadiusKm = 15,
    } = req.body;

    if (!doctorNotes || !hospitalId || !bloodGroup) {
      return res.status(400).json({
        message: "hospitalId, bloodGroup and doctorNotes are required.",
      });
    }

    const triagePrompt = `
      You are an emergency blood demand triage assistant for Jeevan Link.
      Read the doctor's notes and estimate a blood donation urgency score from 1 to 10.

      Return valid JSON only with this exact schema:
      {
        "urgencyScore": 1-10,
        "priorityLabel": "Low|Moderate|High|Critical",
        "reason": "short explanation",
        "recommendedRadiusKm": number
      }

      Rules:
      - Low urgency: 1-3
      - Moderate: 4-6
      - High: 7-8
      - Critical: 9-10
      - If notes mention trauma, emergency surgery, hemorrhage, severe anemia, shock, organ failure, postpartum bleeding, childbirth complications, or critical blood loss, raise urgency.
      - If urgencyScore >= 8, make recommendedRadiusKm at least 35.
      - Use humane, clinical reasoning.

      Doctor notes:
      ${doctorNotes}
    `;

    const rawAnalysis = await callGemini({
      prompt: triagePrompt,
      systemInstruction: "You are a strict clinical triage assistant. Respond only with valid JSON matching the schema exactly.",
    });

    const triageResult = extractJsonFromText(rawAnalysis);
    const urgencyScore = clamp(Number(triageResult.urgencyScore) || 1, 1, 10);
    const priorityLabel = triageResult.priorityLabel || (urgencyScore >= 8 ? "Critical" : urgencyScore >= 5 ? "High" : urgencyScore >= 3 ? "Moderate" : "Low");
    const recommendedRadiusKm = Math.max(
      Number(triageResult.recommendedRadiusKm) || searchRadiusKm,
      urgencyScore >= 8 ? 35 : searchRadiusKm
    );

    const compatibleGroups = priorityMap[bloodGroup] || [bloodGroup];
    const donors = await User.find({
      role: "donor",
      isAvailable: true,
      bloodGroup: { $in: compatibleGroups },
    }).limit(25);

    const notifications = donors.map((donor) => {
      const title = urgencyScore >= 8 ? "Urgent blood request" : "Blood donation opportunity";
      const message = `${hospitalName || "A hospital"} needs ${bloodGroup} blood in ${location || "your area"}. ${patientName ? `Patient: ${patientName}.` : ""}`;
      const notification = {
        id: `${Date.now()}-${donor._id}`,
        donorId: donor._id,
        donorName: donor.name,
        donorEmail: donor.email,
        title,
        message,
        actionButtons: ["Interested", "Not Interested"],
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      donorNotificationQueue.push(notification);
      return notification;
    });

    res.status(200).json({
      success: true,
      triage: {
        urgencyScore,
        priorityLabel,
        reason: triageResult.reason || "Critical blood demand identified.",
        recommendedRadiusKm,
      },
      searchRadiusKm: recommendedRadiusKm,
      matchedDonors: donors.length,
      notifications,
    });
  } catch (error) {
    console.error("Triage request error:", error);
    res.status(500).json({
      message: error.message || "Failed to triage blood request.",
    });
  }
});

router.post("/notification-response", async (req, res) => {
  try {
    const { donorId, notificationId, action } = req.body;

    if (!donorId || !notificationId || !action) {
      return res.status(400).json({ message: "donorId, notificationId and action are required." });
    }

    const notification = donorNotificationQueue.find(
      (item) => item.donorId.toString() === donorId.toString() && item.id === notificationId
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    const normalizedAction = action === "Interested" ? "Interested" : "Not Interested";
    notification.status = normalizedAction;
    notification.respondedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: `Donor marked as ${normalizedAction}.`,
      notification,
    });
  } catch (error) {
    console.error("Notification response error:", error);
    res.status(500).json({
      message: error.message || "Failed to update donor response.",
    });
  }
});

// =========================
// 2) AI HEALTH REPORT SCANNER
// =========================
router.post("/health-report", upload.single("report"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a blood report image or PDF." });
    }

    const mimeType = req.file.mimetype;
    const buffer = req.file.buffer;

    const prompt = `
      Extract only the following values from this medical report.
      Return valid JSON only in this exact format:
      {
        "hemoglobin": "value with unit if available",
        "bloodPressure": "value with unit if available"
      }

      Important:
      - If a value is not found, return "Not found".
      - Do not include any extra fields or explanation.
      - Do not guess beyond the visible medical report.
      - Only extract Hemoglobin and Blood Pressure.
    `;

    const rawText = await callGemini({
      prompt,
      imageBuffer: buffer,
      mimeType,
      systemInstruction: "You are a document extraction assistant. Read medical report images or PDFs and return valid JSON only.",
    });

    const parsed = extractJsonFromText(rawText);

    res.status(200).json({
      success: true,
      extracted: {
        hemoglobin: parsed.hemoglobin || "Not found",
        bloodPressure: parsed.bloodPressure || "Not found",
      },
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error("Health report scan error:", error);
    res.status(500).json({
      message: error.message || "Failed to scan the blood report.",
    });
  }
});

// =========================
// 3) AUTOMATED ELIGIBILITY ASSISTANT
// =========================
router.post("/eligibility-check", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: "A donation question is required." });
    }

    const systemInstruction = `
      You are Jeevan Link's blood donation eligibility assistant.
      Your only responsibility is to answer questions about blood donation eligibility based on standard donor safety guidelines.

      You must:
      - Only answer questions related to blood donation eligibility, deferrals, waiting periods, donor safety, medications, illness, surgery, pregnancy, travel, tattoos/piercings, iron levels, or similar donation rules.
      - Reject any non-medical or off-topic question.
      - If the user asks something unrelated to donation eligibility, respond exactly:
        "I can only help with blood donation eligibility and donor safety questions. Please ask about donation rules, deferrals, or recovery periods."
      - Do not diagnose diseases or give personal medical advice outside blood donation screening.
      - If unclear, advise the user to consult a licensed physician or their local blood center.
      - Keep responses concise, clinically safe, and practical.
      - Mention the waiting period or rule whenever relevant.
      - Do not mention you are an AI. Do not use markdown tables.
    `;

    const answer = await callGemini({
      prompt: `User question: ${question}`,
      systemInstruction,
    });

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Eligibility checker error:", error);
    res.status(500).json({
      message: error.message || "Failed to evaluate the donation eligibility question.",
    });
  }
});

module.exports = router;
