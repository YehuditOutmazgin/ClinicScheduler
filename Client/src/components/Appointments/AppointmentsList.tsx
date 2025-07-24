"use client"
import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { deleteAppointment, fetchAvailableAppointmentsForSpecialtyWeek, fetchAvailableAppointmentsForTherapistWeek, fetchFutureAppointmentsByPatient } from "../../redux/slices/appointmentSlice"
import { getUserId, Patient } from "../../types"
import { useEffect } from "react"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapisrSlice"
const AppointmentsList: React.FC = () => {
  const { user, role } = useSelector((state: RootState) => state.auth)
  const { appointments, loading } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { patients } = useSelector((state: RootState) => state.patients)
  const dispatch = useDispatch<AppDispatch>(); useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [])
  const getUserAppointments = () => {
    const userId = getUserId(user)
    switch (role) {
      case "patient":
        return appointments.filter((apt) => apt.patient?.patientId === userId)
      case "therapist": return appointments.filter((apt) => apt.therapistId === userId)
      case "secretary": return appointments
      default: return []
    }
  }
  const getPatientName = (patientId: number) => {
    const patient = patients.find((p) => p.patientId === patientId)
    return patient ? `${patient.firstName} ${patient.lastName}` : "מטופל לא ידוע"
  }
  const getTherapistName = (therapistId: number) => {
    const therapist = therapists.find((t) => t.therapistId === therapistId)
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : "מטפל לא ידוע"
  }
  const handleCancelAppointment = async (appointmentId: number) => {
    if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      const userId = getUserId(user)
      await dispatch(deleteAppointment({ appointmentId, patientId: userId }))
    }
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return { bg: "var(--pastel-green)", color: "var(--dark-green)" }
      case "completed": return { bg: "var(--pastel-blue)", color: "var(--dark-blue)" }
      case "cancelled": return { bg: "var(--pastel-coral)", color: "var(--dark-coral)" }
      default: return { bg: "var(--gray)", color: "var(--dark-gray)" }
    }
  }
  const userAppointments = getUserAppointments()
  const futureAppointments = userAppointments.filter((apt) => new Date(apt.appointmentDate) >= new Date() && apt.status === "scheduled",)
  const pastAppointments = userAppointments.filter((apt) => new Date(apt.appointmentDate) < new Date() || apt.status === "completed",)
  const cancelledAppointments = userAppointments.filter((apt) => apt.status === "cancelled")
  return (<div className="container">
    <h2 style={{ color: "var(--dark-purple)", marginBottom: "24px", fontSize: "28px", fontWeight: "700", }}
    >
      {role === "secretary" ? "כל התורים" : "התורים שלי"}
    </h2>
    {/* Future Appointments */}
    <div className="card">
      <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>
        תורים עתידיים ({futureAppointments.length})
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th>תאריך</th>
            <th>שעה</th>
            {role !== "patient" && <th>מטופל</th>}
            {role !== "therapist" && <th>מטפל</th>}
            <th>משך</th>
            <th>סטטוס</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {futureAppointments.map((appointment) => (<tr key={appointment.appointmentId}>
            <td style={{ fontWeight: "600" }}>
              {new Date(appointment.appointmentDate).toLocaleDateString("he-IL")}
            </td>
            <td>
              {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", })}
            </td>
            {role !== "patient" && (<td>{appointment.patient ? getPatientName(appointment.patient.patientId) : "לא ידוע"}</td>)}
            {role !== "therapist" && <td>{getTherapistName(appointment.therapistId)}</td>}
            <td>{appointment.durationMinutes} דק'</td>
            <td>
              <span style={{ padding: "4px 8px", borderRadius: "var(--radius-sm)", background: getStatusColor(appointment.status || "").bg, color: getStatusColor(appointment.status || "").color, fontSize: "12px", fontWeight: "600", }}
              >
                {appointment.status || "מתוזמן"}
              </span>
            </td>
            <td>
              <button onClick={() => handleCancelAppointment(appointment.appointmentId)} className="btn btn-danger" style={{ padding: "6px 12px", fontSize: "12px" }}
              >
                ביטול
              </button>
            </td>
          </tr>))}
        </tbody>
      </table>
      {futureAppointments.length === 0 && (<p style={{ textAlign: "center", color: "var(--dark-gray)", padding: "20px" }}>אין תורים עתידיים</p>)}
    </div>
  </div>)
}
export default AppointmentsList