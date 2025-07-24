import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../../api/authAPI"
import type { AuthState, LoginResponse } from "../../types"

export const login = createAsyncThunk(
  "auth/login",
  async ({ id, password }: { id: number; password: number }, { rejectWithValue }) => {
    try {
      return await authAPI.login(id, password)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const initialState: AuthState = {
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.role = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false
        state.user = action.payload.data
        state.role = action.payload.role
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
