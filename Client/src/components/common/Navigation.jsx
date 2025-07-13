"use client"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { logout } from "../../redux/slices/authSlice"
import "../../styles/Navigation.css"

const Navigation = ({ userType }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const getNavigationItems = () => {
    switch (userType) {
      case "patient":
        return [
          { path: "/patient/dashboard", label: "דף הבית", icon: "🏠" },
          { path: "/patient/appointments", label: "תורים עתידיים", icon: "📅" },
          { path: "/patient/history", label: "היסטוריית תורים", icon: "📋" },
          { path: "/patient/profile", label: "פרטים אישיים", icon: "👤" },
          { path: "/patient/schedule", label: "קביעת תור", icon: "➕" },
        ]
      case "therapist":
        return [
          { path: "/therapist/dashboard", label: "דף הבית", icon: "🏠" },
          { path: "/therapist/appointments", label: "תורים", icon: "📅" },
          { path: "/therapist/schedule", label: "ניהול לוח זמנים", icon: "⚙️" },
        ]
      case "secretary":
        return [
          { path: "/secretary/dashboard", label: "דף הבית", icon: "🏠" },
          { path: "/secretary/patients", label: "ניהול מטופלים", icon: "👥" },
          { path: "/secretary/therapists", label: "ניהול מטפלים", icon: "👨‍⚕️" },
          { path: "/secretary/reminders", label: "תזכורות", icon: "🔔" },
          { path: "/secretary/schedule", label: "קביעת תורים", icon: "➕" },
        ]
      default:
        return []
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to={`/${userType}/dashboard`} className="navbar-brand">
            מכון להתפתחות הילד
          </Link>

          <div className="navbar-nav">
            {getNavigationItems().map((item) => (
              <Link key={item.path} to={item.path} className="nav-link">
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="navbar-user">
            <span className="user-name">
              שלום, {user?.firstName} {user?.lastName}
            </span>
            <button onClick={handleLogout} className="btn btn-outline logout-btn">
              התנתק
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
