"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { fetchTherapistByIdThunk, updateTherapistThunk, deleteTherapistThunk } from "../../redux/slices/therapistSlice"
import { fetchWorkHours, addWorkHours, removeWorkHours } from "../../redux/slices/workHourSlice"
import type { Therapist, WorkHour } from "../../types"
import { getSpecializationName } from "../../types"
import "../../styles/TherapistManagement.css"

interface WorkHourModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (workHour: Omit<WorkHour, "id">) => void
  workHour?: WorkHour
  therapistId: number
}

const WorkHourModal: React.FC<WorkHourModalProps> = ({ isOpen, onClose, onSave, workHour, therapistId }) => {
  const [formData, setFormData] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  })

  useEffect(() => {
    if (workHour) {
      setFormData({
        dayOfWeek: workHour.dayOfWeek,
        startTime: workHour.startTime,
        endTime: workHour.endTime,
      })
    } else {
      setFormData({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
      })
    }
  }, [workHour, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      therapistId,
      dayOfWeek: formData.dayOfWeek,
      startTime: formData.startTime,
      endTime: formData.endTime,
    })
    onClose()
  }

  if (!isOpen) return null

  const daysOfWeek = [
    { value: "Sunday", label: "ראשון" },
    { value: "Monday", label: "שני" },
    { value: "Tuesday", label: "שלישי" },
    { value: "Wednesday", label: "רביעי" },
    { value: "Thursday", label: "חמישי" },
    { value: "Friday", label: "שישי" },
    { value: "Saturday", label: "שבת" },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="work-hour-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{workHour ? "עריכת שעות עבודה" : "הוספת שעות עבודה"}</h3>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">יום בשבוע</label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
              className="form-input"
              required
            >
              <option value="">בחר יום</option>
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">שעת התחלה</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">שעת סיום</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              ביטול
            </button>
            <button type="submit" className="btn btn-primary">
              {workHour ? "עדכן" : "הוסף"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const TherapistManagement: React.FC = () => {
  const { therapistId } = useParams<{ therapistId: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [isEditing, setIsEditing] = useState(false)
  const [editedTherapist, setEditedTherapist] = useState<Therapist | null>(null)
  const [showWorkHourModal, setShowWorkHourModal] = useState(false)
  const [editingWorkHour, setEditingWorkHour] = useState<WorkHour | undefined>()

  const { therapists, loading: therapistLoading } = useSelector((state: RootState) => state.therapists)
  const { workHours, loading: workHourLoading } = useSelector((state: RootState) => state.workHours)

  const therapist = therapists.find((t) => t.therapistId === Number.parseInt(therapistId || "0"))

  useEffect(() => {
    if (therapistId) {
      const id = Number.parseInt(therapistId)
      dispatch(fetchTherapistByIdThunk(id))
      dispatch(fetchWorkHours(id))
    }
  }, [dispatch, therapistId])

  useEffect(() => {
    if (therapist) {
      setEditedTherapist(therapist)
    }
  }, [therapist])

  const handleSaveTherapist = async () => {
    if (editedTherapist) {
      await dispatch(updateTherapistThunk(editedTherapist))
      setIsEditing(false)
    }
  }

  const handleDeleteTherapist = async () => {
    if (therapistId && window.confirm("האם אתה בטוח שברצונך למחוק את המטפל?")) {
      await dispatch(deleteTherapistThunk(Number.parseInt(therapistId)))
      navigate("/therapists")
    }
  }

  const handleAddWorkHour = () => {
    setEditingWorkHour(undefined)
    setShowWorkHourModal(true)
  }

  const handleEditWorkHour = (workHour: WorkHour) => {
    setEditingWorkHour(workHour)
    setShowWorkHourModal(true)
  }

  const handleDeleteWorkHour = async (workHourId: WorkHour) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את שעות העבודה?")) {
      await dispatch(removeWorkHours({ therapistId: Number.parseInt(therapistId!), workHourId }))
    }
  }

  const handleSaveWorkHour = async (workHourData: Omit<WorkHour, "id">) => {
    if (editingWorkHour) {
      // await dispatch(
      //   // updateWorkHours({
      //   //   therapistId: Number.parseInt(therapistId!),
      //   //   workHour: { ...workHourData, id: editingWorkHour.id },
      //   // }),
      // )
    } else {
      await dispatch(addWorkHours({ therapistId: Number.parseInt(therapistId!), workHour: workHourData as WorkHour }))
    }
  }

  const getDayName = (dayOfWeek: string) => {
    const days: Record<string, string> = {
      Sunday: "ראשון",
      Monday: "שני",
      Tuesday: "שלישי",
      Wednesday: "רביעי",
      Thursday: "חמישי",
      Friday: "שישי",
      Saturday: "שבת",
    }
    return days[dayOfWeek] || dayOfWeek
  }

  if (therapistLoading || workHourLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!therapist) {
    return (
      <div className="therapist-management">
        <div className="error-message">מטפל לא נמצא</div>
      </div>
    )
  }

  return (
    <div className="therapist-management">
      <div className="therapist-header">
        <h1 className="page-title">ניהול מטפל</h1>
        <div className="therapist-actions">
          <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "ביטול" : "עריכה"}
          </button>
          <button className="btn btn-danger" onClick={handleDeleteTherapist}>
            מחיקה
          </button>
        </div>
      </div>

      <div className="therapist-info-card">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">שם פרטי</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedTherapist?.firstName || ""}
                  onChange={(e) => setEditedTherapist((prev) => (prev ? { ...prev, firstName: e.target.value } : null))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">שם משפחה</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedTherapist?.lastName || ""}
                  onChange={(e) => setEditedTherapist((prev) => (prev ? { ...prev, lastName: e.target.value } : null))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">טלפון</label>
                <input
                  type="text"
                  className="form-input"
                  value={editedTherapist?.phoneNumber || ""}
                  onChange={(e) =>
                    setEditedTherapist((prev) => (prev ? { ...prev, phoneNumber: e.target.value } : null))
                  }
                />
              </div>
              <div className="form-group">
                <label className="form-label">משך טיפול (דקות)</label>
                <input
                  type="number"
                  className="form-input"
                  value={editedTherapist?.appointmentDuration || ""}
                  onChange={(e) =>
                    setEditedTherapist((prev) =>
                      prev ? { ...prev, appointmentDuration: Number.parseInt(e.target.value) } : null,
                    )
                  }
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSaveTherapist}>
                שמירה
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                ביטול
              </button>
            </div>
          </div>
        ) : (
          <div className="therapist-info">
            <div className="therapist-name">
              {therapist.firstName} {therapist.lastName}
            </div>
            <div className="therapist-details">
              <div className="detail-item">
                <span className="detail-label">מספר זהות:</span>
                <span className="detail-value">{therapist.therapistId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">התמחות:</span>
                <span className="detail-value">{getSpecializationName(therapist.specialization)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">טלפון:</span>
                <span className="detail-value">{therapist.phoneNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">משך טיפול:</span>
                <span className="detail-value">{therapist.appointmentDuration} דקות</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="work-hours-section">
        <div className="section-header">
          <h2 className="section-title">שעות עבודה</h2>
          <button className="btn btn-primary" onClick={handleAddWorkHour}>
            הוסף שעות עבודה
          </button>
        </div>

        <div className="work-hours-card">
          {workHours.length > 0 ? (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>יום</th>
                    <th>שעת התחלה</th>
                    <th>שעת סיום</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {workHours.map((workHour) => (
                    <tr key={workHour.id}>
                      <td>{getDayName(workHour.dayOfWeek)}</td>
                      <td>{workHour.startTime}</td>
                      <td>{workHour.endTime}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-secondary btn-small" onClick={() => handleEditWorkHour(workHour)}>
                            עריכה
                          </button>
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleDeleteWorkHour(workHour)}
                          >
                            מחיקה
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">⏰</div>
              <div className="empty-title">אין שעות עבודה מוגדרות</div>
              <div className="empty-subtitle">לחץ על "הוסף שעות עבודה" כדי להוסיף שעות עבודה</div>
            </div>
          )}
        </div>
      </div>

      <WorkHourModal
        isOpen={showWorkHourModal}
        onClose={() => setShowWorkHourModal(false)}
        onSave={handleSaveWorkHour}
        workHour={editingWorkHour}
        therapistId={Number.parseInt(therapistId!)}
      />
    </div>
  )
}

export default TherapistManagement
