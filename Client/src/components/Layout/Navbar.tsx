"use client"

import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import type { RootState } from "../../store"
import { logout } from "../../store/slices/authSlice"
import { getUserName } from "../../types"
import "../../styles/globals.css"

const Navbar: React.FC = () => {
  const { user, role, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  if (!isAuthenticated) return null

  const getNavLinks = () => {
    switch (role) {
      case "client":
        return [
          { to: "/dashboard", label: "לוח בקרה" },
          { to: "/appointments", label: "התורים שלי" },
          { to: "/book-appointment", label: "קביעת תור" },
        ]
      case "therapist":
        return [
          { to: "/dashboard", label: "לוח בקרה" },
          { to: "/schedule", label: "לוח הזמנים שלי" },
          { to: "/patients", label: "מטופלים" },
        ]
      case "secretary":
        return [
          { to: "/dashboard", label: "לוח בקרה" },
          { to: "/appointments", label: "כל התורים" },
          { to: "/patients", label: "מטופלים" },
          { to: "/therapists", label: "מטפלים" },
          { to: "/schedule", label: "ניהול לוח זמנים" },
        ]
      default:
        return []
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            מערכת תורים
          </Link>

          <div className="navbar-nav">
            {getNavLinks().map((link) => (
              <Link key={link.to} to={link.to} className="nav-link">
                {link.label}
              </Link>
            ))}

            <div className="nav-link" style={{ color: "var(--dark-purple)" }}>
              שלום, {getUserName(user)}
            </div>

            <button onClick={handleLogout} className="btn btn-secondary">
              התנתק
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
