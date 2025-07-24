import type React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../../redux/store"
import { getUserId } from "../../types"
const PatientDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const userId = getUserId(user)
  const userAppointments = appointments.filter((apt) => apt.patient?.patientId === userId)
  const upcomingAppointments = userAppointments.filter((apt) => apt.status === "scheduled" && new Date(apt.appointmentDate) >= new Date(),)
  const getTherapistName = (therapistId: number) => {
    const therapist = therapists.find((t) => t.therapistId === therapistId)
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : "מטפל לא ידוע"
  }
  return (<div>
    <h1 style={{ color: "var(--dark-purple)", marginBottom: "32px", fontSize: "32px", fontWeight: "700", }}
    >
      לוח בקרה מטופל
    </h1>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
      <div className="card">
        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>פעולות מהירות</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link to="/book-appointment" className="btn btn-primary">
            קביעת תור חדש
          </Link>
          <Link to="/appointments" className="btn btn-secondary">
            צפייה בכל התורים
          </Link>
        </div>
      </div>
      <div className="card">
        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>תורים קרובים</h3>
        {upcomingAppointments.length > 0 ? (<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {upcomingAppointments.slice(0, 3).map((appointment) => (<div key={appointment.appointmentId} style={{ padding: "12px", background: "var(--pastel-mint)", borderRadius: "var(--radius-md)", border: "1px solid var(--dark-mint)", }}
          >
            <div style={{ fontWeight: "600", color: "var(--dark-mint)" }}>
              {new Date(appointment.appointmentDate).toLocaleDateString("he-IL")} בשעה{" "}
              {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", })}
            </div>
            <div style={{ fontSize: "14px", color: "var(--dark-gray)" }}>
              {getTherapistName(appointment.therapistId)}
            </div>
          </div>))}
        </div>) : (<p style={{ color: "var(--dark-gray)" }}>אין תורים קרובים</p>)}
      </div>
      <div className="card">
        <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>סטטיסטיקות תורים</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>סה"כ תורים:</span>
            <strong>{userAppointments.length}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>קרובים:</span>
            <strong style={{ color: "var(--dark-green)" }}>{upcomingAppointments.length}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>הושלמו:
            </span>
            <strong style={{ color: "var(--dark-blue)" }}>
              {userAppointments.filter((apt) => apt.status === "completed").length}
            </strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>בוטלו:</span>
            <strong style={{ color: "var(--dark-coral)" }}>
              {userAppointments.filter((apt) => apt.status === "cancelled").length}
            </strong>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
export default PatientDashboard