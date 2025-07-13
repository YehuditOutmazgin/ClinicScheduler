"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAvailableAppointments, scheduleAppointment } from "../../redux/slices/appointmentSlice"
import { fetchAllTherapists } from "../../redux/slices/therapistSlice"
import Navigation from "../common/Navigation"
import WeeklyCalendar from "./WeeklyCalendar"
import LoadingSpinner from "../common/LoadingSpinner"
import "../../styles/AppointmentScheduling.css"

const AppointmentScheduling = ({ userType }) => {
  const dispatch = useDispatch()
  const { availableAppointments, loading } = useSelector((state) => state.appointments)
  const { therapists } = useSelector((state) => state.therapists)
  const { user } = useSelector((state) => state.auth)

  const [selectedTherapist, setSelectedTherapist] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [patientId, setPatientId] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const specialties = ["פיזיותרפיה", "ריפוי בעיסוק", "קלינאות תקשורת", "פסיכולוגיה", "הדרכת הורים"]

  useEffect(() => {
    dispatch(fetchAllTherapists())
  }, [dispatch])

  useEffect(() => {
    if (selectedTherapist || selectedSpecialty) {
      const weekDate = formatDateForAPI(currentWeek)
      dispatch(
        fetchAvailableAppointments({
          therapistId: selectedTherapist || null,
          specialty: selectedSpecialty || null,
          weekDate,
        }).apply.$values,
      )
    }
  }, [dispatch, selectedTherapist, selectedSpecialty, currentWeek])

  const formatDateForAPI = (date) => {
    return date.toISOString().split("T")[0]
  }

  const handleTherapistChange = (therapistId) => {
    setSelectedTherapist(therapistId)
    setSelectedSpecialty("")
  }

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty)
    setSelectedTherapist("")
  }

  const handleWeekChange = (direction) => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(newWeek.getDate() + direction * 7)
    setCurrentWeek(newWeek)
  }

  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment)
    setShowConfirmation(true)
  }

  const handleConfirmSchedule = async () => {
    if (!selectedAppointment) return

    const patientIdToUse = userType === "patient" ? user.patientId : Number.parseInt(patientId)

    try {
      await dispatch(
        scheduleAppointment({
          patientId: patientIdToUse,
          appointmentId: selectedAppointment.appointmentId,
        }),
      )

      setShowConfirmation(false)
      setSelectedAppointment(null)

      // Refresh available appointments
      const weekDate = formatDateForAPI(currentWeek)
      dispatch(
        fetchAvailableAppointments({
          therapistId: selectedTherapist || null,
          specialty: selectedSpecialty || null,
          weekDate,
        }),
      )

      alert("התור נקבע בהצלחה!")
    } catch (error) {
      alert("שגיאה בקביעת התור. אנא נסה שוב.")
    }
  }

  const getWeekDateRange = () => {
    const startOfWeek = new Date(currentWeek)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    return {
      start: startOfWeek.toLocaleDateString("he-IL"),
      end: endOfWeek.toLocaleDateString("he-IL"),
    }
  }

  if (loading) {
    return <LoadingSpinner message="טוען תורים זמינים..." />
  }

  return (
    <div>
      <Navigation userType={userType} />

      <div className="container">
        <div className="scheduling-header">
          <h1>קביעת תור</h1>
          <p>בחר מטפל או התמחות וקבע תור בלוח הזמנים</p>
        </div>

        <div className="scheduling-filters">
          <div className="filter-section">
            <h3>בחירת מטפל או התמחות</h3>
            <div className="filter-options">
              <div className="form-group">
                <label className="form-label">בחר מטפל:</label>
                <select
                  className="form-select"
                  value={selectedTherapist}
                  onChange={(e) => handleTherapistChange(e.target.value)}
                >
                  <option value="">-- בחר מטפל --</option>
                  {therapists.map((therapist) => (
                    <option key={therapist.therapistId} value={therapist.therapistId}>
                      {therapist.firstName} {therapist.lastName} - {therapist.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">או בחר התמחות:</label>
                <select
                  className="form-select"
                  value={selectedSpecialty}
                  onChange={(e) => handleSpecialtyChange(e.target.value)}
                >
                  <option value="">-- בחר התמחות --</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {userType === "secretary" && (
            <div className="form-group">
              <label className="form-label">מספר זהות מטופל:</label>
              <input
                type="text"
                className="form-control"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="הכנס מספר זהות מטופל"
              />
            </div>
          )}
        </div>

        {(selectedTherapist || selectedSpecialty) && (
          <div className="calendar-section">
            <div className="calendar-header">
              <button className="btn btn-outline week-nav-btn" onClick={() => handleWeekChange(-1)}>
                ← שבוע קודם
              </button>

              <div className="week-display">
                <h3>
                  שבוע {getWeekDateRange().start} - {getWeekDateRange().end}
                </h3>
              </div>

              <button className="btn btn-outline week-nav-btn" onClick={() => handleWeekChange(1)}>
                שבוע הבא →
              </button>
            </div>

            <WeeklyCalendar
              appointments={availableAppointments}
              onAppointmentSelect={handleAppointmentSelect}
              currentWeek={currentWeek}
            />
          </div>
        )}

        {showConfirmation && selectedAppointment && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h3>אישור קביעת תור</h3>
              <div className="appointment-details">
                <p>
                  <strong>תאריך:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString("he-IL")}
                </p>
                <p>
                  <strong>שעה:</strong>{" "}
                  {new Date(selectedAppointment.appointmentDate).toLocaleTimeString("he-IL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>מטפל:</strong> {selectedAppointment.therapistName}
                </p>
                <p>
                  <strong>התמחות:</strong> {selectedAppointment.specialization}
                </p>
                <p>
                  <strong>משך:</strong> {selectedAppointment.durationMinutes} דקות
                </p>
              </div>
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={handleConfirmSchedule}>
                  אשר קביעת תור
                </button>
                <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentScheduling
