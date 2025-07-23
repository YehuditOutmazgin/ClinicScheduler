import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import appointmentReducer from "./slices/appointmentSlice"
import userReducer from "./slices/userSlice"
import workHourReducer from "./slices/workHourSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    users: userReducer,
    workHours: workHourReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
