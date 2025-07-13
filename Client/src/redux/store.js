import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import appointmentSlice from "./slices/appointmentSlice"
import patientSlice from "./slices/patientSlice"
import therapistSlice from "./slices/therapistSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    appointments: appointmentSlice,
    patients: patientSlice,
    therapists: therapistSlice,
  },
})
