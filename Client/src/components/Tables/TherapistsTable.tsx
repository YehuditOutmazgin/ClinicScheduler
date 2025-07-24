"use client"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/store"
import { getSpecializationName } from "../../types"
import SearchBar from "../Common/SearchBar"
import { useEffect, useState } from "react"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapisrSlice"
const TherapistsTable: React.FC = () => {
  const navigate = useNavigate()
  const { therapists, loading } = useSelector((state: RootState) => state.therapists)
  const [filteredTherapists, setFilteredTherapists] = useState(therapists)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => { dispatch(fetchAllTherapistsThunk()) }, [])
  const handleTherapistClick = (therapist: any) => { navigate(`/therapist/${therapist.therapistId}`) }
  const handleSearch = (searchTerm: string, filters: Record<string, any>) => {
    let filtered = therapists
    if (searchTerm) {
      filtered = filtered.filter(
        (therapist) =>
          therapist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.therapistId.toString().includes(searchTerm),
      )
    } setFilteredTherapists(filtered)
  }
  if (loading) {
    return (
      <div className="loading">        <div className="spinner"></div>
      </div>)
  } return (<div className="container">
    <h2 style={{
      color: "var(--dark-purple)", marginBottom: "24px",
      fontSize: "28px", fontWeight: "700",
    }}
    >
      מטפלים
    </h2>
    <SearchBar onSearch={handleSearch} placeholder="חיפוש מטפלים..."
    />      <div className="card">        <table className="table">
      <thead>
        <tr>
          <th> no. </th>
          <th>מספר זהות</th>
          <th>שם</th>
          <th>התמחות</th>
          <th>טלפון</th>
          <th>משך טיפול</th>
        </tr>
      </thead>
      <tbody>
        {(filteredTherapists.length > 0 ? filteredTherapists : therapists).map((therapist) => (
          <tr key={therapist.therapistId}
            onClick={() => handleTherapistClick(therapist)}
            style={{ cursor: "pointer" }}
          >
            <td>{therapist.id}</td>
            <td>{therapist.therapistId}</td>
            <td style={{ fontWeight: "600", color: "var(--dark-purple)" }}>
              {therapist.firstName} {therapist.lastName}
            </td>
            <td>
              <span style={{ padding: "4px 8px", borderRadius: "var(--radius-sm)", background: "var(--pastel-blue)", color: "var(--dark-blue)", fontSize: "12px", fontWeight: "600", }}
              >
                {getSpecializationName(therapist.specialization)}
              </span>
            </td>
            <td>{therapist.phoneNumber}</td>

            <td>{therapist.appointmentDuration} דקות</td>
          </tr>))}
      </tbody>
    </table>
    </div>
  </div>)
}
export default TherapistsTable