import { useState, useEffect } from "react";
import "../App.css";
import TriageNotificationDemo from "../components/TriageNotificationDemo";
import HealthReportScanner from "../components/HealthReportScanner";
import EligibilityAssistant from "../components/EligibilityAssistant";
import { LANGUAGES, getStoredLanguage, setStoredLanguage, t } from "../i18n";

const defaultProfileImage = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80";

function HospitalDashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Tadepalligudem, India");
  const [locationStatus, setLocationStatus] = useState("Using default location");
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    setStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const menuItems = {
    Donate: [
      { name: "Find Donors", icon: "fa-magnifying-glass" },
      { name: "Request Blood", icon: "fa-droplet" },
      { name: "My Requests", icon: "fa-clipboard" },
      { name: "My Donations", icon: "fa-heart" },
      { name: "Pledges", icon: "fa-hand-holding-hand" },
    ],
    Community: [
      { name: "Blood Camps", icon: "fa-calendar" },
      { name: "Events", icon: "fa-calendar-check" },
      { name: "Volunteers", icon: "fa-users" },
    ],
    "AI Tools": [
      { name: "Triage Alerts", icon: "fa-triangle-exclamation" },
      { name: "Health Report Scanner", icon: "fa-file-waveform" },
      { name: "Eligibility Assistant", icon: "fa-brain" },
    ],
    Account: [
      { name: "Profile", icon: "fa-user" },
      { name: "Notifications", icon: "fa-bell" },
      { name: "Settings", icon: "fa-gear" },
      { name: "Help & Support", icon: "fa-circle-question" },
    ],
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("jeevanLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location access not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        const currentLocation = `Current location (${lat}, ${lng})`;
        setLocation(currentLocation);
        localStorage.setItem("jeevanLocation", currentLocation);
        setLocationStatus("Live location enabled");
      },
      () => {
        setLocationStatus("Location permission denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const renderDashboardView = () => {
    if (activePage === "Triage Alerts") {
      return <TriageNotificationDemo />;
    }

    if (activePage === "Health Report Scanner") {
      return <HealthReportScanner />;
    }

    if (activePage === "Eligibility Assistant") {
      return <EligibilityAssistant />;
    }

    return null;
  };

  return (
    <div className="dashboard-app">
     {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        {/* LOGO */}
        <div className="logo">
          <i className="fa-solid fa-heart-pulse logo-heart"></i>
          <div>
            <h2>Jeevan Link</h2>
            <p>Be a hero. Save a life.</p>
          </div>
        </div>

        {/* WRAP NAV IN SCROLLABLE DIV */}
        <div className="sidebar-nav">
          {/* OVERVIEW */}
          <div
            className={`menu-item overview ${activePage === "Overview" ? "active" : ""}`}
            onClick={() => handleMenuClick("Overview")}
          >
            <i className="fa-solid fa-house menu-icon"></i>
            <span>Overview</span>
          </div>

          {/* DYNAMIC MENU SECTIONS */}
          {Object.entries(menuItems).map(([section, items]) => (
            <div key={section}>
              <p className="section-title">{section}</p>
              {items.map((item) => (
                <div
                  key={item.name}
                  className={`menu-item ${activePage === item.name ? "active" : ""}`}
                  onClick={() => handleMenuClick(item.name)}
                >
                  <i className={`fa-solid ${item.icon} menu-icon`}></i>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* EMERGENCY HELPLINE (Locked to bottom) */}
        <div className="emergency-helpline">
          <h4>Emergency Helpline</h4>
          <p>24/7 Available</p>
          <h2>1800-123-4567</h2>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="main-content">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search donors, blood groups, camps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="top-actions">
            <div className="language-picker">
              <label htmlFor="dashboard-language" style={{ marginRight: '8px', fontSize: '13px' }}>Language:</label>
              <select id="dashboard-language" value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e5c5ca', fontSize: '12px' }}>
                {LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </select>
            </div>
            <div className="location-picker">
              <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <span>{location}</span>
                <i className="fa-solid fa-chevron-down" style={{ fontSize: '10px', marginLeft: '5px' }}></i>
              </div>
              <button type="button" className="location-button" onClick={handleUseCurrentLocation}>
                Use my location
              </button>
              <small className="location-status">{locationStatus}</small>
            </div>

            <div className="notifications">
              <i className="fa-regular fa-bell"></i>
              <span className="notification-count">3</span>
            </div>

            <div className="hospital-profile">
              <div className="profile-info">
                <strong>Monika D</strong>
                <p>Hospital Admin</p>
              </div>
              <img src={defaultProfileImage} alt="Monika profile" className="profile-photo" />
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <section className="page-content">
          {renderDashboardView() ? (
            <div className="dashboard-ai-shell">{renderDashboardView()}</div>
          ) : activePage === "Overview" && (
            <div className="dashboard-layout">
              {/* ================= MIDDLE ================= */}
              <div className="dashboard-middle">
                {/* HERO */}
                <section className="hero-section">
                  <div className="hero-content">
                    <div className="hero-copy">
                      <div className="hero-badge">
                        <i className="fa-solid fa-heart-pulse"></i>
                      </div>
                      <h1>
                        Every drop of kindness<br />
                        <span>creates a ripple of hope.</span>
                      </h1>
                      <p className="hero-description">
                        Donate blood, save lives, and make the world a better place.
                      </p>
                      <div className="hero-buttons">
                        <button className="btn-primary" onClick={() => handleMenuClick("Find Donors")}>
                          <i className="fa-solid fa-user-plus"></i> Find Donors
                        </button>
                        <button className="btn-outline" onClick={() => handleMenuClick("Request Blood")}>
                          <i className="fa-solid fa-droplet"></i> Request Blood
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* QUICK ACTIONS */}
                <section className="quick-actions">
                  {[
                    { title: "Find Donors", desc: "Search nearby donors", icon: "fa-user-plus" },
                    { title: "Request Blood", desc: "Post a request", icon: "fa-droplet" },
                    { title: "Get Notified", desc: "Receive alerts", icon: "fa-bell" },
                    { title: "Blood Camps", desc: "Join or organize", icon: "fa-hospital" },
                    { title: "Make a Pledge", desc: "Pledge to donate", icon: "fa-hand-holding-heart" },
                  ].map((action) => (
                    <div className="quick-card" key={action.title} onClick={() => handleMenuClick(action.title)}>
                      <div className="quick-icon"><i className={`fa-solid ${action.icon}`}></i></div>
                      <h3>{action.title}</h3>
                      <p>{action.desc}</p>
                    </div>
                  ))}
                </section>

                {/* RECENT REQUESTS */}
                <section className="recent-section">
                  <div className="section-heading">
                    <h2>Recent Requests</h2>
                    <button className="view-all-text" onClick={() => handleMenuClick("My Requests")}>View All</button>
                  </div>
                  <div className="requests-table">
                    <div className="request-row request-header">
                      <span>Blood</span>
                      <span>Request</span>
                      <span>Units</span>
                      <span>Required By</span>
                      <span>Action</span>
                    </div>

                    {[
                      { type: "O+", status: "Urgent", name: "Ramesh Kumar", loc: "Tadepalligudem", units: "2 Units", time: "Today, 6:00 PM" },
                      { type: "A+", status: "Normal", name: "Suresh Babu", loc: "Bhimavaram", units: "1 Unit", time: "22 Aug 2026" },
                      { type: "B+", status: "Urgent", name: "Lakshmi Priya", loc: "Narasapuram", units: "3 Units", time: "Today, 8:00 PM" },
                      { type: "AB-", status: "Normal", name: "Harish Varma", loc: "Tadepalligudem", units: "1 Unit", time: "23 Aug 2026" }
                    ].map((req, i) => (
                      <div className="request-row" key={i}>
                        <span className="blood-type">{req.type}</span>
                        <span>
                          <strong>{req.name}</strong>
                          <small>{req.loc}</small>
                        </span>
                        <span>
                          {req.units}
                          <small>{req.type} Blood</small>
                        </span>
                        <span>
                          {req.time.split(',')[0]}
                          <small>{req.time.split(',')[1] || "10:00 AM"}</small>
                        </span>
                        <span>
                          <button className="view-button">View Details</button>
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* STATISTICS */}
                <section className="statistics">
                  {[
                    { val: "3,210+", label: "Lives Saved", icon: "fa-heart" },
                    { val: "12,458+", label: "Donations", icon: "fa-droplet" },
                    { val: "8,750+", label: "Active Donors", icon: "fa-users" },
                    { val: "156+", label: "Camps Organized", icon: "fa-calendar" }
                  ].map((stat, i) => (
                    <div className="stat-card" key={i}>
                      <div className="stat-icon"><i className={`fa-solid ${stat.icon}`}></i></div>
                      <div>
                        <strong>{stat.val}</strong>
                        <p>{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </section>
              </div>

              {/* ================= RIGHT COLUMN ================= */}
              <aside className="dashboard-right">
                {/* BLOOD AVAILABILITY */}
                <section className="right-card">
                  <div className="section-heading">
                    <h2>Blood Availability</h2>
                    <button className="view-all-text">View All</button>
                  </div>
                  <div className="blood-grid">
                    {[
                      { type: "A+", count: 12 }, { type: "A-", count: 6 },
                      { type: "B+", count: 14 }, { type: "B-", count: 5 },
                      { type: "O+", count: 20 }, { type: "O-", count: 3 },
                      { type: "AB+", count: 4 }, { type: "AB-", count: 2 }
                    ].map((blood) => (
                      <div className="blood-card" key={blood.type}>
                        <strong>{blood.type}</strong>
                        <b>{blood.count}</b>
                        <small>Available</small>
                      </div>
                    ))}
                  </div>
                </section>

                {/* UPCOMING CAMPS */}
                <section className="right-card">
                  <div className="section-heading">
                    <h2>Upcoming Blood Camps</h2>
                    <button className="view-all-text">View All</button>
                  </div>
                  {[
                    { name: "SASI Blood Camp", date: "22 Aug 2026, 10:00 AM", loc: "SASI Institute, Tadepalligudem" },
                    { name: "Youth Red Cross Camp", date: "05 Sep 2026, 09:00 AM", loc: "Community Hall" },
                    { name: "Mega Blood Donation Drive", date: "18 Sep 2026, 09:30 AM", loc: "Municipal Auditorium" }
                  ].map((camp, i) => (
                    <div className="camp-item" key={i}>
                      <div className="camp-image"><i className="fa-solid fa-hospital"></i></div>
                      <div>
                        <strong>{camp.name}</strong>
                        <p>{camp.date}</p>
                        <small><i className="fa-solid fa-location-dot"></i> {camp.loc}</small>
                      </div>
                    </div>
                  ))}
                  {/* NEARBY DONORS (MAP) */}
                <section className="right-card">
                  <div className="section-heading">
                    <h2>Nearby Donors</h2>
                    <button className="view-all-text">View Map</button>
                  </div>
                  
                  {/* Replace this placeholder with a real <img /> of your map if you have one */}
                  <div className="map-placeholder">
                    <i className="fa-solid fa-map-location-dot" style={{ fontSize: '30px', marginBottom: '10px' }}></i>
                    <p style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: '500' }}>Live Map View</p>
                  </div>
                </section>
                </section>
              </aside>
            </div>
          )}

          {/* OTHER PAGES PLACEHOLDER */}
          {!renderDashboardView() && activePage !== "Overview" && (
            <div className="page-card" style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px' }}>
              <div className="page-icon" style={{ fontSize: '40px', color: 'var(--primary-red)', marginBottom: '20px' }}>
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <h2>{activePage}</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>
                Welcome to the <b>{activePage}</b> section.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HospitalDashboard;