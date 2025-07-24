import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import appointmentReducer from "./slices/appointmentSlice"
import workHourReducer from "./slices/workHourSlice"
import patientReducer from "./slices/patientSlice"
import therapistReducer from "./slices/therapistSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    workHours: workHourReducer,
    patients: patientReducer,
    therapists: therapistReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
