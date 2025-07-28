"use client"

import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import type { RootState } from "../../redux/store"
import { logout } from "../../redux/slices/authSlice"
import { getUserName } from "../../types"
import "../../styles/Navbar.css"

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
      case "patient":
        return [
          { to: "/appointments", label: "התורים שלי" },
          { to: "/book-appointment", label: "קביעת תור" },
        ]
      case "therapist":
        return [
          { to: "/schedule", label: "לוח הזמנים שלי" },
          { to: "/patients", label: "מטופלים" },
        ]
      case "secretary":
        return [
          { to: "/schedule", label: "ניהול תורים" },
          { to: "/therapists", label: "ניהול מטפלים" },
          { to: "/patients", label: "ניהול מטופלים" },
          { to: "/manage-reminder", label: "ניהול תזכורות" },
        ]
      default:
        return []
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/dashboard" className="navbar-brand">
            התפתחות הילד
          </Link>

          <div className="navbar-nav">
            {getNavLinks().map((link) => (
              <Link key={link.to} to={link.to} className="nav-link">
                {link.label}
              </Link>
            ))}

            <div className="nav-user">שלום, {getUserName(user)}</div>

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
