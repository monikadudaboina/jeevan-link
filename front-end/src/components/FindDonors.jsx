import { useState } from "react";

export default function FindDonors() {
  const [filters, setFilters] = useState({
    bloodType: "O+",
    location: "",
    distance: "25"
  });

  const [donors] = useState([
    {
      id: 1,
      name: "Monika D",
      bloodType: "O+",
      location: "Bhimavaram",
      distance: "2.5 km",
      tier: "Gold",
      lastDonated: "14 Apr 2026",
      available: true,
      rating: 4.8
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      bloodType: "O+",
      location: "Tadepalligudem",
      distance: "18 km",
      tier: "Silver",
      lastDonated: "10 Apr 2026",
      available: true,
      rating: 4.5
    },
    {
      id: 3,
      name: "Priya Sharma",
      bloodType: "O+",
      location: "Bhimavaram",
      distance: "3.2 km",
      tier: "Gold",
      lastDonated: "15 Apr 2026",
      available: true,
      rating: 4.9
    },
    {
      id: 4,
      name: "Aman Singh",
      bloodType: "O+",
      location: "Vijayawada",
      distance: "45 km",
      tier: "Bronze",
      lastDonated: "20 Feb 2026",
      available: false,
      rating: 4.3
    }
  ]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleContactDonor = (donorId) => {
    alert(`Sending request to donor ${donorId}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredDonors = donors.filter(donor => 
    donor.bloodType === filters.bloodType && 
    parseInt(donor.distance) <= parseInt(filters.distance)
  );

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: "12px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0, color: "#1a1a1a", fontSize: "28px" }}>Find Donors</h1>
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

      {/* Filters */}
      <div style={{
        background: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        border: "1px solid #e5e5e5"
      }}>
        <h3 style={{ margin: "0 0 15px 0", color: "#1a1a1a" }}>Filter Donors</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", color: "#1a1a1a", fontSize: "13px" }}>
              Blood Type
            </label>
            <select 
              name="bloodType" 
              value={filters.bloodType} 
              onChange={handleFilterChange}
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
              Location
            </label>
            <input 
              type="text" 
              name="location" 
              value={filters.location} 
              onChange={handleFilterChange}
              placeholder="City or area"
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
              Max Distance: {filters.distance} km
            </label>
            <input 
              type="range" 
              name="distance" 
              value={filters.distance} 
              onChange={handleFilterChange}
              min="5"
              max="100"
              style={{
                width: "100%",
                cursor: "pointer"
              }}
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" }}>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>{filteredDonors.length}</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Available Donors</div>
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>
            {filteredDonors.filter(d => d.tier === "Gold").length}
          </div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Gold Tier Donors</div>
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>
            {(filteredDonors.reduce((sum, d) => sum + d.rating, 0) / (filteredDonors.length || 1)).toFixed(1)}
          </div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Avg Rating</div>
        </div>
        <div style={{ padding: "15px", background: "#f0f0f0", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", fontWeight: "700", color: "#b51f3a" }}>
            {filteredDonors.filter(d => d.available).length}
          </div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Ready to Donate</div>
        </div>
      </div>

      {/* Donor List */}
      <div style={{ display: "grid", gap: "15px" }}>
        {filteredDonors.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", padding: "20px" }}>No donors found matching your criteria.</p>
        ) : (
          filteredDonors.map((donor) => (
            <div key={donor.id} style={{
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              padding: "15px",
              background: "#fafafa",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  background: "#b51f3a",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "20px"
                }}>
                  {donor.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 6px 0", color: "#1a1a1a" }}>{donor.name}</h4>
                  <p style={{ margin: "0 0 4px 0", color: "#666", fontSize: "13px" }}>
                    <i className="fa-solid fa-location-dot"></i> {donor.location} ({donor.distance})
                  </p>
                  <p style={{ margin: "0", color: "#666", fontSize: "13px" }}>
                    Last donated: {donor.lastDonated}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "18px", fontWeight: "700", color: "#b51f3a" }}>
                    {donor.bloodType}
                  </div>
                  <small style={{ color: "#666" }}>
                    <i className="fa-solid fa-star"></i> {donor.rating}
                  </small>
                </div>
                <div style={{ background: "#fff3e0", color: "#f57c00", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", minWidth: "70px", textAlign: "center" }}>
                  {donor.tier}
                </div>
                <button 
                  onClick={() => handleContactDonor(donor.id)}
                  disabled={!donor.available}
                  style={{
                    padding: "8px 16px",
                    background: donor.available ? "#b51f3a" : "#ccc",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: donor.available ? "pointer" : "not-allowed",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}
                >
                  {donor.available ? "Request Blood" : "Not Available"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "20px", padding: "15px", background: "#e3f2fd", borderRadius: "8px", fontSize: "13px", color: "#1565c0" }}>
        <p><strong>💡 Tip:</strong> Connect with high-rated donors for reliable blood donations. Check donor history and ratings before sending requests.</p>
      </div>
    </div>
  );
}
