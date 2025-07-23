export const API_BASE_URL = "https://localhost:7015/api"

export const apiConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
}

export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return "An unexpected error occurred"
}
