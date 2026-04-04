import { useState } from "react"

function Auth({ setToken, setUser }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    const API_BASE_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/_/backend');
    const url = isLogin ? `${API_BASE_URL}/api/auth/login` : `${API_BASE_URL}/api/auth/register`;
    
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      
      setToken(data.token)
      setUser(data.user)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="dashboard" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="bg-orb-1"></div>
      <div className="bg-orb-2"></div>

      <div className="card" style={{ maxWidth: "420px", width: "100%", padding: "40px", zIndex: 1, position: "relative" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "28px" }}>
          <span className="gradient-text">{isLogin ? 'Welcome Back' : 'Create Account'}</span>
        </h2>
        
        {error && <p style={{ color: "#ef4444", marginBottom: "20px", textAlign: "center", fontSize: "14px", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="search"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="search"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="search"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" className="add-btn" style={{ width: "100%", marginTop: "10px", padding: "12px", fontSize: "16px" }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "25px", color: "var(--text-muted)", fontSize: "14px" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: "600" }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Auth
