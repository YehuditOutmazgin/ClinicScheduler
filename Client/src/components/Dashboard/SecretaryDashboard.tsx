import type React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { RootState } from "../../store"

const SecretaryDashboard: React.FC = () => {
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const { patients, therapists } = useSelector((state: RootState) => state.users)

  const todayAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate).toDateString() === new Date().toDateString(),
  )

  return (
    <div>
      <h1
        style={{
          color: "var(--dark-purple)",
          marginBottom: "32px",
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        לוח בקרה מזכירה
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        <div className="card">
          <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>פעולות מהירות</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link to="/schedule" className="btn btn-primary">
              ניהול לוח זמנים
            </Link>
            <Link to="/appointments" className="btn btn-secondary">
              כל התורים
            </Link>
            <Link to="/patients" className="btn btn-secondary">
              ניהול מטופלים
            </Link>
            <Link to="/therapists" className="btn btn-secondary">
              ניהול מטפלים
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>סקירה יומית</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                padding: "12px",
                background: "var(--pastel-green)",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--dark-green)" }}>
                {todayAppointments.length}
              </div>
              <div style={{ fontSize: "14px", color: "var(--dark-gray)" }}>תורים היום</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ color: "var(--dark-purple)", marginBottom: "16px" }}>סטטיסטיקות מערכת</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>סה"כ מטופלים:</span>
              <strong style={{ color: "var(--dark-blue)" }}>{patients.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>סה"כ מטפלים:</span>
              <strong style={{ color: "var(--dark-green)" }}>{therapists.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>סה"כ תורים:</span>
              <strong style={{ color: "var(--dark-purple)" }}>{appointments.length}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>מתוזמנים:</span>
              <strong style={{ color: "var(--dark-mint)" }}>
                {appointments.filter((apt) => apt.status === "scheduled").length}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecretaryDashboard
