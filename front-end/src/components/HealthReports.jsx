import { useState } from "react";

export default function HealthReports() {
  const [reports] = useState([
    {
      id: 1,
      date: "14 Apr 2026",
      type: "Pre-Donation Health Check",
      hospital: "Jeevan Hospital",
      status: "Normal",
      doctor: "Dr. Suresh Kumar",
      vitals: {
        hemoglobin: "14.2 g/dL",
        bloodPressure: "120/80 mmHg",
        pulse: "72 bpm",
        temperature: "98.6°F",
        weight: "75 kg"
      },
      notes: "All vitals normal. Eligible to donate."
    },
    {
      id: 2,
      date: "08 Mar 2026",
      type: "Pre-Donation Health Check",
      hospital: "City Care Clinic",
      status: "Normal",
      doctor: "Dr. Priya Sharma",
      vitals: {
        hemoglobin: "14.5 g/dL",
        bloodPressure: "118/78 mmHg",
        pulse: "70 bpm",
        temperature: "98.4°F",
        weight: "75.5 kg"
      },
      notes: "All vitals normal. Excellent health condition."
    },
    {
      id: 3,
      date: "12 Feb 2026",
      type: "Pre-Donation Health Check",
      hospital: "Sanjivani Hospital",
      status: "Normal",
      doctor: "Dr. Rajesh Patel",
      vitals: {
        hemoglobin: "14.0 g/dL",
        bloodPressure: "119/79 mmHg",
        pulse: "71 bpm",
        temperature: "98.5°F",
        weight: "74.8 kg"
      },
      notes: "All vitals normal. Keep maintaining good health."
    },
    {
      id: 4,
      date: "05 Jan 2026",
      type: "Annual Health Report",
      hospital: "Apollo Clinic",
      status: "Excellent",
      doctor: "Dr. Anjali Verma",
      vitals: {
        hemoglobin: "13.8 g/dL",
        bloodPressure: "121/80 mmHg",
        pulse: "73 bpm",
        temperature: "98.6°F",
        weight: "75.2 kg"
      },
      notes: "Annual checkup complete. All parameters within normal range."
    }
  ]);

  const [expandedReport, setExpandedReport] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (reportId) => {
    alert(`Downloading report ${reportId}...`);
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#1a1a1a", fontSize: "28px" }}>Health Reports</h1>
        <button 
          onClick={handlePrint}
          style={{
            padding: "10px 20px",
            background: "#b51f3a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          <i className="fa-solid fa-print"></i> Print All
        </button>
      </div>

      <div style={{ marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>4</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Total Reports</div>
        </div>
        <div style={{ padding: "15px", background: "#e8f5e9", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#2e7d32" }}>4</div>
          <div style={{ fontSize: "13px", color: "#2e7d32", marginTop: "5px" }}>Normal Status</div>
        </div>
        <div style={{ padding: "15px", background: "#fff3e0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#f57c00" }}>Latest</div>
          <div style={{ fontSize: "13px", color: "#f57c00", marginTop: "5px" }}>14 Apr 2026</div>
        </div>
      </div>

      <div style={{ display: "grid", gap: "15px" }}>
        {reports.map((report) => (
          <div key={report.id} style={{
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            padding: "15px",
            background: "#fafafa",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#fafafa"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: "0 0 8px 0", color: "#1a1a1a", fontSize: "16px" }}>
                  {report.type}
                </h3>
                <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "13px" }}>
                  <i className="fa-solid fa-hospital"></i> {report.hospital} | {report.date} | Dr. {report.doctor.split(" ").pop()}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{
                  background: report.status === "Excellent" ? "#e8f5e9" : "#e8f5e9",
                  color: report.status === "Excellent" ? "#2e7d32" : "#2e7d32",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  ✓ {report.status}
                </span>
                <button 
                  onClick={() => handleDownload(report.id)}
                  style={{
                    padding: "8px 12px",
                    background: "#b51f3a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}>
                  <i className="fa-solid fa-download"></i> Download
                </button>
                <button 
                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                  style={{
                    padding: "8px 12px",
                    background: "#f0f0f0",
                    color: "#1a1a1a",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}>
                  <i className={`fa-solid fa-chevron-${expandedReport === report.id ? 'up' : 'down'}`}></i> Details
                </button>
              </div>
            </div>

            {expandedReport === report.id && (
              <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #e5e5e5" }}>
                <h4 style={{ margin: "0 0 10px 0", color: "#1a1a1a" }}>Vitals</h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "15px" }}>
                  {Object.entries(report.vitals).map(([key, value]) => (
                    <div key={key} style={{ background: "#fff", padding: "10px", borderRadius: "6px", border: "1px solid #e5e5e5" }}>
                      <small style={{ color: "#666", display: "block", marginBottom: "4px" }}>
                        {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      </small>
                      <strong style={{ color: "#b51f3a", fontSize: "16px" }}>{value}</strong>
                    </div>
                  ))}
                </div>
                <h4 style={{ margin: "0 0 10px 0", color: "#1a1a1a" }}>Doctor's Notes</h4>
                <p style={{ margin: "0", color: "#666", fontSize: "13px", lineHeight: "1.5" }}>
                  {report.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", padding: "15px", background: "#e3f2fd", borderRadius: "8px", fontSize: "13px", color: "#1565c0" }}>
        <p><strong>ℹ️ Note:</strong> All your health reports are securely stored and accessible anytime. Share them with doctors or hospitals as needed.</p>
      </div>
    </div>
  );
}
