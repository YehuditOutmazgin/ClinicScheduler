"use client"

import type React from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../redux/store"
import { deleteAppointment } from "../../redux/slices/appointmentSlice"
import { getUserId } from "../../types"
import { useEffect } from "react"
import { fetchPatientsThunk } from "../../redux/slices/patientSlice"
import { fetchAllTherapistsThunk } from "../../redux/slices/therapistSlice"
import "../../styles/AppointmentsList.css"

const AppointmentsList: React.FC = () => {
  const { user, role } = useSelector((state: RootState) => state.auth)
  const { appointments, loading } = useSelector((state: RootState) => state.appointments)
  const { therapists } = useSelector((state: RootState) => state.therapists)
  const { patients } = useSelector((state: RootState) => state.patients)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPatientsThunk())
    dispatch(fetchAllTherapistsThunk())
  }, [dispatch])

  const getUserAppointments = () => {
    const userId = getUserId(user)
    switch (role) {
      case "patient":
        return appointments.filter((apt) => apt.patient?.patientId === userId)
      case "therapist":
        return appointments.filter((apt) => apt.therapistId === userId)
      case "secretary":
        return appointments
      default:
        return []
    }
  }

  const getPatientName = (patientId: number) => {
    const patient = patients.find((p) => p.patientId === patientId)
    return patient ? `${patient.firstName} ${patient.lastName}` : "מטופל לא ידוע"
  }

  const getTherapistName = (therapistId: number) => {
    const therapist = therapists.find((t) => t.therapistId === therapistId)
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : "מטפל לא ידוע"
  }

  const handleCancelAppointment = async (appointmentId: number) => {
    if (window.confirm("האם אתה בטוח שברצונך לבטל את התור?")) {
      const userId = getUserId(user)
      await dispatch(deleteAppointment({ appointmentId, patientId: userId }))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "status-scheduled"
      case "completed":
        return "status-completed"
      case "cancelled":
        return "status-cancelled"
      default:
        return "status-default"
    }
  }

  const userAppointments = getUserAppointments()
  const futureAppointments = userAppointments.filter(
    (apt) => new Date(apt.appointmentDate) >= new Date() && apt.status === "scheduled",
  )

  return (
    <div className="appointments-list">
      <h2 className="page-title">{role === "secretary" ? "כל התורים" : "התורים שלי"}</h2>

      <div className="appointments-card">
        <h3 className="section-title">תורים עתידיים ({futureAppointments.length})</h3>
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>תאריך</th>
                <th>שעה</th>
                {role !== "patient" && <th>מטופל</th>}
                {role !== "therapist" && <th>מטפל</th>}
                <th>משך</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {futureAppointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td className="appointment-date">
                    {new Date(appointment.appointmentDate).toLocaleDateString("he-IL")}
                  </td>
                  <td>
                    {new Date(appointment.appointmentDate).toLocaleTimeString("he-IL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  {role !== "patient" && (
                    <td>{appointment.patient ? getPatientName(appointment.patient.patientId) : "לא ידוע"}</td>
                  )}
                  {role !== "therapist" && <td>{getTherapistName(appointment.therapistId)}</td>}
                  <td>{appointment.durationMinutes} דק'</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(appointment.status || "")}`}>
                      {appointment.status || "מתוזמן"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancelAppointment(appointment.appointmentId)}
                      className="btn btn-danger btn-small"
                    >
                      ביטול
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {futureAppointments.length === 0 && <p className="no-data">אין תורים עתידיים</p>}
        </div>
      </div>
    </div>
  )
}

export default AppointmentsList
