"use client"
import type React from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import PatientDashboard from "./PatientDashboard"
import TherapistDashboard from "./TherapistDashboard"
import SecretaryDashboard from "./SecretaryDashboard"
import "../../styles/globals.css"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapisrSlice"
const Dashboard: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])
  const renderDashboard = () => {
    switch (role) {
      case "patient":
        return <PatientDashboard />
      case "therapist":
        return <TherapistDashboard />
      case "secretary":
        return <SecretaryDashboard />
      default:
        return <div>Invalid role</div>
    }
  }
  return <div className="container">{renderDashboard()}</div>
}
export default Dashboard