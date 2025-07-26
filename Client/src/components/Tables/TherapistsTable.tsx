"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/store"
import { getSpecializationName } from "../../types"
import SearchBar from "../Common/SearchBar"
import { useEffect, useState } from "react"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
import "../../styles/Tables.css"

const TherapistsTable: React.FC = () => {
  const navigate = useNavigate()
  const { therapists, loading } = useSelector((state: RootState) => state.therapists)
  const [filteredTherapists, setFilteredTherapists] = useState(therapists)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])

  const handleTherapistClick = (therapist: any) => {
    navigate(`/therapist/${therapist.therapistId}`)
  }

  const handleSearch = (searchTerm: string, filters: Record<string, any>) => {
    let filtered = therapists

    if (searchTerm) {
      filtered = filtered.filter(
        (therapist) =>
          therapist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          therapist.therapistId.toString().includes(searchTerm),
      )
    }

    setFilteredTherapists(filtered)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="therapists-table">
      <h2 className="page-title">מטפלים</h2>

      <SearchBar onSearch={handleSearch} placeholder="חיפוש מטפלים..." />

      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>מס' רישוי</th>
                <th>מספר זהות</th>
                <th>שם</th>
                <th>התמחות</th>
                <th>טלפון</th>
                <th>משך טיפול</th>
              </tr>
            </thead>
            <tbody>
              {(filteredTherapists.length > 0 ? filteredTherapists : therapists).map((therapist) => (
                <tr
                  key={therapist.therapistId}
                  onClick={() => handleTherapistClick(therapist)}
                  className="clickable-row"
                >
                  <td>{therapist.id}</td>
                  <td>{therapist.therapistId}</td>
                  <td className="name-cell">
                    {therapist.firstName} {therapist.lastName}
                  </td>
                  <td>
                    <span className="specialty-badge">{getSpecializationName(therapist.specialization)}</span>
                  </td>
                  <td>{therapist.phoneNumber}</td>
                  <td>{therapist.appointmentDuration} דקות</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TherapistsTable
