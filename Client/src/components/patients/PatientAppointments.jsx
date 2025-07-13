"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchFutureAppointments } from "../../redux/slices/appointmentSlice"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/PatientAppointments.css"

const PatientAppointments = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { futureAppointments, loading, error } = useSelector((state) => state.appointments)
  const [filter, setFilter] = useState("all")
  useEffect(() => {
    if (user?.patientId) {
      dispatch(fetchFutureAppointments(user.patientId))
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

  const getFilteredAppointments = () => {
    if (filter === "all") return futureAppointments
    return futureAppointments.filter((apt) => apt.specialization === filter)
  }

  const getUniqueSpecializations = () => {
    const specializations = [...new Set(futureAppointments.map((apt) => apt.specialization))]
    return specializations
  }

  if (loading) {
    return <LoadingSpinner message="טוען תורים..." />
  }

  return (
    <div>
      <Navigation userType="patient" />

      <div className="container">
        <div className="appointments-header">
          <h1>התורים העתידיים שלי</h1>
          <p>כאן תוכל לראות את כל התורים העתידיים שלך</p>
          <Link to="/patient/schedule" className="btn btn-primary">
            קבע תור חדש
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {futureAppointments.length > 0 && (
          <div className="filter-section">
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
        )}

        <div className="appointments-container">
          {getFilteredAppointments().length > 0 ? (
            <div className="appointments-grid">
              {getFilteredAppointments().map((appointment) => {
                const { date, time } = formatDate(appointment.appointmentDate)
                return (
                  <div key={appointment.appointmentId} className="appointment-card">
                    <div className="appointment-header">
                      <div className="appointment-date">
                        <div className="date-text">{date}</div>
                        <div className="time-text">{time}</div>
                      </div>
                      <div className="appointment-status">
                        <span className="status-badge upcoming">תור עתידי</span>
                      </div>
                    </div>

                    <div className="appointment-body">
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

                    <div className="appointment-footer">
                      <div className="appointment-id">מספר תור: {appointment.appointmentId}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="no-appointments">
              <div className="no-appointments-icon">📅</div>
              <h3>אין תורים עתידיים</h3>
              <p>לא נמצאו תורים עתידיים במערכת</p>
              <Link to="/patient/schedule" className="btn btn-primary">
                קבע תור חדש
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientAppointments
