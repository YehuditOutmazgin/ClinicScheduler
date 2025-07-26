"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
import "../../styles/Dashboard.css"

const SecretaryDashboard: React.FC = () => {
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { patients } = useSelector((state: RootState) => state.patients)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])

  const todayAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate).toDateString() === new Date().toDateString(),
  )

  return (
    <div className="secretary-dashboard">
      <h1 className="dashboard-title">לוח בקרה מזכירה</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3 className="card-title">פעולות מהירות</h3>
          <div className="quick-actions">
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

        <div className="dashboard-card">
          <h3 className="card-title">סקירה יומית</h3>
          <div className="daily-overview">
            <div className="overview-item">
              <div className="overview-number">{todayAppointments.length}</div>
              <div className="overview-label">תורים היום</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="card-title">סטטיסטיקות מערכת</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span>סה"כ מטופלים:</span>
              <strong className="text-blue">{patients.length}</strong>
            </div>
            <div className="stat-item">
              <span>סה"כ מטפלים:</span>
              <strong className="text-green">{therapists.length}</strong>
            </div>
            <div className="stat-item">
              <span>סה"כ תורים:</span>
              <strong className="text-purple">{appointments.length}</strong>
            </div>
            <div className="stat-item">
              <span>מתוזמנים:</span>
              <strong className="text-mint">{appointments.filter((apt) => apt.status === "scheduled").length}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecretaryDashboard
