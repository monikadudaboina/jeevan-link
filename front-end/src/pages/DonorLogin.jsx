import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { Link } from "react-router-dom";
import { LANGUAGES, getStoredLanguage, setStoredLanguage, t } from '../i18n';

function DonorLogin() {
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
  localStorage.setItem("DonorLoggedIn", "true");
  navigate("/donor-dashboard");
};
  return (
    <div className="login-page">

      <div className="login-card">
        <div className="language-switcher">
          <label htmlFor="donor-language">{t(language, 'language')}</label>
          <select id="donor-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="login-icon">🩸</div>

        <h1>{t(language, 'donorLoginTitle')}</h1>

        <p>{t(language, 'donorLoginSubtitle')}</p>

        <label>{t(language, 'email')}</label>

        <input
          type="email"
          placeholder={t(language, 'enterEmail')}
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
          {t(language, 'needDonorAccount')}
          <Link to="/donor-register"> {t(language, 'registerHere')}</Link>
        </p>

      </div>

    </div>
  )
}

export default DonorLogin