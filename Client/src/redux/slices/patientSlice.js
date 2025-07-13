import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllPatients, updatePatient } from "../../api/patientFetch"

export const fetchAllPatients = createAsyncThunk("patients/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAllPatients()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const updatePatientData = createAsyncThunk(
  "patients/update",
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      return await updatePatient(id, patientData)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
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
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.loading = false
        state.patients = action.payload
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = patientSlice.actions
export default patientSlice.reducer
