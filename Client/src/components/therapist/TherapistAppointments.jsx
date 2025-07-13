"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getTherapistAppointments } from "../../api/appointmentFetch"
import Navigation from "../common/Navigation"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/TherapistAppointments.css"

const TherapistAppointments = () => {
  const { user } = useSelector((state) => state.auth)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate, user])

  const fetchAppointments = async () => {
    if (!user?.therapistId) return

    try {
      setLoading(true)
      const data = await getTherapistAppointments(user.therapistId, selectedDate)
      setAppointments(data)
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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    setShowModal(true)
  }

  const handleMarkCompleted = async (appointmentId) => {
    try {
      // Here you would call an API to mark the appointment as completed
      // For now, we'll just update the local state
      setAppointments((prev) =>
        prev.map((apt) => (apt.appointmentId === appointmentId ? { ...apt, status: "completed" } : apt)),
      )
      setShowModal(false)
      alert("התור סומן כהושלם")
    } catch (error) {
      console.error("Error marking appointment as completed:", error)
      alert("שגיאה בעדכון סטטוס התור")
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "completed"
      case "cancelled":
        return "cancelled"
      case "no-show":
        return "no-show"
      default:
        return "scheduled"
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
        return "מתוכנן"
    }
  }

  if (loading) {
    return <LoadingSpinner message="טוען תורים..." />
  }

  return (
    <div>
      <Navigation userType="therapist" />

      <div className="container">
        <div className="appointments-header">
          <h1>התורים שלי</h1>
          <p>צפה בתורים לתאריך מסוים וסמן תורים כהושלמו</p>
        </div>

        <div className="date-selector">
          <div className="form-group">
            <label className="form-label">בחר תאריך:</label>
            <input
              type="date"
              className="form-control date-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="selected-date-display">
            <h3>{formatDate(selectedDate)}</h3>
          </div>
        </div>

        <div className="appointments-container">
          {appointments.length > 0 ? (
            <div className="appointments-timeline">
              {appointments
                .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
                .map((appointment) => (
                  <div
                    key={appointment.appointmentId}
                    className="appointment-timeline-item"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <div className="timeline-time">{formatTime(appointment.appointmentDate)}</div>
                    <div className="timeline-content">
                      <div className="appointment-card-mini">
                        <div className="appointment-header-mini">
                          <div className="patient-info">
                            <div className="patient-name">
                              {appointment.patient?.firstName} {appointment.patient?.lastName}
                            </div>
                            <div className="appointment-duration">{appointment.durationMinutes} דקות</div>
                          </div>
                          <div className="appointment-status-mini">
                            <span className={`status-badge ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="no-appointments">
              <div className="no-appointments-icon">📅</div>
              <h3>אין תורים לתאריך זה</h3>
              <p>לא נמצאו תורים לתאריך שנבחר</p>
            </div>
          )}
        </div>

        {/* Appointment Details Modal */}
        {showModal && selectedAppointment && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>פרטי התור</h3>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="appointment-details">
                  <div className="detail-row">
                    <span className="detail-label">מטופל:</span>
                    <span className="detail-value">
                      {selectedAppointment.patient?.firstName} {selectedAppointment.patient?.lastName}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">תאריך ושעה:</span>
                    <span className="detail-value">
                      {formatDate(selectedAppointment.appointmentDate)} בשעה{" "}
                      {formatTime(selectedAppointment.appointmentDate)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">משך הטיפול:</span>
                    <span className="detail-value">{selectedAppointment.durationMinutes} דקות</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">סטטוס:</span>
                    <span className="detail-value">
                      <span className={`status-badge ${getStatusColor(selectedAppointment.status)}`}>
                        {getStatusText(selectedAppointment.status)}
                      </span>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">מספר תור:</span>
                    <span className="detail-value">{selectedAppointment.appointmentId}</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {selectedAppointment.status !== "completed" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleMarkCompleted(selectedAppointment.appointmentId)}
                  >
                    סמן כהושלם
                  </button>
                )}
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  סגור
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TherapistAppointments
