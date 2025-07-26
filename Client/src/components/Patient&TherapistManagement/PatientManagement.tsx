"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import {
  fetchFutureAppointmentsByPatient,
  fetchPatientHistory,
  fetchCanceledAppointments,
} from "../../redux/slices/appointmentSlice"
import type { Patient } from "../../types"
import { getSpecializationName } from "../../types"
import { deletePatientThunk, fetchPatientsThunk, updatePatientThunk } from "../../redux/slices/patientSlice"
import "../../styles/PatientManagement.css"

const PatientManagement: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [activeTab, setActiveTab] = useState<"future" | "past" | "canceled">("future")
  const [isEditing, setIsEditing] = useState(false)
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null)

  const { patients, loading: userLoading } = useSelector((state: RootState) => state.patients)
  const {
    appointments,
    pastAppointments,
    canceledAppointments,
    loading: appointmentLoading,
  } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.therapists)

  const patient = patients.find((p) => p.patientId === Number.parseInt(patientId || "0"))

  useEffect(() => {
    if (patientId) {
      const id = Number.parseInt(patientId)
      dispatch(fetchPatientsThunk())
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
      await dispatch(updatePatientThunk({ id: Number.parseInt(patientId), patient: editedPatient }))
      setIsEditing(false)
    }
  }

  const handleDeletePatient = async () => {
    if (patientId && window.confirm("האם אתה בטוח שברצונך למחוק את המטופל?")) {
      await dispatch(deletePatientThunk(Number.parseInt(patientId)))
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
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="patient-management">
        <div className="error-message">מטופל לא נמצא</div>
      </div>
    )
  }

  return (
    <div className="patient-management">
      <div className="patient-header">
        <h1 className="page-title">ניהול מטופל</h1>
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
          <div className="edit-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">שם פרטי</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedPatient?.firstName || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, firstName: e.target.value } : null))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">שם משפחה</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedPatient?.lastName || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, lastName: e.target.value } : null))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">תאריך לידה</label>
                <input
                  type="date"
                  className="form-input"
                  value={editedPatient?.birthDate || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, birthDate: e.target.value } : null))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">טלפון</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedPatient?.phoneNumber || ""}
                  onChange={(e) => setEditedPatient((prev) => (prev ? { ...prev, phoneNumber: e.target.value } : null))}
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSavePatient}>
                שמירה
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                ביטול
              </button>
            </div>
          </div>
        ) : (
          <div className="patient-info">
            <div className="patient-name">
              {patient.firstName} {patient.lastName}
            </div>
            <div className="patient-details">
              <div className="detail-item">
                <span className="detail-label">מספר זהות:</span>
                <span className="detail-value">{patient.patientId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">תאריך לידה:</span>
                <span className="detail-value">{formatDate(patient.birthDate)}</span>
              </div>
              <div className="detail-item">
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
                  <div className="empty-icon">📅</div>
                  <div className="empty-title">אין תורים עתידיים</div>
                  <div className="empty-subtitle">לחץ על "קביעת תור" כדי לקבוע תור חדש</div>
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
                  <div className="empty-icon">📋</div>
                  <div className="empty-title">אין תורים קודמים</div>
                  <div className="empty-subtitle">תורים שהושלמו יופיעו כאן</div>
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
                  <div className="empty-icon">❌</div>
                  <div className="empty-title">אין תורים מבוטלים</div>
                  <div className="empty-subtitle">תורים מבוטלים יופיעו כאן</div>
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
