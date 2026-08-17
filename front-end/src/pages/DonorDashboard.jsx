import { useState, useEffect } from "react";
import "../App.css";
import EligibilityAssistant from "../components/EligibilityAssistant";
import HealthReportScanner from "../components/HealthReportScanner";
import UrgentRequests from "../components/UrgentRequests";
import DonationHistory from "../components/DonationHistory";
import HealthReports from "../components/HealthReports";
import BookAppointment from "../components/BookAppointment";
import { LANGUAGES, getStoredLanguage, setStoredLanguage, t } from "../i18n";

const defaultProfileImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";

function DonorDashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("Bhimavaram, India");
  const [locationStatus, setLocationStatus] = useState("Using default location");
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    setStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const menuItems = {
    "Act Now": [
      { name: "Urgent Requests", icon: "fa-truck-medical" },
      { name: "Find Blood Camps", icon: "fa-map-location-dot" },
      { name: "Book Appointment", icon: "fa-calendar-check" },
    ],
    "My Journey": [
      { name: "Donation History", icon: "fa-clock-rotate-left" },
      { name: "Health Reports", icon: "fa-file-medical" },
      { name: "My Badges", icon: "fa-medal" },
    ],
    "AI Tools": [
      { name: "Eligibility Assistant", icon: "fa-brain" },
      { name: "Health Report Scanner", icon: "fa-file-waveform" },
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
    if (activePage === "Urgent Requests") {
      return <UrgentRequests />;
    }

    if (activePage === "Book Appointment") {
      return <BookAppointment />;
    }

    if (activePage === "Donation History") {
      return <DonationHistory />;
    }

    if (activePage === "Health Reports") {
      return <HealthReports />;
    }

    if (activePage === "Eligibility Assistant") {
      return <EligibilityAssistant />;
    }

    if (activePage === "Health Report Scanner") {
      return <HealthReportScanner />;
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

        {/* EMERGENCY HELPLINE */}
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
              placeholder="Search hospitals, camps, campaigns..."
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
              <span className="notification-count">1</span>
            </div>

            <div className="hospital-profile">
              <div className="profile-info">
                <strong>Monika D</strong>
                <p>O+ Donor</p>
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
                        <button className="btn-primary" onClick={() => handleMenuClick("Urgent Requests")}>
                          <i className="fa-solid fa-droplet"></i> Donate Now
                        </button>
                        <button className="btn-outline" onClick={() => handleMenuClick("Find Blood Camps")}>
                          <i className="fa-regular fa-calendar-check"></i> Book Slot
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* MY IMPACT STATS */}
                <section className="statistics">
                  {[
                    { val: "O+", label: "Blood Type", icon: "fa-droplet" },
                    { val: "4", label: "Total Donations", icon: "fa-heart-circle-check" },
                    { val: "12", label: "Lives Impacted", icon: "fa-people-group" },
                    { val: "Gold", label: "Donor Tier", icon: "fa-medal" }
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

                {/* URGENT NEARBY REQUESTS */}
                <section className="recent-section" style={{ marginTop: '24px' }}>
                  <div className="section-heading">
                    <h2>Urgent Requests Near You (O+)</h2>
                    <button className="view-all-text" onClick={() => handleMenuClick("Urgent Requests")}>View All</button>
                  </div>
                  <div className="requests-table">
                    <div className="request-row request-header">
                      <span>Hospital / Patient</span>
                      <span>Location</span>
                      <span>Distance</span>
                      <span>Required By</span>
                      <span>Action</span>
                    </div>

                    {[
                      { name: "Ramesh Kumar", hospital: "Jeevan Hospital", loc: "Tadepalligudem", dist: "18 km away", time: "Today, 6:00 PM" },
                      { name: "Emergency Surgery", hospital: "City Care Clinic", loc: "Bhimavaram", dist: "2.5 km away", time: "Today, 8:00 PM" },
                      { name: "Accident Trauma", hospital: "Sanjivani Hospital", loc: "Tanuku", dist: "32 km away", time: "ASAP" }
                    ].map((req, i) => (
                      <div className="request-row" key={i}>
                        <span>
                          <strong style={{ color: 'var(--primary-red)' }}>{req.name}</strong>
                          <small>{req.hospital}</small>
                        </span>
                        <span>
                          <strong>{req.loc}</strong>
                          <small>Andhra Pradesh</small>
                        </span>
                        <span>
                          <strong>{req.dist}</strong>
                          <small><i className="fa-solid fa-car"></i> Direct Route</small>
                        </span>
                        <span>
                          <strong style={{ color: req.time === 'ASAP' ? '#E63946' : 'inherit' }}>{req.time}</strong>
                        </span>
                        <span>
                          <button className="view-button" style={{ background: 'var(--primary-red)', width: '100px' }}>Accept Request</button>
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* ================= RIGHT COLUMN ================= */}
              <aside className="dashboard-right">
                
                {/* LATEST HEALTH VITALS */}
                <section className="right-card">
                  <div className="section-heading">
                    <h2>Last Donation Vitals</h2>
                    <button className="view-all-text" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>From 14 Apr 2026</button>
                  </div>
                  <div className="blood-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="blood-card" style={{ padding: '20px 10px' }}>
                      <strong style={{ color: 'var(--text-dark)' }}>Hemoglobin</strong>
                      <b style={{ color: 'var(--primary-red)' }}>14.2</b>
                      <small>g/dL (Normal)</small>
                    </div>
                    <div className="blood-card" style={{ padding: '20px 10px' }}>
                      <strong style={{ color: 'var(--text-dark)' }}>Blood Pressure</strong>
                      <b style={{ color: 'var(--primary-red)' }}>118/78</b>
                      <small>mmHg (Normal)</small>
                    </div>
                  </div>
                </section>

                {/* NEARBY CAMPS */}
                <section className="right-card">
                  <div className="section-heading">
                    <h2>Camps Near You</h2>
                    <button className="view-all-text">View Map</button>
                  </div>
                  {[
                    { name: "SASI Blood Camp", date: "22 Aug 2026, 10:00 AM", loc: "SASI Institute, Tadepalligudem" },
                    { name: "Youth Red Cross Camp", date: "05 Sep 2026, 09:00 AM", loc: "Community Hall, Bhimavaram" }
                  ].map((camp, i) => (
                    <div className="camp-item" key={i}>
                      <div className="camp-image" style={{ borderRadius: '50%' }}><i className="fa-solid fa-tent"></i></div>
                      <div>
                        <strong>{camp.name}</strong>
                        <p>{camp.date}</p>
                        <small><i className="fa-solid fa-location-dot"></i> {camp.loc}</small>
                      </div>
                    </div>
                  ))}
                  <button className="btn-outline" style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}>Explore All Camps</button>
                </section>

              </aside>
            </div>
          )}

          {/* OTHER PAGES PLACEHOLDER */}
          {!renderDashboardView() && activePage !== "Overview" && (
            <div className="page-card" style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
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

export default DonorDashboard;