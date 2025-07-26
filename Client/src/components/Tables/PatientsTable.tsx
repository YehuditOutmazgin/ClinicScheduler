"use client"

import type React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../../redux/store"
import SearchBar from "../Common/SearchBar"
import { useEffect, useState } from "react"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import "../../styles/Tables.css"

const PatientsTable: React.FC = () => {
  const { patients, loading } = useSelector((state: RootState) => state.patients)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [filteredPatients, setFilteredPatients] = useState(patients)

  useEffect(() => {
    dispatch(fetchPatientsThunk())
  }, [dispatch])

  const handlePatientClick = (patient: any) => {
    navigate(`/patient/${patient.patientId}`)
  }

  const handleSearch = (searchTerm: string, filters: Record<string, any>) => {
    let filtered = patients

    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.patientId.toString().includes(searchTerm),
      )
    }

    setFilteredPatients(filtered)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="patients-table">
      <h2 className="page-title">מטופלים</h2>

      <SearchBar onSearch={handleSearch} placeholder="חיפוש מטופלים..." />

      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>מספר זהות</th>
                <th>שם</th>
                <th>טלפון</th>
                <th>תאריך לידה</th>
              </tr>
            </thead>
            <tbody>
              {(filteredPatients.length > 0 ? filteredPatients : patients).map((patient) => (
                <tr key={patient.patientId} onClick={() => handlePatientClick(patient)} className="clickable-row">
                  <td>{patient.patientId}</td>
                  <td className="name-cell">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td>{patient.phoneNumber}</td>
                  <td>{new Date(patient.birthDate).toLocaleDateString("he-IL")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PatientsTable
