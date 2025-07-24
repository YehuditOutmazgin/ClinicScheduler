"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { AppDispatch, type RootState } from "../../redux/store"
import WeeklyCalendar from "./WeeklyCalendar"
import { getSpecializationName } from "../../types"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapisrSlice"
const ScheduleManagement: React.FC = () => {
  const [searchParams] = useSearchParams()
  const patientIdFromUrl = searchParams.get("patientId")
  const [selectedTherapist, setSelectedTherapist] = useState<number | undefined>()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { role } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => { dispatch(fetchAllTherapistsThunk()) }, [])
  const specialtyOptions = [{ value: "1", label: "ריפוי בדיבור" },
  { value: "2", label: "ריפוי בעיסוק" },
  { value: "3", label: "פיזיותרפיה" },
  { value: "4", label: "פסיכולוגיה" },
  { value: "5", label: "עבודה סוציאלית" },
  { value: "6", label: "טיפול התנהגותי" },
  { value: "7", label: "טיפול חינוכי" },]
  const filteredTherapists = selectedSpecialty
    ? therapists.filter((t) => t.specialization.toString() === selectedSpecialty) : therapists
  return (<div className="container">
    <h2 style={{ color: "var(--dark-purple)", marginBottom: "24px", fontSize: "28px", fontWeight: "700", }}
    >
      ניהול לוח זמנים
    </h2>
    {patientIdFromUrl && (<div style={{ background: "var(--pastel-mint)", padding: "12px 16px", borderRadius: "var(--radius-md)", marginBottom: "20px", color: "var(--dark-mint)", fontWeight: "600", }}
    >
      קביעת תור למטופל מספר: {patientIdFromUrl}
    </div>)}
    <div className="card">
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", alignItems: "end" }}>
        <div className="specialty-selector">
          <label>התמחות:</label>
          <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
            <option value="">כל ההתמחויות</option>
            {specialtyOptions.map((option) => (<option key={option.value} value={option.value}>

              {option.label}
            </option>))}
          </select>
        </div>
        <div className="therapist-selector">
          <label>מטפל:</label>
          <select value={selectedTherapist || ""} onChange={(e) => setSelectedTherapist(e.target.value ? Number.parseInt(e.target.value) : undefined)}            >              <option value="">בחר מטפל...</option>
            {therapists.map((therapist) => (<option key={therapist.id} value={therapist.id}>
              {therapist.firstName} {therapist.lastName} - {getSpecializationName(therapist.specialization)}
            </option>))}
          </select>
        </div>
      </div>
      {selectedTherapist && (<WeeklyCalendar selectedTherapist={selectedTherapist} selectedSpecialty={selectedSpecialty} patientId={patientIdFromUrl ? Number.parseInt(patientIdFromUrl) : undefined} />)}
      {!selectedTherapist && (<div style={{ textAlign: "center", padding: "40px", color: "var(--dark-gray)", }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>📅</div>
        <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>בחר מטפל לצפייה בלוח הזמנים</div>
        <div style={{ fontSize: "14px", opacity: 0.8 }}>ניתן לסנן לפי התמחות ולאחר מכן לבחור מטפל ספציפי</div>
      </div>

      )}
    </div>
  </div>)
}
export default ScheduleManagement