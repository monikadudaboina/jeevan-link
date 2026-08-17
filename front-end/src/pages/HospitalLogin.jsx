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

  const handleLogin = async () => {
    setError('')

    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(${import.meta.env.VITE_API_URL}, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: 'hospital',
        }),
      })

      const data = await response.json()

      console.log('LOGIN RESPONSE:', data)

      if (!response.ok) {
        setError(data.message || 'Login failed')
        return
      }

      // Store logged-in hospital information
      localStorage.setItem('user', JSON.stringify(data.user))

      // Go to hospital dashboard
      navigate('/hospital-dashboard')

    } catch (error) {
      console.error('Login error:', error)
      setError('Unable to connect to server')
    } finally {
      setLoading(false)
    }
  }

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