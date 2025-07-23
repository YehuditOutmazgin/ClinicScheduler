import { API_BASE_URL, apiConfig, handleApiError } from "./config"
import type { Therapist, WorkHour } from "../types"

export const therapistAPI = {
  getAll: async (): Promise<Therapist[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch therapists: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  getById: async (id: number): Promise<Therapist> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${id}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch therapist: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  create: async (therapist: Therapist): Promise<Therapist> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(therapist),
      })

      if (!response.ok) {
        throw new Error(`Failed to create therapist: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  update: async (therapist: Therapist): Promise<Therapist> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${therapist.therapistId}`, {
        method: "PUT",
        ...apiConfig,
        body: JSON.stringify(therapist),
      })

      if (!response.ok) {
        throw new Error(`Failed to update therapist: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${id}`, {
        method: "DELETE",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to delete therapist: ${response.statusText}`)
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  cancelWorkDay: async (id: number, date: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${id}/cancel-day?date=${date}`, {
        method: "DELETE",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to cancel work day: ${response.statusText}`)
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  updateSchedule: async (id: number, schedule: WorkHour[]): Promise<WorkHour[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${id}/schedule`, {
        method: "PUT",
        ...apiConfig,
        body: JSON.stringify(schedule),
      })

      if (!response.ok) {
        throw new Error(`Failed to update schedule: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  addWorkHours: async (id: number, workHour: WorkHour): Promise<WorkHour> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${id}/add-work-hours`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(workHour),
      })

      if (!response.ok) {
        throw new Error(`Failed to add work hours: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  removeWorkHours: async (id: number, workHour: WorkHour): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Therapist/${id}/remove-work-hours`, {
        method: "DELETE",
        ...apiConfig,
        body: JSON.stringify(workHour),
      })

      if (!response.ok) {
        throw new Error(`Failed to remove work hours: ${response.statusText}`)
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },
}
