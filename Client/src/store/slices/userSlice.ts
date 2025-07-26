// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
// import { patientAPI } from "../../api/patientAPI"
// import { therapistAPI } from "../../api/therapistAPI"
// import type { UserState, Patient, Therapist } from "../../types"

// export const fetchPatients = createAsyncThunk("users/fetchPatients", async (_, { rejectWithValue }) => {
//   try {
//     return await patientAPI.getAll()
//   } catch (error: any) {
//     return rejectWithValue(error.message)
//   }
// })

// export const fetchTherapists = createAsyncThunk("users/fetchTherapists", async (_, { rejectWithValue }) => {
//   try {
//     return await therapistAPI.getAll()
//   } catch (error: any) {
//     return rejectWithValue(error.message)
//   }
// })

// export const fetchPatientById = createAsyncThunk("users/fetchPatientById", async (id: number, { rejectWithValue }) => {
//   try {
//     return await patientAPI.getById(id)
//   } catch (error: any) {
//     return rejectWithValue(error.message)
//   }
// })

// export const fetchTherapistById = createAsyncThunk(
//   "users/fetchTherapistById",
//   async (id: number, { rejectWithValue }) => {
//     try {
//       return await therapistAPI.getById(id)
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const createPatient = createAsyncThunk(
//   "users/createPatient",
//   async (patient: Omit<Patient, "patientId">, { rejectWithValue }) => {
//     try {
//       return await patientAPI.create(patient)
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const updatePatient = createAsyncThunk(
//   "users/updatePatient",
//   async ({ id, patient }: { id: number; patient: Patient }, { rejectWithValue }) => {
//     try {
//       return await patientAPI.update(id, patient)
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const deletePatient = createAsyncThunk("users/deletePatient", async (id: number, { rejectWithValue }) => {
//   try {
//     await patientAPI.delete(id)
//     return id
//   } catch (error: any) {
//     return rejectWithValue(error.message)
//   }
// })

// export const createTherapist = createAsyncThunk(
//   "users/createTherapist",
//   async (therapist: Therapist, { rejectWithValue }) => {
//     try {
//       return await therapistAPI.create(therapist)
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const updateTherapist = createAsyncThunk(
//   "users/updateTherapist",
//   async (therapist: Therapist, { rejectWithValue }) => {
//     try {
//       return await therapistAPI.update(therapist)
//     } catch (error: any) {
//       return rejectWithValue(error.message)
//     }
//   },
// )

// export const deleteTherapist = createAsyncThunk("users/deleteTherapist", async (id: number, { rejectWithValue }) => {
//   try {
//     await therapistAPI.delete(id)
//     return id
//   } catch (error: any) {
//     return rejectWithValue(error.message)
//   }
// })

// const initialState: UserState = {
//   patients: [],
//   therapists: [],
//   loading: false,
//   error: null,
// }

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch patients
//       .addCase(fetchPatients.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
//         state.loading = false
//         state.patients = action.payload
//       })
//       .addCase(fetchPatients.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//       })
//       // Fetch therapists
//       .addCase(fetchTherapists.pending, (state) => {
//         state.loading = true
//         state.error = null
//       })
//       .addCase(fetchTherapists.fulfilled, (state, action: PayloadAction<Therapist[]>) => {
//         state.loading = false
//         state.therapists = action.payload
//       })
//       .addCase(fetchTherapists.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload as string
//       })
//       // Create patient
//       .addCase(createPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
//         state.patients.push(action.payload)
//       })
//       // Update patient
//       .addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
//         const index = state.patients.findIndex((p) => p.patientId === action.payload.patientId)
//         if (index !== -1) {
//           state.patients[index] = action.payload
//         }
//       })
//       // Delete patient
//       .addCase(deletePatient.fulfilled, (state, action: PayloadAction<number>) => {
//         state.patients = state.patients.filter((p) => p.patientId !== action.payload)
//       })
//       // Create therapist
//       .addCase(createTherapist.fulfilled, (state, action: PayloadAction<Therapist>) => {
//         state.therapists.push(action.payload)
//       })
//       // Update therapist
//       .addCase(updateTherapist.fulfilled, (state, action: PayloadAction<Therapist>) => {
//         const index = state.therapists.findIndex((t) => t.therapistId === action.payload.therapistId)
//         if (index !== -1) {
//           state.therapists[index] = action.payload
//         }
//       })
//       // Delete therapist
//       .addCase(deleteTherapist.fulfilled, (state, action: PayloadAction<number>) => {
//         state.therapists = state.therapists.filter((t) => t.therapistId !== action.payload)
//       })
//   },
// })

// export const { clearError } = userSlice.actions
// export default userSlice.reducer
export {}