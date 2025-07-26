import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Patient } from "../../types"
import { patientAPI } from "../../api/patientAPI"

export interface PatientState {
  patients: Patient[]
  loading: boolean
  error: string | null
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
}

export const fetchPatientsThunk = createAsyncThunk("patients/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await patientAPI.getAll()
    return response
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const createPatientThunk = createAsyncThunk(
  "users/createPatient",
  async (patient: Omit<Patient, "patientId">, { rejectWithValue }) => {
    try {
      return await patientAPI.create(patient)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const updatePatientThunk = createAsyncThunk(
  "users/updatePatient",
  async ({ id, patient }: { id: number; patient: Patient }, { rejectWithValue }) => {
    try {
      return await patientAPI.update(id, patient)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const deletePatientThunk = createAsyncThunk("users/deletePatient", async (id: number, { rejectWithValue }) => {
  try {
    await patientAPI.delete(id)
    return id
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearPatient: (state) => {
      state.patients = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatientsThunk.fulfilled, (state, action) => {
        state.patients = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(fetchPatientsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = JSON.stringify(action.error)
      })
      .addCase(createPatientThunk.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.patients.push(action.payload)
      })
      // Update patient
      .addCase(updatePatientThunk.fulfilled, (state, action: PayloadAction<Patient>) => {
        const index = state.patients.findIndex((p) => p.patientId === action.payload.patientId)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
      })
      // Delete patient
      .addCase(deletePatientThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.patients = state.patients.filter((p) => p.patientId !== action.payload)
      })
  },
})

export const { clearPatient, clearError } = patientSlice.actions
export default patientSlice.reducer
