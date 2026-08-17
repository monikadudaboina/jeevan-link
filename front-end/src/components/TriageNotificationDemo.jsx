import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function TriageNotificationDemo() {
  const [form, setForm] = useState({
    hospitalId: "hospital-001",
    hospitalName: "Jeevan Care Hospital",
    patientName: "Ravi Kumar",
    bloodGroup: "O+",
    location: "Bhimavaram",
    doctorNotes: "Patient experiencing severe blood loss after accident. Needs urgent O+ transfusion. Hemoglobin low and condition unstable.",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/gemini/triage-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to triage the request.");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationResponse = async (notificationId, donorId, action) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gemini/notification-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ donorId, notificationId, action }),
      });

      const data = await response.json();
      console.log("Notification response:", data);
    } catch (error) {
      console.error("Notification response error:", error);
    }
  };

  return (
    <div className="gemini-panel">
      <div className="gemini-header">
        <div className="gemini-icon">🚨</div>
        <div>
          <h3>Smart Triage & Notification</h3>
          <p>Submit hospital notes to estimate urgency and notify matching donors.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="gemini-form">
        <div className="field-grid">
          <input name="hospitalName" value={form.hospitalName} onChange={handleChange} placeholder="Hospital name" />
          <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Patient name" />
          <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="Blood group" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        </div>

        <textarea
          name="doctorNotes"
          value={form.doctorNotes}
          onChange={handleChange}
          rows={6}
          placeholder="Doctor notes..."
        />

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Analyzing..." : "Send to Gemini"}
        </button>
      </form>

      {result && !result.error && (
        <div className="result-card">
          <h4>AI Triage Summary</h4>
          <p><strong>Urgency Score:</strong> {result.triage.urgencyScore}/10</p>
          <p><strong>Priority:</strong> {result.triage.priorityLabel}</p>
          <p><strong>Radius:</strong> {result.searchRadiusKm} km</p>
          <p><strong>Reason:</strong> {result.triage.reason}</p>

          <div className="notification-list">
            {result.notifications?.map((notification) => (
              <div key={notification.id} className="notification-item">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <div className="notification-actions">
                  <button type="button" onClick={() => handleNotificationResponse(notification.id, notification.donorId, "Interested")}>Interested</button>
                  <button type="button" className="secondary" onClick={() => handleNotificationResponse(notification.id, notification.donorId, "Not Interested")}>Not Interested</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result?.error && <div className="gemini-error">{result.error}</div>}
    </div>
  );
}

export default TriageNotificationDemo;
