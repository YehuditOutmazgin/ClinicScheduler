import { API_BASE_URL, apiConfig, handleApiError } from "./config"
import type { LoginResponse } from "../types"

export const authAPI = {
  login: async (id: number, password: number): Promise<LoginResponse> => {
    try {
      const url=`${API_BASE_URL}/Login/${id}?pass=${password}`
            alert("apifetch: "+ url)

      const response = await fetch(url, {
        method: "POST",
        ...apiConfig,
        body: "",
      })

      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`)
      }

      const data = await response.json()
      return {
        role: data.role === "patient" ? "patient" : data.role,
        data: data.data,
      }
    } catch (error: any) {
      throw new Error(handleApiError(error))
    }
  },
}
