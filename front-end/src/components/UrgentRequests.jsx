import { useState } from "react";

export default function UrgentRequests() {
  const [requests] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      hospital: "Jeevan Hospital",
      bloodType: "O+",
      location: "Tadepalligudem",
      distance: "18 km away",
      requiredBy: "Today, 6:00 PM",
      urgency: "High",
      status: "Active"
    },
    {
      id: 2,
      name: "Emergency Surgery",
      hospital: "City Care Clinic",
      bloodType: "B-",
      location: "Bhimavaram",
      distance: "2.5 km away",
      requiredBy: "Today, 8:00 PM",
      urgency: "Critical",
      status: "Active"
    },
    {
      id: 3,
      name: "Accident Trauma",
      hospital: "Sanjivani Hospital",
      bloodType: "AB+",
      location: "Tanuku",
      distance: "32 km away",
      requiredBy: "ASAP",
      urgency: "Critical",
      status: "Active"
    },
    {
      id: 4,
      name: "Post-Surgery",
      hospital: "Apollo Clinic",
      bloodType: "O+",
      location: "Vijayawada",
      distance: "45 km away",
      requiredBy: "Tomorrow, 10:00 AM",
      urgency: "Medium",
      status: "Active"
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case "Critical": return "#E63946";
      case "High": return "#F77F00";
      case "Medium": return "#FFB703";
      default: return "#06D6A0";
    }
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#1a1a1a", fontSize: "28px" }}>Urgent Requests Near You</h1>
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

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5c5ca", background: "#f8f9fa" }}>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Patient / Hospital</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Blood Type</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Location</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Distance</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Required By</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Urgency</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: "1px solid #e5e5e5", transition: "background 0.2s" }} 
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "white"}>
                <td style={{ padding: "12px" }}>
                  <div><strong style={{ color: "#b51f3a" }}>{req.name}</strong></div>
                  <small style={{ color: "#666" }}>{req.hospital}</small>
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{ 
                    background: "#FFE5E5", 
                    color: "#b51f3a", 
                    padding: "4px 8px", 
                    borderRadius: "4px",
                    fontWeight: "600"
                  }}>{req.bloodType}</span>
                </td>
                <td style={{ padding: "12px" }}><strong>{req.location}</strong></td>
                <td style={{ padding: "12px" }}>{req.distance}</td>
                <td style={{ padding: "12px", color: getUrgencyColor(req.urgency), fontWeight: "600" }}>
                  {req.requiredBy}
                </td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    background: getUrgencyColor(req.urgency),
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {req.urgency}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <button style={{
                    padding: "6px 12px",
                    background: "#b51f3a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    Accept
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "20px", padding: "15px", background: "#f0f0f0", borderRadius: "8px", fontSize: "13px", color: "#666" }}>
        <p><strong>📍 Tip:</strong> You can filter requests by blood type and location to find the most convenient donations.</p>
      </div>
    </div>
  );
}
