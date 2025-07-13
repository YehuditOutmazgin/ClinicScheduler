"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAppointmentHistory } from "../../redux/slices/appointmentSlice"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/PatientHistory.css"

const PatientHistory = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { pastAppointments, loading, error } = useSelector((state) => state.appointments)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  useEffect(() => {
    if (user?.patientId) {
      dispatch(fetchAppointmentHistory(user.patientId))
    }
  }, [dispatch, user])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("he-IL", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("he-IL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
  }

  const getFilteredAndSortedAppointments = () => {
    let filtered = pastAppointments

    if (filter !== "all") {
      filtered = pastAppointments.filter((apt) => apt.specialization === filter)
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.appointmentDate)
      const dateB = new Date(b.appointmentDate)

      switch (sortBy) {
        case "date-desc":
          return dateB - dateA
        case "date-asc":
          return dateA - dateB
        case "therapist":
          return a.therapistName.localeCompare(b.therapistName)
        default:
          return dateB - dateA
      }
    })
  }

  const getUniqueSpecializations = () => {
    const specializations = [...new Set(pastAppointments.map((apt) => apt.specialization))]
    return specializations
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "הושלם":
        return "completed"
      case "cancelled":
      case "בוטל":
        return "cancelled"
      case "no-show":
      case "לא הגיע":
        return "no-show"
      default:
        return "completed"
    }
  }

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "הושלם"
      case "cancelled":
        return "בוטל"
      case "no-show":
        return "לא הגיע"
      default:
        return "הושלם"
    }
  }

  if (loading) {
    return <LoadingSpinner message="טוען היסטוריית תורים..." />
  }

  return (
    <div>
      <Navigation userType="patient" />

      <div className="container">
        <div className="history-header">
          <h1>היסטוריית התורים שלי</h1>
          <p>כאן תוכל לראות את כל התורים שהיו לך במכון</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {pastAppointments.length > 0 && (
          <div className="filters-section">
            <div className="filters-row">
              <div className="form-group">
                <label className="form-label">סנן לפי התמחות:</label>
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">כל ההתמחויות</option>
                  {getUniqueSpecializations().map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">מיין לפי:</label>
                <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="date-desc">תאריך (חדש לישן)</option>
                  <option value="date-asc">תאריך (ישן לחדש)</option>
                  <option value="therapist">שם מטפל</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="history-container">
          {getFilteredAndSortedAppointments().length > 0 ? (
            <div className="history-grid">
              {getFilteredAndSortedAppointments().map((appointment) => {
                const { date, time } = formatDate(appointment.appointmentDate)
                return (
                  <div key={appointment.appointmentId} className="history-card">
                    <div className="history-header-card">
                      <div className="appointment-date">
                        <div className="date-text">{date}</div>
                        <div className="time-text">{time}</div>
                      </div>
                      <div className="appointment-status">
                        <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                    </div>

                    <div className="history-body">
                      <div className="appointment-info">
                        <div className="info-item">
                          <span className="info-label">מטפל:</span>
                          <span className="info-value">{appointment.therapistName}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">התמחות:</span>
                          <span className="info-value">{appointment.specialization}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">משך הטיפול:</span>
                          <span className="info-value">{appointment.durationMinutes} דקות</span>
                        </div>
                      </div>
                    </div>

                    <div className="history-footer">
                      <div className="appointment-id">מספר תור: {appointment.appointmentId}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="no-history">
              <div className="no-history-icon">📋</div>
              <h3>אין היסטוריית תורים</h3>
              <p>לא נמצאו תורים קודמים במערכת</p>
            </div>
          )}
        </div>

        {pastAppointments.length > 0 && (
          <div className="history-summary">
            <div className="summary-card">
              <h3>סיכום</h3>
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-number">{pastAppointments.length}</span>
                  <span className="stat-label">סה"כ תורים</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{getUniqueSpecializations().length}</span>
                  <span className="stat-label">התמחויות שונות</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">
                    {[...new Set(pastAppointments.map((apt) => apt.therapistName))].length}
                  </span>
                  <span className="stat-label">מטפלים שונים</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientHistory
