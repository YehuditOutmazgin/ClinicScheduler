// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import {
//   getFutureAppointments,
//   getAppointmentHistory,
//   getAvailableAppointments,
//   scheduleAppointment as scheduleAppointmentAPI,
// } from "../../api/appointmentFetch"

// export const fetchFutureAppointments = createAsyncThunk(
//   "appointments/fetchFuture",
//   async (patientId, { rejectWithValue }) => {
//     try {
//       return await getFutureAppointments(patientId)
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const fetchAppointmentHistory = createAsyncThunk(
//   "appointments/fetchHistory",
//   async (patientId, { rejectWithValue }) => {
//     try {
//       return await getAppointmentHistory(patientId)
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const fetchAvailableAppointments = createAsyncThunk(
//   "appointments/fetchAvailable",
//   async ({ therapistId, specialty, weekDate }, { rejectWithValue }) => {
//     try {
//       const response = await getAvailableAppointments(therapistId, specialty, weekDate)
//       alert("slice: " + JSON.stringify(response, null, 2))
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const scheduleAppointment = createAsyncThunk(
//   "appointments/schedule",
//   async ({ patientId, appointmentId }, { rejectWithValue }) => {
//     try {
//       return await scheduleAppointmentAPI(patientId, appointmentId)
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// const appointmentSlice = createSlice({
//   name: "appointments",
//   initialState: {
//     futureAppointments: [],
//     pastAppointments: [],
//     availableAppointments: [],
//     therapistAppointments: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearError: (state) => {
//       state.error = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFutureAppointments.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(fetchFutureAppointments.fulfilled, (state, action) => {
//         state.loading = false
//         state.futureAppointments = action.payload.$values;
//       })
//       .addCase(fetchFutureAppointments.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload.$values;
//       })
//       .addCase(fetchAppointmentHistory.fulfilled, (state, action) => {
//         state.pastAppointments = action.payload.$values;
//       })
//       .addCase(fetchAvailableAppointments.fulfilled, (state, action) => {
//         state.availableAppointments = action.payload.$values;
//         // alert(state.availableAppointments)
//         // alert(action.payload)

//       })
//   },
// })

// export const { clearError } = appointmentSlice.actions
// export default appointmentSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFutureAppointments,
  getAppointmentHistory,
  scheduleAppointment as scheduleAppointmentAPI,
  getAvailableAppointments,
} from "../../api/appointmentFetch";

// Existing Thunks
export const fetchFutureAppointments = createAsyncThunk(
  "appointments/fetchFuture",
  async (patientId, { rejectWithValue }) => {
    try {
      return await getFutureAppointments(patientId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAppointmentHistory = createAsyncThunk(
  "appointments/fetchHistory",
  async (patientId, { rejectWithValue }) => {
    try {
      return await getAppointmentHistory(patientId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Modified fetchAvailableAppointments to match old structure
export const fetchAvailableAppointments = createAsyncThunk(
  "appointments/fetchAvailable",
  async ({ therapistId, weekDate }, { rejectWithValue }) => {
    try {
      const response = await getAvailableAppointments(therapistId, weekDate);
      alert(JSON.stringify(response))
      return response; // Return the response directly
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const scheduleAppointment = createAsyncThunk(
  "appointments/schedule",
  async ({ patientId, appointmentId }, { rejectWithValue }) => {
    try {
      return await scheduleAppointmentAPI(patientId, appointmentId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    futureAppointments: [],
    pastAppointments: [],
    availableAppointments: [],
    loading: false,
    error: null,
    selectedAppointment: null, // Added selectedAppointment in the new slice
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFutureAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFutureAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.futureAppointments = action.payload.$values;
      })
      .addCase(fetchFutureAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.$values;
      })
      .addCase(fetchAppointmentHistory.fulfilled, (state, action) => {
        state.pastAppointments = action.payload.$values;
      })
      .addCase(fetchAvailableAppointments.pending, (state) => {
        state.loading = true; // Set loading true while fetching available appointments
      })
      .addCase(fetchAvailableAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.availableAppointments = action.payload; // Keep the structure similar to the old slice
      })
      .addCase(fetchAvailableAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error for fetching available appointments
      });
  },
});

export const { clearError, setSelectedAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;