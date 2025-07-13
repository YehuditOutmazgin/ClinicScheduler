const BASE_URL = "https://localhost:7015/api/Appointment"

export const getFutureAppointments = async (patientId) => {
  try {
    const response = await fetch(`${BASE_URL}/future/${patientId}`)
    if (!response.ok) throw new Error("Failed to fetch appointments")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getAppointmentHistory = async (patientId) => {
  try {
    const response = await fetch(`${BASE_URL}/history/${patientId}`)
    if (!response.ok) throw new Error("Failed to fetch appointment history")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getTherapistAppointments = async (therapistId, date) => {
  try {
    const response = await fetch(`${BASE_URL}/therapist/${therapistId}/date/${date}`)
    if (!response.ok) throw new Error("Failed to fetch therapist appointments")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getAvailableAppointments = async (therapistId, specialty, weekDate) => {
  try {
    let url
    if (therapistId) {
      url = `${BASE_URL}/available/therapist/${therapistId}/week?weekDate=${weekDate}`
    } else {
      url = `${BASE_URL}/available/specialty/${specialty}/week?weekDate=${weekDate}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch available appointments")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const scheduleAppointment = async (patientId, appointmentId) => {
  try {
    const response = await fetch(`${BASE_URL}/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patientId, appointmentId }),
    })

    if (!response.ok) throw new Error("Failed to schedule appointment")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const confirmAppointment = async (appointmentId) => {
  try {
    const response = await fetch(`${BASE_URL}/confirm/${appointmentId}`, {
      method: "POST",
    })

    if (!response.ok) throw new Error("Failed to confirm appointment")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getNextBusinessDayAppointments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/next-business-day`)
    if (!response.ok) throw new Error("Failed to fetch next business day appointments")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}
