import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LANGUAGES, getStoredLanguage, setStoredLanguage, t } from '../i18n';

export default function DonorRegister() {
  const [language, setLanguage] = useState(getStoredLanguage());

  useEffect(() => {
    setStoredLanguage(language)
    document.documentElement.lang = language
  }, [language]);

  // Track which step the form is on (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Store all input data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Submitted:", formData);
    // Add your backend registration logic here later
    alert("Registration Successful!"); 
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="language-switcher">
          <label htmlFor="register-language">{t(language, 'language')}</label>
          <select id="register-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="register-icon">🩸</div>
        <h1>{t(language, 'registerTitle')}</h1>
        <p>{t(language, 'step')} {step} {t(language, 'of')} 3</p>

        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="form-grid">
              <div className="input-group full-width">
                <label>{t(language, 'fullName')}</label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder={t(language, 'enterFullName')} 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <label>{t(language, 'email')}</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="you@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <label>{t(language, 'phone')}</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+91" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          )}

          {/* STEP 2: Security */}
          {step === 2 && (
            <div className="form-grid">
              <div className="input-group full-width">
                <label>{t(language, 'password')}</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder={t(language, 'createPassword')} 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group full-width">
                <label>{t(language, 'confirmPassword')}</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder={t(language, 'repeatPassword')} 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          )}

          {/* STEP 3: Blood Group & Location */}
          {step === 3 && (
            <div className="form-grid">
              <div className="input-group">
                <label>{t(language, 'bloodGroup')}</label>
                <select 
                  name="bloodGroup" 
                  value={formData.bloodGroup} 
                  onChange={handleChange} 
                  required
                >
                  <option value="" disabled>{t(language, 'selectGroup')}</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="input-group">
                <label>{t(language, 'location')}</label>
                <input 
                  type="text" 
                  name="location" 
                  placeholder={t(language, 'enterLocation')} 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          )}

          {/* Form Navigation Buttons */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            {step > 1 && (
              <button type="button" className="register-button" style={{ backgroundColor: '#765b61' }} onClick={prevStep}>
                {t(language, 'back')}
              </button>
            )}
            
            {step < 3 ? (
              <button type="button" className="register-button" onClick={nextStep}>
                {t(language, 'next')}
              </button>
            ) : (
              <button type="submit" className="register-button">
                {t(language, 'register')}
              </button>
            )}
          </div>
        </form>

        <p className="login-text">
          {t(language, 'alreadyAccount')} <Link to="/donor-login">{t(language, 'logIn')}</Link>
        </p>
      </div>
    </div>
  );
}