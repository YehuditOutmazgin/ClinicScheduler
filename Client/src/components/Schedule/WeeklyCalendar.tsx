"use client"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { fetchAppointmentsByTherapistAndDate, fetchAvailableAppointmentsForTherapistWeek, fetchTherapistWeekAppointments, scheduleAppointment } from "../../redux/slices/appointmentSlice"
import type { AvailableAppointment } from "../../types"
import "../../styles/WeeklyCalendar.css"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapisrSlice"
interface WeeklyCalendarProps {
  selectedTherapist?: number
  selectedSpecialty?: string
  patientId?: number
}
const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedTherapist, selectedSpecialty, patientId }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<AvailableAppointment | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingPatientId, setBookingPatientId] = useState(patientId?.toString() || "")
  const dispatch = useDispatch<AppDispatch>()
  const { availableAppointments, appointments } = useSelector((state: RootState) => state.appointments)
  const { patients } = useSelector((state: RootState) => state.patients)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { role } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [therapists, patients])
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const timeSlots = []  // Generate time slots from 8:00 to 18:00 in 15-minute intervals 
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
    }
  } useEffect(() => {
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
    } return dates
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
  const handleAppointmentClick = (appointment: AvailableAppointment) => {
    setSelectedAppointment(appointment)
    if (role === "secretary" || role === "patient") { setShowBookingModal(true) }
  }
  const handleBookAppointment = async () => {
    if (!selectedAppointment || !bookingPatientId)
      return
    await dispatch(scheduleAppointment({
      patientId: Number.parseInt(bookingPatientId),
      appointmentId: selectedAppointment.appointmentId,
    }),)
    setShowBookingModal(false)
    setSelectedAppointment(null)
    setBookingPatientId("")
  }
  const navigateWeek = (direction: "prev" | "next") => {
    const newWeek = new Date(currentWeek)
    newWeek.setDate(currentWeek.getDate() + (direction === "next" ? 7 : -7))
    setCurrentWeek(newWeek)
  }
  const weekDates = getWeekDates()
  return (<div className="weekly-calendar">
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
      {daysOfWeek.map((day, index) => (<div key={day} className="day-header">
        <div className="day-name">{day}</div>
        <div className="day-date">
          {weekDates[index].getDate()}/{weekDates[index].getMonth() + 1}
        </div>
      </div>))}
      {/* Time slots */}
      {timeSlots.map((timeSlot) => (<React.Fragment key={timeSlot}>
        <div className="time-slot-label">{timeSlot}</div>
        {weekDates.map((date, dayIndex) => {
          const appointment = getAvailableAppointmentForSlot(date, timeSlot)
          if (appointment) {
            return (<div key={`${dayIndex}-${timeSlot}`} className="calendar-cell appointment-available" onClick={() => handleAppointmentClick(appointment)}
            >
              <div className="appointment-content">
                <div className="appointment-time">{timeSlot}</div>
                <div className="appointment-duration">{appointment.durationMinutes} דק'</div>
                <div className="appointment-therapist">{appointment.therapistName}</div>
              </div>
            </div>)
          } else {
            const av = getAppointmentForSlot(date, timeSlot)
            if (av) { return (<div key={`${dayIndex}-${timeSlot}`} className="calendar-cell appointment-booked" onClick={() => handleAppointmentClick(av)}                  >                    <div className="appointment-content">                      <div className="appointment-time">{timeSlot}</div>                      <div className="appointment-duration">{av.durationMinutes} דק'</div>                      <div className="appointment-therapist">{av.therapistName}</div>                    </div>                  </div>) } else return <div key={`${dayIndex}-${timeSlot}`} className="calendar-cell empty-slot"></div>
          }
        })}
      </React.Fragment>))}
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
    {/* Booking Modal */}
    {showBookingModal && selectedAppointment && (<div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>קביעת תור</h3>
        <p style={{ marginBottom: "16px", color: "var(--dark-gray)" }}>
          {new Date(selectedAppointment.appointmentDate).toLocaleDateString("he-IL")} בשעה{" "}
          {new Date(selectedAppointment.appointmentDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", })}
        </p>
        <p style={{ marginBottom: "16px", color: "var(--dark-gray)" }}>מטפל: {selectedAppointment.therapistName}</p>
        {role === "secretary" && (<div className="form-group">
          <label className="form-label">מספר זהות מטופל</label>
          <select value={bookingPatientId} onChange={(e) => setBookingPatientId(e.target.value)} className="form-input" required
          >
            <option value="">בחר מטופל...</option>
            {patients.map((patient) => (<option key={patient.patientId} value={patient.patientId}>
              {patient.firstName} {patient.lastName} (ת.ז: {patient.patientId})
            </option>))}
          </select>
        </div>)}
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "20px" }}>
          <button className="btn btn-secondary" onClick={() => setShowBookingModal(false)}>
            ביטול
          </button>
          <button className="btn btn-primary" onClick={handleBookAppointment} disabled={!bookingPatientId}>
            קביעת תור
          </button>
        </div>
      </div>
    </div>)}
  </div>)
}
export default WeeklyCalendar