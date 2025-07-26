import type React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../../redux/store"
import { getUserId } from "../../types"
import "../../styles/Dashboard.css"

const TherapistDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const { patients } = useSelector((state: RootState) => state.patients)

  const userId = getUserId(user)
  const therapistAppointments = appointments.filter((apt) => apt.therapistId === userId)
  const todayAppointments = therapistAppointments.filter(
    (apt) => new Date(apt.appointmentDate).toDateString() === new Date().toDateString() && apt.status === "scheduled",
  )

  const getPatientName = (patientId: number) => {
    const patient = patients.find((p) => p.patientId === patientId)
    return patient ? `${patient.firstName} ${patient.lastName}` : "מטופל לא ידוע"
  }

  return (
    <div className="therapist-dashboard">
      <h1 className="dashboard-title">לוח בקרה מטפל</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">פעולות מהירות</h3>
          <div className="quick-actions">
            <Link to="/schedule" className="btn btn-primary">
              צפייה בלוח הזמנים
            </Link>
            <Link to="/patients" className="btn btn-secondary">
              צפייה במטופלים
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">תורים היום</h3>
          {todayAppointments.length > 0 ? (
            <div className="appointments-list">
              {todayAppointments.map((appointment) => (
                <div key={appointment.appointmentId} className="appointment-item today">
                  <div className="appointment-time">
                    {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    - {appointment.patient ? getPatientName(appointment.patient.patientId) : "מטופל לא ידוע"}
                  </div>
                  <div className="appointment-duration">משך: {appointment.durationMinutes} דקות</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">אין תורים היום</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">סטטיסטיקות</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span>סה"כ מטופלים:</span>
              <strong>
                {new Set(therapistAppointments.map((apt) => apt.patient?.patientId).filter(Boolean)).size}
              </strong>
            </div>
            <div className="stat-item">
              <span>סה"כ תורים:</span>
              <strong>{therapistAppointments.length}</strong>
            </div>
            <div className="stat-item">
              <span>תורים היום:</span>
              <strong className="text-green">{todayAppointments.length}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TherapistDashboard
