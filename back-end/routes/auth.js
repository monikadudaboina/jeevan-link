const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// =========================
// REGISTER
// =========================

router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);
   const {
  name,
  email,
  password,
  role,
  phone,
  bloodGroup,
  location,
} = req.body || {};

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password and role are required",
      });
    }

    if (!["hospital", "donor"].includes(role)) {
      return res.status(400).json({
        message: "Role must be hospital or donor",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone: phone || "",
      bloodGroup: role === "donor" ? bloodGroup || "" : "",
      location: location || "",
    });

    res.status(201).json({
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// LOGIN
// =========================

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email, password or account type",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email, password or account type",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        location: user.location,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// =========================
// TEST ROUTE
// =========================

router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes are working",
  });
});


module.exports = router;