"use client"

import type React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../store"
import SearchBar from "../Common/SearchBar"
import { useState } from "react"

const PatientsTable: React.FC = () => {
  const { patients, loading } = useSelector((state: RootState) => state.users)
  const navigate = useNavigate()
  const [filteredPatients, setFilteredPatients] = useState(patients)

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
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2
        style={{
          color: "var(--dark-purple)",
          marginBottom: "24px",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        מטופלים
      </h2>

      <SearchBar
        onSearch={handleSearch}
        placeholder="חיפוש מטופלים..."
        filters={[
          {
            key: "birthDate",
            label: "תאריך לידה",
            type: "date",
          },
        ]}
      />

      <div className="card">
        <table className="table">
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
              <tr key={patient.patientId} onClick={() => handlePatientClick(patient)} style={{ cursor: "pointer" }}>
                <td>{patient.patientId}</td>
                <td style={{ fontWeight: "600", color: "var(--dark-purple)" }}>
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
  )
}

export default PatientsTable
