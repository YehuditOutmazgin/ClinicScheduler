"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store"
import { fetchPatientById, updatePatient, deletePatient } from "../../store/slices/userSlice"
import {
  fetchFutureAppointmentsByPatient,
  fetchPatientHistory,
  fetchCanceledAppointments,
} from "../../store/slices/appointmentSlice"
import type { Patient } from "../../types"
import { getSpecializationName } from "../../types"
import "../../styles/PatientManagement.css"

const PatientManagement: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [activeTab, setActiveTab] = useState<"future" | "past" | "canceled">("future")
  const [isEditing, setIsEditing] = useState(false)
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null)

  const { patients, loading: userLoading } = useSelector((state: RootState) => state.users)
  const {
    appointments,
    pastAppointments,
    canceledAppointments,
    loading: appointmentLoading,
  } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.users)

  const patient = patients.find((p) => p.patientId === Number.parseInt(patientId || "0"))

  useEffect(() => {
    if (patientId) {
      const id = Number.parseInt(patientId)
      dispatch(fetchPatientById(id))
      dispatch(fetchFutureAppointmentsByPatient(id))
      dispatch(fetchPatientHistory(id))
      dispatch(fetchCanceledAppointments())
    }
  }, [dispatch, patientId])

  useEffect(() => {
    if (patient) {
      setEditedPatient(patient)
    }
  }, [patient])

  const getTherapistName = (therapistId: number) => {
    const therapist = therapists.find((t) => t.therapistId === therapistId)
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : "מטפל לא ידוע"
  }

  const handleSavePatient = async () => {
    if (editedPatient && patientId) {
      await dispatch(updatePatient({ id: Number.parseInt(patientId), patient: editedPatient }))
      setIsEditing(false)
    }
  }

  const handleDeletePatient = async () => {
    if (patientId && window.confirm("האם אתה בטוח שברצונך למחוק את המטופל?")) {
      await dispatch(deletePatient(Number.parseInt(patientId)))
      navigate("/patients")
    }
  }

  const handleScheduleAppointment = () => {
    navigate(`/schedule?patientId=${patientId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("he-IL")
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("he-IL", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (userLoading || appointmentLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="container">
        <div className="error">מטופל לא נמצא</div>
      </div>
    )
  }

  return (
    <div className="container patient-management">
      <div className="patient-header">
        <h1 className="patient-title">ניהול מטופל</h1>
        <div className="patient-actions">
          <button className="btn btn-primary" onClick={handleScheduleAppointment}>
            קביעת תור
          </button>
          <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "ביטול" : "עריכה"}
          </button>
          <button className="btn btn-danger" onClick={handleDeletePatient}>
            מחיקה
          </button>
        </div>
      </div>

      <div className="patient-info-card">
        {isEditing ? (
          <div>
            <div className="patient-details">
              <div className="patient-detail">
                <label className="detail-label">שם פרטי</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedPatient?.firstName || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, firstName: e.target.value } : null))}
                />
              </div>
              <div className="patient-detail">
                <label className="detail-label">שם משפחה</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedPatient?.lastName || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, lastName: e.target.value } : null))}
                />
              </div>
              <div className="patient-detail">
                <label className="detail-label">תאריך לידה</label>
                <input
                  type="date"
                  className="form-input"
                  value={editedPatient?.birthDate || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, birthDate: e.target.value } : null))}
                />
              </div>
              <div className="patient-detail">
                <label className="detail-label">טלפון</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedPatient?.phoneNumber || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, phoneNumber: e.target.value } : null))}
                />
              </div>
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
              <button className="btn btn-primary" onClick={handleSavePatient}>
                שמירה
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                ביטול
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="patient-name">
              {patient.firstName} {patient.lastName}
            </div>
            <div className="patient-details">
              <div className="patient-detail">
                <span className="detail-label">מספר זהות:</span>
                <span className="detail-value">{patient.patientId}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">תאריך לידה:</span>
                <span className="detail-value">{formatDate(patient.birthDate)}</span>
              </div>
              <div className="patient-detail">
                <span className="detail-label">טלפון:</span>
                <span className="detail-value">{patient.phoneNumber}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="appointments-section">
        <h2 className="section-title">תורים</h2>

        <div className="appointment-tabs">
          <button
            className={`tab-button ${activeTab === "future" ? "active" : ""}`}
            onClick={() => setActiveTab("future")}
          >
            תורים עתידיים ({appointments.length})
          </button>
          <button className={`tab-button ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>
            תורים שהיו ({pastAppointments.length})
          </button>
          <button
            className={`tab-button ${activeTab === "canceled" ? "active" : ""}`}
            onClick={() => setActiveTab("canceled")}
          >
            תורים מבוטלים ({canceledAppointments.length})
          </button>
        </div>

        <div className="appointment-list">
          {activeTab === "future" && (
            <>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <div key={appointment.appointmentId} className="appointment-item">
                    <div className="appointment-header">
                      <div className="appointment-date-time">
                        {formatDate(appointment.appointmentDate)} בשעה {formatTime(appointment.appointmentDate)}
                      </div>
                      <div className="appointment-status status-scheduled">מתוזמן</div>
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-detail">
                        <strong>מטפל:</strong> {getTherapistName(appointment.therapistId)}
                      </div>
                      <div className="appointment-detail">
                        <strong>התמחות:</strong> {getSpecializationName(appointment.specialization)}
                      </div>
                      <div className="appointment-detail">
                        <strong>משך:</strong> {appointment.durationMinutes} דקות
                      </div>
                    </div>
                    <div className="appointment-actions">
                      <button className="action-button edit-button">עריכה</button>
                      <button className="action-button delete-button">ביטול</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📅</div>
                  <div className="empty-state-text">אין תורים עתידיים</div>
                  <div className="empty-state-subtext">לחץ על "קביעת תור" כדי לקבוע תור חדש</div>
                </div>
              )}
            </>
          )}

          {activeTab === "past" && (
            <>
              {pastAppointments.length > 0 ? (
                pastAppointments.map((appointment) => (
                  <div key={appointment.appointmentId} className="appointment-item">
                    <div className="appointment-header">
                      <div className="appointment-date-time">
                        {formatDate(appointment.appointmentDate)} בשעה {formatTime(appointment.appointmentDate)}
                      </div>
                      <div className="appointment-status status-completed">הושלם</div>
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-detail">
                        <strong>מטפל:</strong> {getTherapistName(appointment.therapistId)}
                      </div>
                      <div className="appointment-detail">
                        <strong>התמחות:</strong> {getSpecializationName(appointment.specialization)}
                      </div>
                      <div className="appointment-detail">
                        <strong>משך:</strong> {appointment.durationMinutes} דקות
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <div className="empty-state-text">אין תורים קודמים</div>
                  <div className="empty-state-subtext">תורים שהושלמו יופיעו כאן</div>
                </div>
              )}
            </>
          )}

          {activeTab === "canceled" && (
            <>
              {canceledAppointments.length > 0 ? (
                canceledAppointments.map((appointment) => (
                  <div key={appointment.appointmentId} className="appointment-item">
                    <div className="appointment-header">
                      <div className="appointment-date-time">
                        {formatDate(appointment.appointmentDate)} בשעה {formatTime(appointment.appointmentDate)}
                      </div>
                      <div className="appointment-status status-cancelled">מבוטל</div>
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-detail">
                        <strong>מטפל:</strong> {getTherapistName(appointment.therapistId)}
                      </div>
                      <div className="appointment-detail">
                        <strong>התמחות:</strong> {getSpecializationName(appointment.specialization)}
                      </div>
                      <div className="appointment-detail">
                        <strong>סיבת ביטול:</strong> {appointment.note || "לא צוין"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">❌</div>
                  <div className="empty-state-text">אין תורים מבוטלים</div>
                  <div className="empty-state-subtext">תורים מבוטלים יופיעו כאן</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientManagement
