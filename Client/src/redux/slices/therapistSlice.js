import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllTherapists } from "../../api/therapistFetch"

export const fetchAllTherapists = createAsyncThunk("therapists/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAllTherapists()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const therapistSlice = createSlice({
  name: "therapists",
  initialState: {
    therapists: [],
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
      .addCase(fetchAllTherapists.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllTherapists.fulfilled, (state, action) => {
        state.loading = false
        state.therapists = action.payload.$values;
      })
      .addCase(fetchAllTherapists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = therapistSlice.actions
export default therapistSlice.reducer
