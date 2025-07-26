"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/store"
import WeeklyCalendar from "./WeeklyCalendar"
import { getSpecializationName } from "../../types"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
import "../../styles/ScheduleManagement.css"

const ScheduleManagement: React.FC = () => {
  const [searchParams] = useSearchParams()
  const patientIdFromUrl = searchParams.get("patientId")

  const [selectedTherapist, setSelectedTherapist] = useState<number | undefined>()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")

  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { role } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])

  const specialtyOptions = [
    { value: "1", label: "ריפוי בדיבור" },
    { value: "2", label: "ריפוי בעיסוק" },
    { value: "3", label: "פיזיותרפיה" },
    { value: "4", label: "פסיכולוגיה" },
    { value: "5", label: "עבודה סוציאלית" },
    { value: "6", label: "טיפול התנהגותי" },
    { value: "7", label: "טיפול חינוכי" },
  ]

  const filteredTherapists = selectedSpecialty
    ? therapists.filter((t) => t.specialization.toString() === selectedSpecialty)
    : therapists

  return (
    <div className="schedule-management">
      <h2 className="page-title">ניהול לוח זמנים</h2>

      {patientIdFromUrl && <div className="patient-notice">קביעת תור למטופל מספר: {patientIdFromUrl}</div>}

      <div className="schedule-card">
        <div className="schedule-filters">
          <div className="filter-group">
            <label className="filter-label">התמחות:</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="form-input"
            >
              <option value="">כל ההתמחויות</option>
              {specialtyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">מטפל:</label>
            <select
              value={selectedTherapist || ""}
              onChange={(e) => setSelectedTherapist(e.target.value ? Number.parseInt(e.target.value) : undefined)}
              className="form-input"
            >
              <option value="">בחר מטפל...</option>
              {therapists.map((therapist) => (
                <option key={therapist.id} value={therapist.id}>
                  {therapist.firstName} {therapist.lastName} - {getSpecializationName(therapist.specialization)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedTherapist && (
          <WeeklyCalendar
            selectedTherapist={selectedTherapist}
            selectedSpecialty={selectedSpecialty}
            patientId={patientIdFromUrl ? Number.parseInt(patientIdFromUrl) : undefined}
          />
        )}

        {!selectedTherapist && (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <div className="empty-title">בחר מטפל לצפייה בלוח הזמנים</div>
            <div className="empty-subtitle">ניתן לסנן לפי התמחות ולאחר מכן לבחור מטפל ספציפי</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScheduleManagement
