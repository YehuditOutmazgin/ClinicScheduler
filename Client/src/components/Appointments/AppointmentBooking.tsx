"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { scheduleAppointment, fetchAvailableAppointmentsForTherapistWeek } from "../../redux/slices/appointmentSlice"
import { getUserId } from "../../types"

const AppointmentBooking: React.FC = () => {
  const [selectedTherapist, setSelectedTherapist] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { user, role } = useSelector((state: RootState) => state.auth)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { availableAppointments } = useSelector((state: RootState) => state.appointments)
  useEffect(() => {
    if (selectedTherapist && selectedDate) {
      dispatch(fetchAvailableAppointmentsForTherapistWeek({
        therapistId: Number.parseInt(selectedTherapist), weekDate: selectedDate,
      }),)
    }
  },
    [selectedTherapist, selectedDate, dispatch])
  const handleBookAppointment = async () => {
    if (!selectedAppointment || !user) return
    const userId = getUserId(user)
    if (userId === 0)
      return await dispatch(scheduleAppointment({ patientId: userId, appointmentId: selectedAppointment, }),)
    // Reset form    
    setSelectedTherapist("")
    setSelectedDate("")
    setSelectedAppointment(null)
  }
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }
  return <div className="container">
    <h2 style={{ color: "var(--dark-purple)", marginBottom: "24px", fontSize: "28px", fontWeight: "700", }}>
      קביעת תור
    </h2>
    <div className="card">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div>
          <div className="form-group">
            <label className="form-label">בחירת מטפל</label>
            <select value={selectedTherapist} onChange={(e) => setSelectedTherapist(e.target.value)} className="form-input" >
              <option value="">בחר מטפל...</option>
              {therapists.map((therapist) => (<option key={therapist.therapistId} value={therapist.therapistId}>
                {therapist.firstName} {therapist.lastName} - {therapist.specialization}
              </option>))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">בחירת תאריך</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="form-input" min={getMinDate()} />
          </div>
        </div>
        {availableAppointments.length > 0 && (<div>
          <h4 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>תורים זמינים</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", }} >
            {availableAppointments.map((appointment) => (<button key={appointment.appointmentId} onClick={() => setSelectedAppointment(appointment.appointmentId)} className={`btn ${selectedAppointment === appointment.appointmentId ? "btn-primary" : "btn-success"}`} style={{ cursor: "pointer", }} >
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", })}
              </div>
              <div style={{ fontSize: "12px" }}>{appointment.durationMinutes} דק'</div>
            </button>))}
          </div>
        </div>)}
      </div>
      {selectedAppointment && (<div style={{ marginTop: "24px", textAlign: "center" }}>
        <button onClick={handleBookAppointment} className="btn btn-primary" style={{ padding: "16px 32px", fontSize: "16px" }} >קביעת התור
        </button>
      </div>)}
    </div>
  </div>
}

export default AppointmentBooking
