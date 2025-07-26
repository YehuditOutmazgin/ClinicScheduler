import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { therapistAPI } from "../../api/therapistAPI"
import type { WorkHourState, WorkHour } from "../../types"

export const addWorkHours = createAsyncThunk(
  "workHours/add",
  async ({ therapistId, workHour }: { therapistId: number; workHour: WorkHour }, { rejectWithValue }) => {
    try {
      return await therapistAPI.addWorkHours(therapistId, workHour)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const removeWorkHours = createAsyncThunk(
  "workHours/remove",
  async ({ therapistId, workHour }: { therapistId: number; workHour: WorkHour }, { rejectWithValue }) => {
    try {
      await therapistAPI.removeWorkHours(therapistId, workHour)
      return workHour
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateSchedule = createAsyncThunk(
  "workHours/updateSchedule",
  async ({ therapistId, schedule }: { therapistId: number; schedule: WorkHour[] }, { rejectWithValue }) => {
    try {
      return await therapistAPI.updateSchedule(therapistId, schedule)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const cancelWorkDay = createAsyncThunk(
  "workHours/cancelDay",
  async ({ therapistId, date }: { therapistId: number; date: string }, { rejectWithValue }) => {
    try {
      await therapistAPI.cancelWorkDay(therapistId, date)
      return { therapistId, date }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState: WorkHourState = {
  workHours: [],
  loading: false,
  error: null,
}

const workHourSlice = createSlice({
  name: "workHours",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWorkHours.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addWorkHours.fulfilled, (state, action: PayloadAction<WorkHour>) => {
        state.loading = false
        state.workHours.push(action.payload)
      })
      .addCase(addWorkHours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(removeWorkHours.fulfilled, (state, action: PayloadAction<WorkHour>) => {
        state.workHours = state.workHours.filter(
          (wh) => !(wh.therapistId === action.payload.therapistId && wh.dayOfWeek === action.payload.dayOfWeek),
        )
      })
      .addCase(updateSchedule.fulfilled, (state, action: PayloadAction<WorkHour[]>) => {
        state.workHours = action.payload
      })
  },
})

export const { clearError } = workHourSlice.actions
export default workHourSlice.reducer
