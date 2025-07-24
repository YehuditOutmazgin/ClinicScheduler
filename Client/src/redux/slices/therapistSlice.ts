import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { therapistAPI } from "../../api/therapistAPI"
import type { Therapist } from "../../types"

export const fetchAllTherapistsThunk = createAsyncThunk("therapists/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await therapistAPI.getAll()
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const fetchTherapistByIdThunk = createAsyncThunk(
  "therapists/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await therapistAPI.getById(id)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const createTherapistThunk = createAsyncThunk(
  "therapists/create",
  async (therapist: Therapist, { rejectWithValue }) => {
    try {
      return await therapistAPI.create(therapist)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const updateTherapistThunk = createAsyncThunk(
  "therapists/update",
  async (therapist: Therapist, { rejectWithValue }) => {
    try {
      return await therapistAPI.update(therapist)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteTherapistThunk = createAsyncThunk("therapists/delete", async (id: number, { rejectWithValue }) => {
  try {
    await therapistAPI.delete(id)
    return id
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export interface TherapistState {
  therapists: Therapist[]
  loading: boolean
  error: string | null
}

const initialState: TherapistState = {
  therapists: [],
  loading: false,
  error: null,
}

const therapistSlice = createSlice({
  name: "therapists",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTherapistsThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllTherapistsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.therapists = action.payload
      })
      .addCase(fetchAllTherapistsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createTherapistThunk.fulfilled, (state, action: PayloadAction<Therapist>) => {
        state.therapists.push(action.payload)
        state.loading = false
      })
      .addCase(updateTherapistThunk.fulfilled, (state, action: PayloadAction<Therapist>) => {
        const index = state.therapists.findIndex((t) => t.therapistId === action.payload.therapistId)
        if (index !== -1) {
          state.therapists[index] = action.payload
        }
        state.loading = false
      })
      .addCase(deleteTherapistThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.therapists = state.therapists.filter((t) => t.therapistId !== action.payload)
        state.loading = false
      })
  },
})

export const { clearError } = therapistSlice.actions
export default therapistSlice.reducer
