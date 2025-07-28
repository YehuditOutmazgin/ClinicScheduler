import type React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Navbar from "./components/Layout/Navbar"
import LoginForm from "./components/Auth/LoginForm"
import Dashboard from "./components/Dashboard/Dashboard"
import PatientsTable from "./components/Tables/PatientsTable"
import TherapistsTable from "./components/Tables/TherapistsTable"
import AppointmentBooking from "./components/Appointments/AppointmentBooking"
import AppointmentsList from "./components/Appointments/AppointmentsList"
import ScheduleManagement from "./components/Schedule/ScheduleManagement"
import PatientManagement from "./components/Patient/PatientManagement"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import "./styles/globals.css"
import ManageReminder from "./components/Appointments/ManageReminder"
const App: React.FC = () => {
  return (<Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

          <Route path="/patients"
            element={
              <ProtectedRoute allowedRoles={["secretary", "therapist"]}>
                <PatientsTable />

              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/:patientId" element={
              <ProtectedRoute allowedRoles={["secretary"]}>
                <PatientManagement />
              </ProtectedRoute>} />
          <Route path="/therapists" element={<ProtectedRoute allowedRoles={["secretary"]}>
            <TherapistsTable />
          </ProtectedRoute>} />
          <Route path="/book-appointment" element={<ProtectedRoute allowedRoles={["patient"]}>
            <AppointmentBooking />
          </ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute allowedRoles={["therapist", "secretary"]}>
            <ScheduleManagement />
          </ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute>
            <AppointmentsList />
          </ProtectedRoute>} />

            <Route path="/manage-reminder" element={<ProtectedRoute>
            <ManageReminder />
          </ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  </Provider>)
}

export default App