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
// Retrieve user and role from local storage
const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}
const getStoredRole = () => {
  try {
    const storedRole = localStorage.getItem("role")
    return storedRole && (storedRole === 'therapist' || 
      storedRole === 'patient' || storedRole === 'secretary') ?
      storedRole : null
  } catch {
    return null
  }
}

const initialState: AuthState = {
  user:  getStoredUser(),
  role: getStoredRole(),
  isAuthenticated: getStoredRole()==null? false :true,
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
      localStorage.removeItem("user")
      localStorage.removeItem("role")
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
        localStorage.setItem("user", JSON.stringify(action.payload.data))
        localStorage.setItem("role", action.payload.role)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
