import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getFutureAppointments,
  getAppointmentHistory,
  getAvailableAppointments,
  scheduleAppointment as scheduleAppointmentAPI,
} from "../../api/appointmentFetch"

export const fetchFutureAppointments = createAsyncThunk(
  "appointments/fetchFuture",
  async (patientId, { rejectWithValue }) => {
    try {
      return await getFutureAppointments(patientId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchAppointmentHistory = createAsyncThunk(
  "appointments/fetchHistory",
  async (patientId, { rejectWithValue }) => {
    try {
      return await getAppointmentHistory(patientId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchAvailableAppointments = createAsyncThunk(
  "appointments/fetchAvailable",
  async ({ therapistId, specialty, weekDate }, { rejectWithValue }) => {
    try {
      return await getAvailableAppointments(therapistId, specialty, weekDate)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const scheduleAppointment = createAsyncThunk(
  "appointments/schedule",
  async ({ patientId, appointmentId }, { rejectWithValue }) => {
    try {
      return await scheduleAppointmentAPI(patientId, appointmentId)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    futureAppointments: [],
    pastAppointments: [],
    availableAppointments: [],
    therapistAppointments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFutureAppointments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchFutureAppointments.fulfilled, (state, action) => {
        state.loading = false
        state.futureAppointments = action.payload.$values;
      })
      .addCase(fetchFutureAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.$values;
      })
      .addCase(fetchAppointmentHistory.fulfilled, (state, action) => {
        state.pastAppointments = action.payload.$values;
      })
      .addCase(fetchAvailableAppointments.fulfilled, (state, action) => {
        state.availableAppointments = action.payload.$values;
      })
  },
})

export const { clearError } = appointmentSlice.actions
export default appointmentSlice.reducer
