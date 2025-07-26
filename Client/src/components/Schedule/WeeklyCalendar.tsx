"use client"

import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import {
  fetchAvailableAppointmentsForTherapistWeek,
  fetchTherapistWeekAppointments,
  scheduleAppointment,
  deleteAppointment,
} from "../../redux/slices/appointmentSlice"
import type { AvailableAppointment, Appointment } from "../../types"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
import { getUserId } from "../../types"
import "../../styles/WeeklyCalendar.css"

interface WeeklyCalendarProps {
  selectedTherapist?: number
  selectedSpecialty?: string
  patientId?: number
}

interface AppointmentDetailsModalProps {
  appointment: AvailableAppointment | Appointment | null
  isOpen: boolean
  onClose: () => void
  onBook?: (patientId: number) => void
  onCancel?: (appointmentId: number) => void
  isAvailable: boolean
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onBook,
  onCancel,
  isAvailable,
}) => {
  const [bookingPatientId, setBookingPatientId] = useState("")
  const { patients } = useSelector((state: RootState) => state.patients)
  const { role } = useSelector((state: RootState) => state.auth)

  if (!isOpen || !appointment) return null

  const handleBook = () => {
    if (onBook && bookingPatientId) {
      onBook(Number.parseInt(bookingPatientId))
      setBookingPatientId("")
      onClose()
    }
  }

  const handleCancel = () => {
    if (onCancel && "appointmentId" in appointment) {
      onCancel(appointment.appointmentId)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{isAvailable ? "פרטי תור זמין" : "פרטי תור תפוס"}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="appointment-details">
            <div className="detail-item">
              <span className="detail-label">תאריך:</span>
              <span className="detail-value">{new Date(appointment.appointmentDate).toLocaleDateString("he-IL")}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">שעה:</span>
              <span className="detail-value">
                {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">מטפל:</span>
              <span className="detail-value">{appointment.therapistName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">משך התור:</span>
              <span className="detail-value">{appointment.durationMinutes} דקות</span>
            </div>
            {!isAvailable && "patient" in appointment && appointment.patient && (
              <>
                <div className="detail-item">
                  <span className="detail-label">מטופל:</span>
                  <span className="detail-value">
                    {appointment.patient.firstName} {appointment.patient.lastName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">מספר זהות:</span>
                  <span className="detail-value">{appointment.patient.patientId}</span>
                </div>
              </>
            )}
          </div>

          {isAvailable && role === "secretary" && (
            <div className="booking-section">
              <div className="form-group">
                <label className="form-label">בחר מטופל:</label>
                <select
                  value={bookingPatientId}
                  onChange={(e) => setBookingPatientId(e.target.value)}
                  className="form-input"
                >
                  <option value="">בחר מטופל...</option>
                  {patients.map((patient) => (
                    <option key={patient.patientId} value={patient.patientId}>
                      {patient.firstName} {patient.lastName} (ת.ז: {patient.patientId})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            סגור
          </button>
          {isAvailable && role === "secretary" && (
            <button className="btn btn-primary" onClick={handleBook} disabled={!bookingPatientId}>
              קבע תור
            </button>
          )}
          {!isAvailable && (role === "secretary" || role === "therapist") && (
            <button className="btn btn-danger" onClick={handleCancel}>
              בטל תור
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedTherapist, selectedSpecialty, patientId }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment | Appointment | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isAvailableAppointment, setIsAvailableAppointment] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { availableAppointments, appointments } = useSelector((state: RootState) => state.appointments)
  const { patients } = useSelector((state: RootState) => state.patients)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { role, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])

  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const timeSlots = []

  // Generate time slots from 8:00 to 18:00 in 15-minute intervals
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
    }
  }

  useEffect(() => {
    if (selectedTherapist) {
      const weekDate = currentWeek.toISOString().split("T")[0]
      dispatch(fetchAvailableAppointmentsForTherapistWeek({ therapistId: selectedTherapist, weekDate }))
      dispatch(fetchTherapistWeekAppointments({ therapistId: selectedTherapist, date: weekDate }))
    }
  }, [selectedTherapist, currentWeek, dispatch])

  const getWeekDates = () => {
    const dates = []
    const startOfWeek = new Date(currentWeek)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const getAvailableAppointmentForSlot = (date: Date, timeSlot: string) => {
    const [hour, minute] = timeSlot.split(":").map(Number)
    const slotDateTime = new Date(date)
    slotDateTime.setHours(hour, minute, 0, 0)

    return availableAppointments.find((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate)
      return appointmentDate.getTime() === slotDateTime.getTime()
    })
  }

  const getAppointmentForSlot = (date: Date, timeSlot: string) => {
    const [hour, minute] = timeSlot.split(":").map(Number)
    const slotDateTime = new Date(date)
    slotDateTime.setHours(hour, minute, 0, 0)

    return appointments.find((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate)
      return appointmentDate.getTime() === slotDateTime.getTime()
    })
  }

  const handleAppointmentClick = (appointment: AvailableAppointment | Appointment, isAvailable: boolean) => {
    setSelectedAppointment(appointment)
    setIsAvailableAppointment(isAvailable)
    setShowModal(true)
  }

  const handleBookAppointment = async (patientId: number) => {
    if (!selectedAppointment) return

    await dispatch(
      scheduleAppointment({
        patientId,
        appointmentId: selectedAppointment.appointmentId,
      }),
    )

    setShowModal(false)
    setSelectedAppointment(null)
  }

  const handleCancelAppointment = async (appointmentId: number) => {
    if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      const userId = getUserId(user)
      await dispatch(deleteAppointment({ appointmentId, patientId: userId }))
      setShowModal(false)
      setSelectedAppointment(null)
    }
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }

  const getAppointmentHeight = (durationMinutes: number) => {
    // Each 15-minute slot is one unit, so calculate how many units this appointment spans
    const units = Math.ceil(durationMinutes / 15)
    return units
  }

  const weekDates = getWeekDates()

  return (
    <div className="weekly-calendar">
      <div className="calendar-header">
        <h3 className="calendar-title">
          שבוע {weekDates[0].toLocaleDateString("he-IL")} - {weekDates[6].toLocaleDateString("he-IL")}
        </h3>
        <div className="calendar-navigation">
          <button className="nav-button" onClick={() => navigateWeek("prev")}>
            שבוע קודם
          </button>
          <button className="nav-button" onClick={() => navigateWeek("next")}>
            שבוע הבא
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {/* Header row */}
        <div className="time-header">שעה</div>
        {daysOfWeek.map((day, index) => (
          <div key={day} className="day-header">
            <div className="day-name">{day}</div>
            <div className="day-date">
              {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
            </div>
          </div>
        ))}

        {/* Time slots */}
        {timeSlots.map((timeSlot, timeIndex) => (
          <React.Fragment key={timeSlot}>
            <div className="time-slot-label">{timeSlot}</div>
            {weekDates.map((date, dayIndex) => {
              const availableAppointment = getAvailableAppointmentForSlot(date, timeSlot)
              const bookedAppointment = getAppointmentForSlot(date, timeSlot)

              if (availableAppointment) {
                const height = getAppointmentHeight(availableAppointment.durationMinutes)
                return (
                  <div
                    key={`${dayIndex}-${timeSlot}`}
                    className="calendar-cell appointment-available"
                    style={{ gridRowEnd: `span ${height}` }}
                    onClick={() => handleAppointmentClick(availableAppointment, true)}
                  >
                    <div className="appointment-content">
                      <div className="appointment-time">{timeSlot}</div>
                      <div className="appointment-duration">{availableAppointment.durationMinutes} דק'</div>
                      <div className="appointment-therapist">{availableAppointment.therapistName}</div>
                    </div>
                  </div>
                )
              } else if (bookedAppointment) {
                const height = getAppointmentHeight(bookedAppointment.durationMinutes)
                return (
                  <div
                    key={`${dayIndex}-${timeSlot}`}
                    className="calendar-cell appointment-booked"
                    style={{ gridRowEnd: `span ${height}` }}
                    onClick={() => handleAppointmentClick(bookedAppointment, false)}
                  >
                    <div className="appointment-content">
                      <div className="appointment-time">{timeSlot}</div>
                      <div className="appointment-duration">{bookedAppointment.durationMinutes} דק'</div>
                      <div className="appointment-therapist">{bookedAppointment.therapistName}</div>
                      {bookedAppointment.patient && (
                        <div className="appointment-patient">
                          {bookedAppointment.patient.firstName} {bookedAppointment.patient.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                )
              } else {
                return <div key={`${dayIndex}-${timeSlot}`} className="calendar-cell empty-slot"></div>
              }
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="calendar-controls">
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color legend-available"></div>
            <span>זמין</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-booked"></div>
            <span>תפוס</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-empty"></div>
            <span>לא זמין</span>
          </div>
        </div>
      </div>

      <AppointmentDetailsModal
        appointment={selectedAppointment}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBook={handleBookAppointment}
        onCancel={handleCancelAppointment}
        isAvailable={isAvailableAppointment}
      />
    </div>
  )
}

export default WeeklyCalendar
