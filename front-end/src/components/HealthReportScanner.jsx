import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function HealthReportScanner() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please upload a blood report image or PDF.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("report", file);

      const response = await fetch(`${API_BASE_URL}/api/gemini/health-report`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to scan the blood report.");
      }

      setResult(data.extracted);
      localStorage.setItem("jeevanLinkHealthReport", JSON.stringify(data.extracted));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemini-panel">
      <div className="gemini-header">
        <div className="gemini-icon">🩺</div>
        <div>
          <h3>AI Health Report Scanner</h3>
          <p>Upload a lab report image or PDF to extract Hemoglobin and Blood Pressure.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="gemini-form">
        <label className="upload-box">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          <span>{file ? file.name : "Choose blood test report"}</span>
        </label>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Scanning..." : "Scan Report"}
        </button>
      </form>

      {error && <div className="gemini-error">{error}</div>}

      {result && (
        <div className="result-card">
          <h4>Extracted Metrics</h4>
          <div className="metric-grid">
            <div className="metric-box">
              <span>Hemoglobin</span>
              <strong>{result.hemoglobin}</strong>
            </div>
            <div className="metric-box">
              <span>Blood Pressure</span>
              <strong>{result.bloodPressure}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthReportScanner;
