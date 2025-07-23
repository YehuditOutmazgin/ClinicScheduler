import { API_BASE_URL, apiConfig, handleApiError } from "./config"
import type { Appointment, AvailableAppointment, PastAppointment, CanceledAppointment } from "../types"

export const appointmentAPI = {
  // Get future appointments by patient ID
  getFutureByPatientId: async (patientId: number): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/future/${patientId}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get appointments by therapist and date
  getByTherapistAndDate: async (therapistId: number, date: string): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/therapist/${therapistId}/date/${date}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get appointments for therapist week
  getTherapistWeek: async (therapistId: number, date: string): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/therapist/${therapistId}/date/${date}/week`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get appointments by date
  getByDate: async (date: string): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/date/${date}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get next business day appointments
  getNextBusinessDay: async (): Promise<Appointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/next-business-day`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Confirm appointment
  confirmAppointment: async (appointmentId: number): Promise<Appointment> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/confirm/${appointmentId}`, {
        method: "POST",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to confirm appointment: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get appointment status
  getStatus: async (appointmentId: number): Promise<{ appointmentId: number; isConfirmed: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/status/${appointmentId}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to get appointment status: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Cancel appointment confirmation
  cancelConfirmation: async (appointmentId: number): Promise<Appointment> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/update-confirmation/${appointmentId}`, {
        method: "PUT",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to cancel confirmation: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get canceled appointments for patient
  getCanceledByPatient: async (patientId: string): Promise<CanceledAppointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/patient/${patientId}/canceled`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch canceled appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get all canceled appointments
  getAllCanceled: async (): Promise<CanceledAppointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/canceled`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch canceled appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get available appointments for therapist week
  getAvailableForTherapistWeek: async (therapistId: number, weekDate: string): Promise<AvailableAppointment[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Appointment/available/therapist/${therapistId}/week?weekDate=${weekDate}`,
        {
          method: "GET",
          ...apiConfig,
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch available appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get available appointments for specialty week
  getAvailableForSpecialtyWeek: async (specialty: string, weekDate: string): Promise<AvailableAppointment[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Appointment/available/specialty/${specialty}/week?weekDate=${weekDate}`,
        {
          method: "GET",
          ...apiConfig,
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch available appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get past appointments by therapist and date
  getPastByTherapistAndDate: async (therapistId: number, date: string): Promise<PastAppointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/past/therapist/${therapistId}/date/${date}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch past appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get past appointments by therapist in date range
  getPastByTherapistInRange: async (
    therapistId: number,
    startDate: string,
    endDate: string,
  ): Promise<PastAppointment[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Appointment/past/therapist/${therapistId}/range?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          ...apiConfig,
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch past appointments: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Get patient appointment history
  getPatientHistory: async (patientId: number): Promise<PastAppointment[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/history/${patientId}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch patient history: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Schedule appointment
  scheduleAppointment: async (patientId: number, appointmentId: number): Promise<Appointment> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/Appointment/schedule?patientId=${patientId}&appointmentId=${appointmentId}`,
        {
          method: "POST",
          ...apiConfig,
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to schedule appointment: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Delete appointment
  deleteAppointment: async (appointmentId: number, patientId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/delete/${appointmentId}/patient/${patientId}`, {
        method: "DELETE",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to delete appointment: ${response.statusText}`)
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Delete appointment by therapist
  deleteByTherapist: async (therapistId: number, date: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/delete/byTherapist/${therapistId}/date/${date}`, {
        method: "DELETE",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to delete appointment: ${response.statusText}`)
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  // Set appointments for period
  setAppointmentsForPeriod: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Appointment/setAppForPeriod`, {
        method: "POST",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to set appointments for period: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },
}
