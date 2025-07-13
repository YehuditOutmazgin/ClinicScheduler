"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getTherapistAppointments } from "../../api/appointmentFetch"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/TherapistDashboard.css"

const TherapistDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [todayAppointments, setTodayAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    fetchTodayAppointments()
  }, [user, selectedDate])

  const fetchTodayAppointments = async () => {
    if (!user?.therapistId) return

    try {
      setLoading(true)
      const appointments = await getTherapistAppointments(user.therapistId, selectedDate)
      setTodayAppointments(appointments)
    } catch (error) {
      console.error("Error fetching appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTodayStats = () => {
    const total = todayAppointments.length
    const completed = todayAppointments.filter((apt) => apt.status === "completed").length
    const upcoming = todayAppointments.filter((apt) => new Date(apt.appointmentDate) > new Date()).length

    return { total, completed, upcoming }
  }

  const stats = getTodayStats()

  if (loading) {
    return <LoadingSpinner message="טוען נתוני מטפל..." />
  }

  return (
    <div>
      <Navigation userType="therapist" />

      <div className="container">
        <div className="dashboard-header">
          <h1>
            שלום, {user?.firstName} {user?.lastName}
          </h1>
          <p className="welcome-text">ברוכים הבאים למערכת ניהול התורים שלכם</p>
          <div className="specialization-badge">{user?.specialization}</div>
        </div>

        <div className="dashboard-grid">
          {/* Quick Stats */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">תורים היום</div>
              <div className="stat-icon">📅</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.upcoming}</div>
              <div className="stat-label">תורים עתידיים</div>
              <div className="stat-icon">⏰</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">תורים שהושלמו</div>
              <div className="stat-icon">✅</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card quick-actions">
            <div className="card-header">
              <h2 className="card-title">פעולות מהירות</h2>
            </div>
            <div className="action-buttons">
              <Link to="/therapist/appointments" className="btn btn-primary">
                צפה בתורים
              </Link>
              <Link to="/therapist/schedule" className="btn btn-secondary">
                ניהול לוח זמנים
              </Link>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="card appointments-card">
            <div className="card-header">
              <h2 className="card-title">תורים לתאריך</h2>
              <input
                type="date"
                className="form-control date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="appointments-list">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                  <div key={appointment.appointmentId} className="appointment-item">
                    <div className="appointment-time">{formatTime(appointment.appointmentDate)}</div>
                    <div className="appointment-info">
                      <div className="patient-name">
                        {appointment.patient?.firstName} {appointment.patient?.lastName}
                      </div>
                      <div className="appointment-duration">{appointment.durationMinutes} דקות</div>
                    </div>
                    <div className="appointment-status">
                      <span className={`status-badge ${appointment.status || "scheduled"}`}>
                        {appointment.status === "completed" ? "הושלם" : "מתוכנן"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-appointments">
                  <p>אין תורים לתאריך זה</p>
                </div>
              )}
            </div>
          </div>

          {/* Therapist Info */}
          <div className="card therapist-info">
            <div className="card-header">
              <h2 className="card-title">הפרטים שלך</h2>
            </div>
            <div className="therapist-details">
              <div className="detail-item">
                <span className="detail-label">שם מלא:</span>
                <span className="detail-value">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">התמחות:</span>
                <span className="detail-value">{user?.specialization}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">מספר טלפון:</span>
                <span className="detail-value">{user?.phoneNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">משך טיפול:</span>
                <span className="detail-value">{user?.appointmentDuration} דקות</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TherapistDashboard
