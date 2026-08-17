import { useState } from "react";

export default function DonationHistory() {
  const [donations] = useState([
    {
      id: 1,
      date: "14 Apr 2026",
      hospital: "Jeevan Hospital",
      location: "Tadepalligudem",
      bloodType: "O+",
      amount: "450 ml",
      result: "✓ Successful",
      status: "Completed",
      vitals: { hemoglobin: "14.2 g/dL", bloodPressure: "120/80 mmHg", pulse: "72 bpm" }
    },
    {
      id: 2,
      date: "08 Mar 2026",
      hospital: "City Care Clinic",
      location: "Bhimavaram",
      bloodType: "O+",
      amount: "450 ml",
      result: "✓ Successful",
      status: "Completed",
      vitals: { hemoglobin: "14.5 g/dL", bloodPressure: "118/78 mmHg", pulse: "70 bpm" }
    },
    {
      id: 3,
      date: "12 Feb 2026",
      hospital: "Sanjivani Hospital",
      location: "Tanuku",
      bloodType: "O+",
      amount: "450 ml",
      result: "✓ Successful",
      status: "Completed",
      vitals: { hemoglobin: "14.0 g/dL", bloodPressure: "119/79 mmHg", pulse: "71 bpm" }
    },
    {
      id: 4,
      date: "05 Jan 2026",
      hospital: "Apollo Clinic",
      location: "Vijayawada",
      bloodType: "O+",
      amount: "450 ml",
      result: "✓ Successful",
      status: "Completed",
      vitals: { hemoglobin: "13.8 g/dL", bloodPressure: "121/80 mmHg", pulse: "73 bpm" }
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#1a1a1a", fontSize: "28px" }}>Donation History</h1>
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
          <i className="fa-solid fa-print"></i> Print
        </button>
      </div>

      <div style={{ marginBottom: "20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>4</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Total Donations</div>
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>1,800 ml</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Blood Donated</div>
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>12</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Lives Impacted</div>
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>Gold</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Donor Tier</div>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5c5ca", background: "#f8f9fa" }}>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Date</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Hospital</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Location</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Blood Type</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Amount</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Vitals</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} style={{ borderBottom: "1px solid #e5e5e5" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
                <td style={{ padding: "12px" }}><strong>{donation.date}</strong></td>
                <td style={{ padding: "12px" }}>{donation.hospital}</td>
                <td style={{ padding: "12px" }}>{donation.location}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ background: "#FFE5E5", color: "#b51f3a", padding: "4px 8px", borderRadius: "4px", fontWeight: "600" }}>
                    {donation.bloodType}
                  </span>
                </td>
                <td style={{ padding: "12px" }}><strong>{donation.amount}</strong></td>
                <td style={{ padding: "12px" }}>
                  <button style={{
                    padding: "6px 12px",
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    View
                  </button>
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ color: "#2e7d32", fontWeight: "600" }}>✓ {donation.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", padding: "15px", background: "#e8f5e9", borderRadius: "8px", fontSize: "13px", color: "#2e7d32" }}>
        <p><strong>💚 Thank you!</strong> Your donations have helped save 12 lives. You're eligible to donate again after 56 days from your last donation.</p>
      </div>
    </div>
  );
}
