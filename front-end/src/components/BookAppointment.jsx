import { useState } from "react";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    bloodType: "O+",
    appointmentDate: "",
    appointmentTime: "",
    hospital: "",
    notes: ""
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "20 Apr 2026",
      time: "10:00 AM",
      hospital: "Jeevan Hospital",
      location: "Tadepalligudem",
      bloodType: "O+",
      status: "Confirmed"
    },
    {
      id: 2,
      date: "28 Apr 2026",
      time: "2:00 PM",
      hospital: "City Care Clinic",
      location: "Bhimavaram",
      bloodType: "O+",
      status: "Pending"
    }
  ]);

  const hospitals = [
    { name: "Jeevan Hospital", location: "Tadepalligudem", slots: 12 },
    { name: "City Care Clinic", location: "Bhimavaram", slots: 8 },
    { name: "Sanjivani Hospital", location: "Tanuku", slots: 15 },
    { name: "Apollo Clinic", location: "Vijayawada", slots: 20 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = () => {
    if (!formData.appointmentDate || !formData.appointmentTime || !formData.hospital) {
      alert("Please fill all required fields");
      return;
    }
    
    const newAppointment = {
      id: appointments.length + 1,
      date: new Date(formData.appointmentDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: formData.appointmentTime,
      hospital: formData.hospital,
      location: hospitals.find(h => h.name === formData.hospital)?.location || "Unknown",
      bloodType: formData.bloodType,
      status: "Confirmed"
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({
      bloodType: "O+",
      appointmentDate: "",
      appointmentTime: "",
      hospital: "",
      notes: ""
    });
    alert("Appointment booked successfully!");
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    alert("Appointment cancelled");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <h1 style={{ margin: "0 0 20px 0", color: "#1a1a1a", fontSize: "28px" }}>Book Donation Appointment</h1>

      {/* Booking Form */}
      <div style={{ 
        background: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "8px", 
        marginBottom: "30px",
        border: "1px solid #e5e5e5"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#1a1a1a" }}>Schedule Your Appointment</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Blood Type
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
              Hospital
            </label>
            <select 
              name="hospital" 
              value={formData.hospital} 
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px"
              }}
            >
              <option value="">Select a hospital</option>
              {hospitals.map((h) => (
                <option key={h.name} value={h.name}>
                  {h.name} - {h.location} ({h.slots} slots)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Appointment Date
            </label>
            <input 
              type="date" 
              name="appointmentDate" 
              value={formData.appointmentDate} 
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

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Appointment Time
            </label>
            <input 
              type="time" 
              name="appointmentTime" 
              value={formData.appointmentTime} 
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
            Notes (Optional)
          </label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleInputChange}
            placeholder="Any special requirements or health concerns..."
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
          onClick={handleBookAppointment}
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
          <i className="fa-solid fa-check"></i> Book Appointment
        </button>
      </div>

      {/* Scheduled Appointments */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ margin: 0, color: "#1a1a1a" }}>Your Appointments ({appointments.length})</h3>
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

        <div style={{ display: "grid", gap: "12px" }}>
          {appointments.length === 0 ? (
            <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>No appointments scheduled. Book one above!</p>
          ) : (
            appointments.map((apt) => (
              <div key={apt.id} style={{
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                padding: "15px",
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <h4 style={{ margin: "0 0 8px 0", color: "#1a1a1a", fontSize: "15px" }}>
                    {apt.hospital}
                  </h4>
                  <p style={{ margin: "0 0 6px 0", color: "#666", fontSize: "13px" }}>
                    <i className="fa-solid fa-calendar"></i> {apt.date} at {apt.time}
                  </p>
                  <p style={{ margin: "0", color: "#666", fontSize: "13px" }}>
                    <i className="fa-solid fa-location-dot"></i> {apt.location} | Blood Type: <strong>{apt.bloodType}</strong>
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    background: apt.status === "Confirmed" ? "#e8f5e9" : "#fff3e0",
                    color: apt.status === "Confirmed" ? "#2e7d32" : "#f57c00",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}>
                    {apt.status}
                  </span>
                  <button 
                    onClick={() => handleCancelAppointment(apt.id)}
                    style={{
                      padding: "6px 12px",
                      background: "#ffebee",
                      color: "#b51f3a",
                      border: "1px solid #ffcdd2",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ marginTop: "20px", padding: "15px", background: "#e3f2fd", borderRadius: "8px", fontSize: "13px", color: "#1565c0" }}>
        <p><strong>ℹ️ Reminder:</strong> Please arrive 15 minutes early. Bring a valid ID and stay hydrated. Any concerns? Contact our helpline: 1800-123-4567</p>
      </div>
    </div>
  );
}
