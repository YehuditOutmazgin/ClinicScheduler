import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { therapistAPI } from "../../api/therapistAPI"
import type { WorkHourState, WorkHour } from "../../types"

export const fetchWorkHours = createAsyncThunk("workHours/fetch", async (therapistId: number, { rejectWithValue }) => {
  try {
    const work: WorkHour = {
      id: 1,
      therapistId: 2,
      startTime: "10:00",
      endTime: "12:00",
      dayOfWeek: "sunday",
    }

    const works: WorkHour[] = [work]
    // return await therapistAPI.getWorkHours(therapistId)
    return works;
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

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

export const updateWorkHours = createAsyncThunk(
  "workHours/update",
  async ({ therapistId, workHour }: { therapistId: number; workHour: WorkHour }, { rejectWithValue }) => {
    try {
      await therapistAPI.removeWorkHours(therapistId, workHour)
      return await therapistAPI.addWorkHours(therapistId, workHour)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const removeWorkHours = createAsyncThunk(
  "workHours/remove",
  async ({ therapistId, workHour: workHourId }: { therapistId: number; workHour: WorkHour }, { rejectWithValue }) => {
    try {
      await therapistAPI.removeWorkHours(therapistId, workHourId)
      return workHourId
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
      .addCase(fetchWorkHours.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWorkHours.fulfilled, (state, action: PayloadAction<WorkHour[]>) => {
        state.loading = false
        state.workHours = action.payload
      })
      .addCase(fetchWorkHours.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(addWorkHours.fulfilled, (state, action: PayloadAction<WorkHour>) => {
        state.workHours.push(action.payload)
      })
      .addCase(updateWorkHours.fulfilled, (state, action: PayloadAction<WorkHour>) => {
        const index = state.workHours.findIndex((wh) => wh.id === action.payload.id)
        if (index !== -1) {
          state.workHours[index] = action.payload
        }
      })
      .addCase(removeWorkHours.fulfilled, (state, action: PayloadAction<WorkHour>) => {
        state.workHours = state.workHours.filter((wh) => wh.id !== action.payload.id)
      })
  },
})

export const { clearError } = workHourSlice.actions
export default workHourSlice.reducer
