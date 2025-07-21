import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import LoginPage from "./components/login-signin/LoginPage"
import PatientDashboard from "./components/patients/PatientDashboard"
import PatientAppointments from "./components/patients/PatientAppointments"
import PatientHistory from "./components/patients/PatientHistory"
import PatientProfile from "./components/patients/PatientProfile"
import TherapistDashboard from "./components/therapist/TherapistDashboard"
import TherapistSchedule from "./components/therapist/TherapistSchedule"
import TherapistAppointments from "./components/therapist/TherapistAppointments"
import SecretaryDashboard from "./components/secretary/SecretaryDashboard"
import SecretaryPatients from "./components/secretary/SecretaryPatients"
import SecretaryTherapists from "./components/secretary/SecretaryTherapists"
import SecretaryReminders from "./components/secretary/SecretaryReminders"
import AppointmentScheduling from "./components/appointment/AppointmentScheduling"
import ProtectedRoute from "./components/common/ProtectedRoute"
import "./styles/App.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Patient Routes */}
            <Route path="/patient" element={<ProtectedRoute />}>
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="history" element={<PatientHistory />} />
              <Route path="profile" element={<PatientProfile />} />
              <Route path="schedule" element={<AppointmentScheduling  />} />
            </Route>

            {/* Therapist Routes */}
            <Route path="/therapist" element={<ProtectedRoute  />}>
              <Route path="dashboard" element={<TherapistDashboard />} />
              <Route path="schedule" element={<TherapistSchedule />} />
              <Route path="appointments" element={<TherapistAppointments />} />
            </Route>

            {/* Secretary Routes */}
            <Route path="/secretary" element={<ProtectedRoute/>}>
              <Route path="dashboard" element={<SecretaryDashboard />} />
              <Route path="patients" element={<SecretaryPatients />} />
              <Route path="therapists" element={<SecretaryTherapists />} />
              <Route path="reminders" element={<SecretaryReminders />} />
              <Route path="schedule" element={<AppointmentScheduling/>} />
            </Route>

            
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
