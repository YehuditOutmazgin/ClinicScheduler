import type React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../../redux/store"
import { getUserId } from "../../types"
const TherapistDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const { patients } = useSelector((state: RootState) => state.patients)
  const userId = getUserId(user)
  const therapistAppointments = appointments.filter((apt) => apt.therapistId === userId)
  const todayAppointments = therapistAppointments.filter(
    (apt) => new Date(apt.appointmentDate).toDateString() === new Date().toDateString() && apt.status === "scheduled",)
  const getPatientName = (patientId: number) => {
    const patient = patients.find((p) => p.patientId === patientId)
    return patient ? `${patient.firstName} ${patient.lastName}` : "מטופל לא ידוע"
  }
  return (<div>
    <h1 style={{ color: "var(--dark-purple)", marginBottom: "32px", fontSize: "32px", fontWeight: "700", }}
    >
      לוח בקרה מטפל
    </h1>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
      <div className="card">

        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>פעולות מהירות</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="/schedule" className="btn btn-primary">
            צפייה בלוח הזמנים
          </Link>
          <Link to="/patients" className="btn btn-secondary">
            צפייה במטופלים

          </Link>
        </div>
      </div>
      <div className="card">
        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>תורים היום</h3>
        {todayAppointments.length > 0 ? (<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {todayAppointments.map((appointment) => (<div key={appointment.appointmentId} style={{ padding: "12px", background: "var(--pastel-blue)", borderRadius: "var(--radius-md)", border: "1px solid var(--dark-blue)", }}
          >
            <div style={{ fontWeight: "600", color: "var(--dark-blue)" }}>
              {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", })}{" "}
              - {appointment.patient ? getPatientName(appointment.patient.patientId) : "מטופל לא ידוע"}
            </div>
            <div style={{ fontSize: "14px", color: "var(--dark-gray)" }}>
              משך: {appointment.durationMinutes} דקות
            </div>
          </div>))}
        </div>) : (<p style={{ color: "var(--dark-gray)" }}>אין תורים היום</p>)}
      </div>
      <div className="card">
        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>סטטיסטיקות</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>סה"כ מטופלים:</span>
            <strong>
              {new Set(therapistAppointments.map((apt) => apt.patient?.patientId).filter(Boolean)).size}
            </strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>סה"כ תורים:</span>
            <strong>{therapistAppointments.length}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>תורים היום:</span>
            <strong style={{ color: "var(--dark-green)" }}>{todayAppointments.length}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
export default TherapistDashboard