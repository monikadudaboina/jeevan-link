import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { LANGUAGES, getStoredLanguage, setStoredLanguage, t } from '../i18n';

function HospitalLogin() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState(getStoredLanguage())

  useEffect(() => {
    setStoredLanguage(language)
    document.documentElement.lang = language
  }, [language])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
  // Demo login — accepts any email and password
  localStorage.setItem("hospitalLoggedIn", "true");
  navigate("/hospital-dashboard");
};
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="language-switcher">
          <label htmlFor="hospital-language">{t(language, 'language')}</label>
          <select id="hospital-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="login-icon">🏥</div>

        <h1>{t(language, 'hospitalLoginTitle')}</h1>

        <p>{t(language, 'hospitalLoginSubtitle')}</p>

        <label>{t(language, 'hospitalEmail')}</label>

        <input
          type="email"
          placeholder={t(language, 'enterHospitalEmail')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>{t(language, 'password')}</label>

        <input
          type="password"
          placeholder={t(language, 'enterPassword')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? t(language, 'loggingIn') : t(language, 'login')}
        </button>

        <p className="register-text">
          {t(language, 'noAccount')}
          <span> {t(language, 'registerHereShort')}</span>
        </p>
      </div>
    </div>
  )
}

export default HospitalLogin