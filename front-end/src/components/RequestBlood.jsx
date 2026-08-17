import { useState } from "react";

export default function RequestBlood() {
  const [formData, setFormData] = useState({
    bloodType: "O+",
    quantity: "450",
    patientName: "",
    requiredBy: "",
    notes: ""
  });

  const [requests, setRequests] = useState([
    {
      id: 1,
      date: "15 Apr 2026",
      patientName: "Ramesh Kumar",
      bloodType: "O+",
      quantity: "450 ml",
      requiredBy: "Today, 6:00 PM",
      status: "Fulfilled",
      assignedDonor: "Monika D"
    },
    {
      id: 2,
      date: "14 Apr 2026",
      patientName: "Accident Trauma",
      bloodType: "B-",
      quantity: "900 ml",
      requiredBy: "Today, 2:00 PM",
      status: "Pending",
      assignedDonor: "Awaiting Match"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = () => {
    if (!formData.patientName || !formData.requiredBy) {
      alert("Please fill all required fields");
      return;
    }

    const newRequest = {
      id: requests.length + 1,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      patientName: formData.patientName,
      bloodType: formData.bloodType,
      quantity: formData.quantity + " ml",
      requiredBy: formData.requiredBy,
      status: "Pending",
      assignedDonor: "Awaiting Match"
    };

    setRequests([...requests, newRequest]);
    setFormData({
      bloodType: "O+",
      quantity: "450",
      patientName: "",
      requiredBy: "",
      notes: ""
    });
    alert("Blood request submitted successfully!");
  };

  const handleCancelRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    alert("Request cancelled");
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Fulfilled": return "#2e7d32";
      case "Pending": return "#f57c00";
      case "Cancelled": return "#c62828";
      default: return "#1565c0";
    }
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <h1 style={{ margin: "0 0 20px 0", color: "#1a1a1a", fontSize: "28px" }}>Request Blood</h1>

      {/* Request Form */}
      <div style={{ 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "8px", 
        marginBottom: "30px",
        border: "1px solid #e5e5e5"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#1a1a1a" }}>Create New Blood Request</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Patient Name *
            </label>
            <input 
              type="text" 
              name="patientName" 
              value={formData.patientName} 
              onChange={handleInputChange}
              placeholder="Enter patient name"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Blood Type *
            </label>
            <select 
              name="bloodType" 
              value={formData.bloodType} 
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            >
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Quantity (ml) *
            </label>
            <select 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            >
              <option value="450">450 ml (Standard)</option>
              <option value="900">900 ml (Double)</option>
              <option value="1350">1350 ml (Triple)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Required By *
            </label>
            <input 
              type="datetime-local" 
              name="requiredBy" 
              value={formData.requiredBy} 
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "15px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
            Medical Notes (Optional)
          </label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleInputChange}
            placeholder="Any special requirements or medical conditions..."
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              minHeight: "80px",
              fontFamily: "inherit"
            }}
          />
        </div>

        <button 
          onClick={handleSubmitRequest}
          style={{
            marginTop: "15px",
            padding: "12px 24px",
            background: "#b51f3a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600"
          }}
        >
          <i className="fa-solid fa-droplet"></i> Submit Blood Request
        </button>
      </div>

      {/* Request History */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0, color: "#1a1a1a" }}>Request History ({requests.length})</h3>
          <button 
            onClick={handlePrint}
            style={{
              padding: "8px 16px",
              background: "#b51f3a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5c5ca", background: "#f8f9fa" }}>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Date</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Patient Name</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Blood Type</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Quantity</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Required By</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Assigned Donor</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#1a1a1a" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} style={{ borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ padding: "12px" }}><small style={{ color: "#666" }}>{req.date}</small></td>
                  <td style={{ padding: "12px" }}><strong>{req.patientName}</strong></td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ background: "#FFE5E5", color: "#b51f3a", padding: "4px 8px", borderRadius: "4px", fontWeight: "600" }}>
                      {req.bloodType}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>{req.quantity}</td>
                  <td style={{ padding: "12px" }}><small>{req.requiredBy}</small></td>
                  <td style={{ padding: "12px" }}><small>{req.assignedDonor}</small></td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      background: getStatusColor(req.status) + "20",
                      color: getStatusColor(req.status),
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button 
                      onClick={() => handleCancelRequest(req.id)}
                      disabled={req.status === "Fulfilled"}
                      style={{
                        padding: "4px 8px",
                        background: "#ffebee",
                        color: "#b51f3a",
                        border: "1px solid #ffcdd2",
                        borderRadius: "4px",
                        cursor: req.status === "Fulfilled" ? "not-allowed" : "pointer",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "20px", padding: "15px", background: "#e3f2fd", borderRadius: "8px", fontSize: "13px", color: "#1565c0" }}>
        <p><strong>ℹ️ Note:</strong> We'll notify eligible donors matching your blood type. Urgent requests get priority matching.</p>
      </div>
    </div>
  );
}
