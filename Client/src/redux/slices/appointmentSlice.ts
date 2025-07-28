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
      const res = await appointmentAPI.getFutureByPatientId(patientId)
      console.log(res)
      return res
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

export const confirmCanceledAppointments = createAsyncThunk(
  "appointments/confirmCanceledAppointments",
  async ({ appointmentId, patientId }: { appointmentId: number; patientId: number }, { rejectWithValue }) => {
    try {
      return await appointmentAPI.confirmCanceledAppointments(appointmentId, patientId)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchNextBusinessDayAppointments = createAsyncThunk(
  "appointments/fetchNextBusinessDay",
  async (_, { rejectWithValue }) => {
    try {
      return await appointmentAPI.getNextBusinessDay()
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
      .addCase(fetchAppointmentsByTherapistAndDate.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAppointmentsByTherapistAndDate.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false
        state.appointments = action.payload
      })
      .addCase(fetchAppointmentsByTherapistAndDate.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch therapist week appointments
      .addCase(fetchTherapistWeekAppointments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTherapistWeekAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false
        state.appointments = action.payload
      })
      .addCase(fetchTherapistWeekAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch available appointments for therapist week
      .addCase(fetchAvailableAppointmentsForTherapistWeek.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAvailableAppointmentsForTherapistWeek.fulfilled,
        (state, action: PayloadAction<AvailableAppointment[]>) => {
          state.loading = false
          state.availableAppointments = action.payload
        },
      )
      .addCase(fetchAvailableAppointmentsForTherapistWeek.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch available appointments for specialty week
      .addCase(fetchAvailableAppointmentsForSpecialtyWeek.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAvailableAppointmentsForSpecialtyWeek.fulfilled,
        (state, action: PayloadAction<AvailableAppointment[]>) => {
          state.loading = false
          state.availableAppointments = action.payload
        },
      )
      .addCase(fetchAvailableAppointmentsForSpecialtyWeek.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch patient history
      .addCase(fetchPatientHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatientHistory.fulfilled, (state, action: PayloadAction<PastAppointment[]>) => {
        state.loading = false
        state.pastAppointments = action.payload
      })
      .addCase(fetchPatientHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch canceled appointments
      .addCase(fetchCanceledAppointments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCanceledAppointments.fulfilled, (state, action: PayloadAction<CanceledAppointment[]>) => {
        state.loading = false
        state.canceledAppointments = action.payload
      })
      .addCase(fetchCanceledAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Fetch next business day appointments
      .addCase(fetchNextBusinessDayAppointments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNextBusinessDayAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false
        state.appointments = action.payload
      })
      .addCase(fetchNextBusinessDayAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Schedule appointment
      .addCase(scheduleAppointment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(scheduleAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loading = false
        // Remove from available appointments and add to scheduled
        state.availableAppointments = state.availableAppointments.filter(
          (apt) => apt.appointmentId !== action.payload.appointmentId,
        )
        state.appointments.push(action.payload)
      })
      .addCase(scheduleAppointment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Delete appointment
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false
        // Remove from appointments
        state.appointments = state.appointments.filter((apt) => apt.appointmentId !== action.payload)
        // Remove from canceled appointments if exists
        state.canceledAppointments = state.canceledAppointments.filter((apt) => apt.appointmentId !== action.payload)
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Confirm appointment
      .addCase(confirmAppointment.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(confirmAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.loading = false
        // Update appointment in the list
        const index = state.appointments.findIndex((apt) => apt.appointmentId === action.payload.appointmentId)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
        // Remove from appointments list (since it's confirmed)
        state.appointments = state.appointments.filter((apt) => apt.appointmentId !== action.payload.appointmentId)
      })
      .addCase(confirmAppointment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Confirm canceled appointments
      .addCase(confirmCanceledAppointments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(confirmCanceledAppointments.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        // Remove from canceled appointments list
        if (action.payload && action.payload.appointmentId) {
          state.canceledAppointments = state.canceledAppointments.filter(
            (apt) => apt.appointmentId !== action.payload.appointmentId,
          )
        }
      })
      .addCase(confirmCanceledAppointments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearAppointments } = appointmentSlice.actions
export default appointmentSlice.reducer
