"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchFutureAppointments, fetchAppointmentHistory } from "../../redux/slices/appointmentSlice"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/PatientDashboard.css"

const PatientDashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { futureAppointments, pastAppointments, loading } = useSelector((state) => state.appointments)

  useEffect(() => {
    if (user?.patientId) {
      dispatch(fetchFutureAppointments(user.patientId))
      dispatch(fetchAppointmentHistory(user.patientId))
    }
  }, [dispatch, user])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getUpcomingAppointments = () => {
    return futureAppointments.slice(0, 3)
  }

  const getRecentAppointments = () => {
    return pastAppointments.slice(0, 3)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Navigation userType="patient" />

      <div className="container">
        <div className="dashboard-header">
          <h1>
            שלום, {user?.firstName} {user?.lastName}
          </h1>
          <p className="welcome-text">ברוכים הבאים למערכת ניהול התורים שלכם</p>
        </div>

        <div className="dashboard-grid">
          {/* Quick Actions */}
          <div className="card quick-actions">
            <div className="card-header">
              <h2 className="card-title">פעולות מהירות</h2>
            </div>
            <div className="action-buttons">
              <Link to="/patient/schedule" className="btn btn-primary">
                קביעת תור חדש
              </Link>
              <Link to="/patient/appointments" className="btn btn-secondary">
                צפייה בכל התורים
              </Link>
              <Link to="/patient/profile" className="btn btn-outline">
                עדכון פרטים אישיים
              </Link>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="card appointments-card">
            <div className="card-header">
              <h2 className="card-title">התורים הקרובים שלך</h2>
              <Link to="/patient/appointments" className="view-all-link">
                צפה בכל התורים
              </Link>
            </div>
            <div className="appointments-list">
              {getUpcomingAppointments().length > 0 ? (
                getUpcomingAppointments().map((appointment) => (
                  <div key={appointment.appointmentId} className="appointment-item upcoming">
                    <div className="appointment-info">
                      <div className="appointment-date">{formatDate(appointment.appointmentDate)}</div>
                      <div className="appointment-details">
                        <span className="therapist-name">{appointment.therapistName}</span>
                        <span className="specialization">{appointment.specialization}</span>
                        <span className="duration">{appointment.durationMinutes} דקות</span>
                      </div>
                    </div>
                    <div className="appointment-status upcoming-status">תור עתידי</div>
                  </div>
                ))
              ) : (
                <div className="no-appointments">
                  <p>אין תורים עתידיים</p>
                  <Link to="/patient/schedule" className="btn btn-primary">
                    קבע תור חדש
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="card appointments-card">
            <div className="card-header">
              <h2 className="card-title">התורים האחרונים שלך</h2>
              <Link to="/patient/history" className="view-all-link">
                צפה בהיסטוריה מלאה
              </Link>
            </div>
            <div className="appointments-list">
              {getRecentAppointments().length > 0 ? (
                getRecentAppointments().map((appointment) => (
                  <div key={appointment.appointmentId} className="appointment-item past">
                    <div className="appointment-info">
                      <div className="appointment-date">{formatDate(appointment.appointmentDate)}</div>
                      <div className="appointment-details">
                        <span className="therapist-name">{appointment.therapistName}</span>
                        <span className="specialization">{appointment.specialization}</span>
                        <span className="duration">{appointment.durationMinutes} דקות</span>
                      </div>
                    </div>
                    <div className="appointment-status past-status">{appointment.status || "הושלם"}</div>
                  </div>
                ))
              ) : (
                <div className="no-appointments">
                  <p>אין תורים קודמים</p>
                </div>
              )}
            </div>
          </div>

          {/* Patient Info Summary */}
          <div className="card patient-info">
            <div className="card-header">
              <h2 className="card-title">הפרטים שלך</h2>
              <Link to="/patient/profile" className="view-all-link">
                עדכן פרטים
              </Link>
            </div>
            <div className="patient-details">
              <div className="detail-item">
                <span className="detail-label">שם מלא:</span>
                <span className="detail-value">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">מספר טלפון:</span>
                <span className="detail-value">{user?.phoneNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">תאריך לידה:</span>
                <span className="detail-value">
                  {user?.birthDate ? new Date(user.birthDate).toLocaleDateString("he-IL") : "לא זמין"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
