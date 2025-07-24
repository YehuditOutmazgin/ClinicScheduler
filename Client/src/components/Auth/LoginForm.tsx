"use client"
import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, clearError } from "../../redux/slices/authSlice"
import type { RootState, AppDispatch } from "../../redux/store"
import "../../styles/globals.css"
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ id: "", password: "", })
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value, }))
    if (error) { dispatch(clearError()) }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(login({ id: Number.parseInt(formData.id), password: Number.parseInt(formData.password), }),)
    if (login.fulfilled.match(result)) { navigate("/dashboard") }
  }
  return (<div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", }}
  >
    <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "32px", color: "var(--dark-purple)", fontSize: "28px", fontWeight: "700", }}        >          כניסה למערכת        </h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id" className="form-label">
            מספר זהות
          </label>
          <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} className="form-input" required placeholder="הכנס מספר זהות" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            סיסמה
          </label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required placeholder="הכנס סיסמה" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", marginTop: "16px" }}          >
          {loading ? "מתחבר..." : "התחבר"}
        </button>
      </form>
    </div>
  </div>)
}
export default LoginForm