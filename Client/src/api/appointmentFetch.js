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

// export const getAvailableAppointments = async (therapistId, specialty, weekDate) => {
//   try {
//     let url
//     let date='13-07-2025'
//     if (therapistId) {
//       url = `${BASE_URL}/available/therapist/${therapistId}/week?weekDate=${date}`
//     } else {
//       url = `${BASE_URL}/available/specialty/${specialty}/week?weekDate=${date}`
//     }
//     alert(url)
//     const response = await fetch(url)

//     // await alert(response.json())
//     if (!response.ok) throw new Error("Failed to fetch available appointments")
//     return await response.json()
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }
export async function getAvailableAppointments(therapistId, weekDate) {
  // weekDate במבנה DD-MM-YYYY
  const resp = await fetch(
    `https://localhost:7015/api/Appointment/available/therapist/${therapistId}/week?weekDate=${weekDate}`
  );
  if (!resp.ok) throw new Error("שגיאה בטעינת התורים");
  const data = await resp.json();
  // מחלץ את $values במידת הצורך
  return data.$values || [];
}

export const scheduleAppointment = async (patientId, appointmentId) => {
  try {
    const response = await fetch(`${BASE_URL}/schedule?patientId=${patientId}&appointmentId=${appointmentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }    })

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
