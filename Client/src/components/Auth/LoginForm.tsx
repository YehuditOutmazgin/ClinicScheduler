"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { login, clearError } from "../../redux/slices/authSlice"
import type { RootState, AppDispatch } from "../../redux/store"
import "../../styles/LoginForm.css"

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error,role } = useSelector((state: RootState) => state.auth)
  if ( role ) {
    return <Navigate to="/dashboard" replace />
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (error) {
      dispatch(clearError())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await dispatch(
      login({
        id: Number.parseInt(formData.id),
        password: Number.parseInt(formData.password),
      }),
    )

    if (login.fulfilled.match(result)) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">כניסה למערכת</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="id" className="form-label">
              מספר זהות
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="הכנס מספר זהות"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              סיסמה
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="הכנס סיסמה"
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
