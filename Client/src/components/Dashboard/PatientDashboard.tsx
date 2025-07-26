import type React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../../redux/store"
import { getUserId } from "../../types"
import "../../styles/Dashboard.css"

const PatientDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.therapists)

  const userId = getUserId(user)
  const userAppointments = appointments.filter((apt) => apt.patient?.patientId === userId)
  const upcomingAppointments = userAppointments.filter(
    (apt) => apt.status === "scheduled" && new Date(apt.appointmentDate) >= new Date(),
  )

  const getTherapistName = (therapistId: number) => {
    const therapist = therapists.find((t) => t.therapistId === therapistId)
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : "מטפל לא ידוע"
  }

  return (
    <div className="patient-dashboard">
      <h1 className="dashboard-title">לוח בקרה מטופל</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">פעולות מהירות</h3>
          <div className="quick-actions">
            <Link to="/book-appointment" className="btn btn-primary">
              קביעת תור חדש
            </Link>
            <Link to="/appointments" className="btn btn-secondary">
              צפייה בכל התורים
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">תורים קרובים</h3>
          {upcomingAppointments.length > 0 ? (
            <div className="appointments-list">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <div key={appointment.appointmentId} className="appointment-item upcoming">
                  <div className="appointment-time">
                    {new Date(appointment.appointmentDate).toLocaleDateString("he-IL")} בשעה{" "}
                    {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="appointment-therapist">עם {getTherapistName(appointment.therapistId)}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">אין תורים קרובים</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">סטטיסטיקות תורים</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span>סה"כ תורים:</span>
              <strong>{userAppointments.length}</strong>
            </div>
            <div className="stat-item">
              <span>קרובים:</span>
              <strong className="text-green">{upcomingAppointments.length}</strong>
            </div>
            <div className="stat-item">
              <span>הושלמו:</span>
              <strong className="text-blue">
                {userAppointments.filter((apt) => apt.status === "completed").length}
              </strong>
            </div>
            <div className="stat-item">
              <span>בוטלו:</span>
              <strong className="text-coral">
                {userAppointments.filter((apt) => apt.status === "cancelled").length}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
