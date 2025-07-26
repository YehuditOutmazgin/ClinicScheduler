import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { appointmentAPI } from "../../api/appointmentAPI"
import type {
  AppointmentState,
  Appointment,
  AvailableAppointment,
  PastAppointment,
  CanceledAppointment,
} from "../../types"

export const fetchFutureAppointmentsByPatient = createAsyncThunk(
  "appointments/fetchFutureByPatient",
  async (patientId: number, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getFutureByPatientId(patientId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchAppointmentsByTherapistAndDate = createAsyncThunk(
  "appointments/fetchByTherapistAndDate",
  async ({ therapistId, date }: { therapistId: number; date: string }, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getByTherapistAndDate(therapistId, date)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchTherapistWeekAppointments = createAsyncThunk(
  "appointments/fetchTherapistWeek",
  async ({ therapistId, date }: { therapistId: number; date: string }, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getTherapistWeek(therapistId, date)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchAvailableAppointmentsForTherapistWeek = createAsyncThunk(
  "appointments/fetchAvailableForTherapistWeek",
  async ({ therapistId, weekDate }: { therapistId: number; weekDate: string }, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getAvailableForTherapistWeek(therapistId, weekDate)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchAvailableAppointmentsForSpecialtyWeek = createAsyncThunk(
  "appointments/fetchAvailableForSpecialtyWeek",
  async ({ specialty, weekDate }: { specialty: string; weekDate: string }, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getAvailableForSpecialtyWeek(specialty, weekDate)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchPatientHistory = createAsyncThunk(
  "appointments/fetchPatientHistory",
  async (patientId: number, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getPatientHistory(patientId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchCanceledAppointments = createAsyncThunk(
  "appointments/fetchCanceled",
  async (_, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getAllCanceled()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const scheduleAppointment = createAsyncThunk(
  "appointments/schedule",
  async ({ patientId, appointmentId }: { patientId: number; appointmentId: number }, { rejectWithValue }) => {
    try {
      return await appointmentAPI.scheduleAppointment(patientId, appointmentId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async ({ appointmentId, patientId }: { appointmentId: number; patientId: number }, { rejectWithValue }) => {
    try {
      await appointmentAPI.deleteAppointment(appointmentId, patientId)
      return appointmentId
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const confirmAppointment = createAsyncThunk(
  "appointments/confirm",
  async (appointmentId: number, { rejectWithValue }) => {
    try {
      return await appointmentAPI.confirmAppointment(appointmentId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState: AppointmentState = {
  appointments: [],
  availableAppointments: [],
  pastAppointments: [],
  canceledAppointments: [],
  loading: false,
  error: null,
}

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAppointments: (state) => {
      state.appointments = []
      state.availableAppointments = []
      state.pastAppointments = []
      state.canceledAppointments = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch future appointments by patient
      .addCase(fetchFutureAppointmentsByPatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFutureAppointmentsByPatient.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false
        state.appointments = action.payload
      })
      .addCase(fetchFutureAppointmentsByPatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch appointments by therapist and date
      .addCase(fetchAppointmentsByTherapistAndDate.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.appointments = action.payload
      })
      // Fetch therapist week appointments
      .addCase(fetchTherapistWeekAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.appointments = action.payload
      })
      // Fetch available appointments for therapist week
      .addCase(
        fetchAvailableAppointmentsForTherapistWeek.fulfilled,
        (state, action: PayloadAction<AvailableAppointment[]>) => {
          state.availableAppointments = action.payload
        },
      )
      // Fetch available appointments for specialty week
      .addCase(
        fetchAvailableAppointmentsForSpecialtyWeek.fulfilled,
        (state, action: PayloadAction<AvailableAppointment[]>) => {
          state.availableAppointments = action.payload
        },
      )
      // Fetch patient history
      .addCase(fetchPatientHistory.fulfilled, (state, action: PayloadAction<PastAppointment[]>) => {
        state.pastAppointments = action.payload
      })
      // Fetch canceled appointments
      .addCase(fetchCanceledAppointments.fulfilled, (state, action: PayloadAction<CanceledAppointment[]>) => {
        state.canceledAppointments = action.payload
      })
      // Schedule appointment
      .addCase(scheduleAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        // Remove from available appointments and add to scheduled
        state.availableAppointments = state.availableAppointments.filter(
          (apt) => apt.appointmentId !== action.payload.appointmentId,
        )
        state.appointments.push(action.payload)
      })
      // Delete appointment
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<number>) => {
        state.appointments = state.appointments.filter((apt) => apt.appointmentId !== action.payload)
      })
      // Confirm appointment
      .addCase(confirmAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        const index = state.appointments.findIndex((apt) => apt.appointmentId === action.payload.appointmentId)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
      })
  },
})

export const { clearError, clearAppointments } = appointmentSlice.actions
export default appointmentSlice.reducer
