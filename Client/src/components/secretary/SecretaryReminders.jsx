"use client"

import { useState, useEffect } from "react"
import { getNextBusinessDayAppointments, confirmAppointment } from "../../api/appointmentFetch"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/SecretaryReminders.css"

const SecretaryReminders = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmedAppointments, setConfirmedAppointments] = useState(new Set())
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fetchReminders()
  }, [])

  const fetchReminders = async () => {
    try {
      setLoading(true)
      const data = await getNextBusinessDayAppointments()
      setAppointments(data)
    } catch (error) {
      console.error("Error fetching reminders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmReminder = async (appointmentId) => {
    try {
      await confirmAppointment(appointmentId)
      setConfirmedAppointments((prev) => new Set([...prev, appointmentId]))
      setSuccessMessage("התזכורת אושרה בהצלחה!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      console.error("Error confirming appointment:", error)
      alert("שגיאה באישור התזכורת")
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("he-IL", {
        weekday: "long",
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

  const getPendingReminders = () => {
    return appointments.filter((apt) => !confirmedAppointments.has(apt.appointmentId))
  }

  const getConfirmedReminders = () => {
    return appointments.filter((apt) => confirmedAppointments.has(apt.appointmentId))
  }

  if (loading) {
    return <LoadingSpinner message="טוען תזכורות..." />
  }

  return (
    <div>
      <Navigation userType="secretary" />

      <div className="container">
        <div className="reminders-header">
          <h1>תזכורות תורים</h1>
          <p>נהל תזכורות לתורים של יום העסקים הבא</p>
        </div>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <div className="reminders-stats">
          <div className="stat-card pending">
            <div className="stat-number">{getPendingReminders().length}</div>
            <div className="stat-label">תזכורות ממתינות</div>
          </div>
          <div className="stat-card confirmed">
            <div className="stat-number">{getConfirmedReminders().length}</div>
            <div className="stat-label">תזכורות שאושרו</div>
          </div>
          <div className="stat-card total">
            <div className="stat-number">{appointments.length}</div>
            <div className="stat-label">סה"כ תורים</div>
          </div>
        </div>

        <div className="reminders-sections">
          {/* Pending Reminders */}
          <div className="reminders-section">
            <h2 className="section-title">תזכורות ממתינות</h2>
            {getPendingReminders().length > 0 ? (
              <div className="reminders-list">
                {getPendingReminders().map((appointment) => {
                  const { date, time } = formatDateTime(appointment.appointmentDate)
                  return (
                    <div key={appointment.appointmentId} className="reminder-card pending">
                      <div className="reminder-info">
                        <div className="patient-details">
                          <div className="patient-name">
                            {appointment.patient?.firstName} {appointment.patient?.lastName}
                          </div>
                          <div className="patient-phone">{appointment.patient?.phoneNumber}</div>
                        </div>
                        <div className="appointment-details">
                          <div className="appointment-datetime">
                            <div className="appointment-date">{date}</div>
                            <div className="appointment-time">{time}</div>
                          </div>
                          <div className="therapist-info">
                            <div className="therapist-name">{appointment.therapistName}</div>
                            <div className="specialization">{appointment.specialization}</div>
                          </div>
                        </div>
                      </div>
                      <div className="reminder-actions">
                        <button
                          className="btn btn-primary confirm-btn"
                          onClick={() => handleConfirmReminder(appointment.appointmentId)}
                        >
                          אשר תזכורת
                        </button>
                        <div className="appointment-id">תור #{appointment.appointmentId}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="no-reminders">
                <div className="no-reminders-icon">✅</div>
                <p>כל התזכורות אושרו!</p>
              </div>
            )}
          </div>

          {/* Confirmed Reminders */}
          {getConfirmedReminders().length > 0 && (
            <div className="reminders-section">
              <h2 className="section-title">תזכורות שאושרו</h2>
              <div className="reminders-list">
                {getConfirmedReminders().map((appointment) => {
                  const { date, time } = formatDateTime(appointment.appointmentDate)
                  return (
                    <div key={appointment.appointmentId} className="reminder-card confirmed">
                      <div className="reminder-info">
                        <div className="patient-details">
                          <div className="patient-name">
                            {appointment.patient?.firstName} {appointment.patient?.lastName}
                          </div>
                          <div className="patient-phone">{appointment.patient?.phoneNumber}</div>
                        </div>
                        <div className="appointment-details">
                          <div className="appointment-datetime">
                            <div className="appointment-date">{date}</div>
                            <div className="appointment-time">{time}</div>
                          </div>
                          <div className="therapist-info">
                            <div className="therapist-name">{appointment.therapistName}</div>
                            <div className="specialization">{appointment.specialization}</div>
                          </div>
                        </div>
                      </div>
                      <div className="reminder-status">
                        <div className="status-badge confirmed">אושר</div>
                        <div className="appointment-id">תור #{appointment.appointmentId}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SecretaryReminders
