import './App.css'
import HospitalLogin from './pages/HospitalLogin'
import DonorLogin from './pages/DonorLogin'
import HospitalDashboard from './pages/HospitalDashboard'
import DonorRegister from './pages/DonorRegister'
import DonorDashboard from './pages/DonorDashboard'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { LANGUAGES, getStoredLanguage, setStoredLanguage, t } from './i18n';

function App() {
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    setStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const translations = {
    appTitle: t(language, 'appTitle'),
    appSubtitle: t(language, 'appSubtitle'),
    introTitle: t(language, 'introTitle'),
    hospital: t(language, 'hospital'),
    donor: t(language, 'donor'),
    hospitalDesc: t(language, 'hospitalDesc'),
    donorDesc: t(language, 'donorDesc'),
    continueAsHospital: t(language, 'continueAsHospital'),
    continueAsDonor: t(language, 'continueAsDonor'),
    languageLabel: t(language, 'language'),
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <div className="top-language-picker">
                <label htmlFor="app-language">{translations.languageLabel}</label>
                <select id="app-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  {LANGUAGES.map((item) => (
                    <option key={item.code} value={item.code}>{item.label}</option>
                  ))}
                </select>
              </div>

              <h1 className="brand-heading">
                <span>Jeevan Link</span>
              </h1>
              <p className="app-tagline">{translations.appSubtitle}</p>

              <div className="roles">
                <div className="role-card">
                  <div className="role-icon">🏥</div>
                  <h3>{translations.hospital}</h3>
                  <p>{translations.hospitalDesc}</p>
                  <Link to="/hospital-login">
                    <button>{translations.continueAsHospital}</button>
                  </Link>
                </div>

                <div className="role-card">
                  <div className="role-icon">🩸</div>
                  <h3>{translations.donor}</h3>
                  <p>{translations.donorDesc}</p>
                  <Link to="/donor-login">
                    <button>{translations.continueAsDonor}</button>
                  </Link>
                </div>
              </div>
            </div>
          }
        />

        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App