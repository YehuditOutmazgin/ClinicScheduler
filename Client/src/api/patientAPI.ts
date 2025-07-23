import { API_BASE_URL, apiConfig, handleApiError } from "./config"
import type { Patient } from "../types"

export const patientAPI = {
  getAll: async (): Promise<Patient[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Patient`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch patients: ${response.statusText}`)
      }

      const data = await response.json()
      return data.$values || data
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  getById: async (id: number): Promise<Patient> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Patient/${id}`, {
        method: "GET",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch patient: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  create: async (patient: Omit<Patient, "patientId">): Promise<Patient> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Patient`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(patient),
      })

      if (!response.ok) {
        throw new Error(`Failed to create patient: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  update: async (id: number, patient: Patient): Promise<Patient> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Patient/${id}`, {
        method: "PUT",
        ...apiConfig,
        body: JSON.stringify(patient),
      })

      if (!response.ok) {
        throw new Error(`Failed to update patient: ${response.statusText}`)
      }

      return await response.json()
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/Patient/${id}`, {
        method: "DELETE",
        ...apiConfig,
      })

      if (!response.ok) {
        throw new Error(`Failed to delete patient: ${response.statusText}`)
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },
}
