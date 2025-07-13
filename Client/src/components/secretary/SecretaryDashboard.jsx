"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchAllPatients } from "../../redux/slices/patientSlice"
import { fetchAllTherapists } from "../../redux/slices/therapistSlice"
import { getNextBusinessDayAppointments } from "../../api/appointmentFetch"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/SecretaryDashboard.css"

const SecretaryDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { patients } = useSelector((state) => state.patients)
  const { therapists } = useSelector((state) => state.therapists)
  const [upcomingReminders, setUpcomingReminders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(fetchAllPatients()), dispatch(fetchAllTherapists()), fetchUpcomingReminders()])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  const fetchUpcomingReminders = async () => {
    try {
      const appointments = await getNextBusinessDayAppointments()
      setUpcomingReminders(appointments.slice(0, 5)) // Show only first 5
    } catch (error) {
      console.error("Error fetching reminders:", error)
    }
  }

  const getStats = () => {
    return {
      totalPatients: patients.length,
      totalTherapists: therapists.length,
      pendingReminders: upcomingReminders.length,
      activeSpecialties: [...new Set(therapists.map((t) => t.specialization))].length,
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("he-IL"),
      time: date.toLocaleTimeString("he-IL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  if (loading) {
    return <LoadingSpinner message="טוען נתוני מזכירות..." />
  }

  const stats = getStats()

  return (
    <div>
      <Navigation userType="secretary" />

      <div className="container">
        <div className="dashboard-header">
          <h1>
            שלום, {user?.firstName} {user?.lastName}
          </h1>
          <p className="welcome-text">ברוכים הבאים למערכת ניהול המכון</p>
        </div>

        <div className="dashboard-grid">
          {/* Statistics Cards */}
          <div className="stats-container">
            <div className="stat-card patients">
              <div className="stat-content">
                <div className="stat-number">{stats.totalPatients}</div>
                <div className="stat-label">מטופלים רשומים</div>
              </div>
              <div className="stat-icon">👥</div>
            </div>

            <div className="stat-card therapists">
              <div className="stat-content">
                <div className="stat-number">{stats.totalTherapists}</div>
                <div className="stat-label">מטפלים פעילים</div>
              </div>
              <div className="stat-icon">👨‍⚕️</div>
            </div>

            <div className="stat-card reminders">
              <div className="stat-content">
                <div className="stat-number">{stats.pendingReminders}</div>
                <div className="stat-label">תזכורות ממתינות</div>
              </div>
              <div className="stat-icon">🔔</div>
            </div>

            <div className="stat-card specialties">
              <div className="stat-content">
                <div className="stat-number">{stats.activeSpecialties}</div>
                <div className="stat-label">התמחויות</div>
              </div>
              <div className="stat-icon">🏥</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card quick-actions">
            <div className="card-header">
              <h2 className="card-title">פעולות מהירות</h2>
            </div>
            <div className="action-grid">
              <Link to="/secretary/patients" className="action-card">
                <div className="action-icon">👥</div>
                <div className="action-title">ניהול מטופלים</div>
                <div className="action-description">הוסף, ערוך או הסר מטופלים</div>
              </Link>

              <Link to="/secretary/therapists" className="action-card">
                <div className="action-icon">👨‍⚕️</div>
                <div className="action-title">ניהול מטפלים</div>
                <div className="action-description">ניהול צוות המטפלים</div>
              </Link>

              <Link to="/secretary/schedule" className="action-card">
                <div className="action-icon">📅</div>
                <div className="action-title">קביעת תורים</div>
                <div className="action-description">קבע תורים למטופלים</div>
              </Link>

              <Link to="/secretary/reminders" className="action-card">
                <div className="action-icon">🔔</div>
                <div className="action-title">תזכורות</div>
                <div className="action-description">נהל תזכורות לתורים</div>
              </Link>
            </div>
          </div>

          {/* Pending Reminders */}
          <div className="card reminders-card">
            <div className="card-header">
              <h2 className="card-title">תזכורות ליום העסקים הבא</h2>
              <Link to="/secretary/reminders" className="view-all-link">
                צפה בכל התזכורות
              </Link>
            </div>
            <div className="reminders-list">
              {upcomingReminders.length > 0 ? (
                upcomingReminders.map((appointment) => {
                  const { date, time } = formatDateTime(appointment.appointmentDate)
                  return (
                    <div key={appointment.appointmentId} className="reminder-item">
                      <div className="reminder-info">
                        <div className="patient-name">
                          {appointment.patient?.firstName} {appointment.patient?.lastName}
                        </div>
                        <div className="appointment-details">
                          <span className="appointment-time">
                            {date} בשעה {time}
                          </span>
                          <span className="therapist-name">{appointment.therapistName}</span>
                        </div>
                      </div>
                      <div className="reminder-status">
                        <span className="status-badge pending">ממתין לתזכורת</span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="no-reminders">
                  <p>אין תזכורות ממתינות</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card activity-card">
            <div className="card-header">
              <h2 className="card-title">פעילות אחרונה</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">👤</div>
                <div className="activity-content">
                  <div className="activity-title">מטופל חדש נרשם</div>
                  <div className="activity-time">לפני 2 שעות</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📅</div>
                <div className="activity-content">
                  <div className="activity-title">תור נקבע בהצלחה</div>
                  <div className="activity-time">לפני 3 שעות</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-content">
                  <div className="activity-title">תור הושלם</div>
                  <div className="activity-time">לפני 5 שעות</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecretaryDashboard
