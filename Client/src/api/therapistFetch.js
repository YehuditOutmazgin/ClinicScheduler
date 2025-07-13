const BASE_URL = "https://localhost:7015/api/Therapist"

export const getAllTherapists = async () => {
  try {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error("Failed to fetch therapists")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getTherapistById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error("Failed to fetch therapist")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const addTherapist = async (therapistData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(therapistData),
    })

    if (!response.ok) throw new Error("Failed to add therapist")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateTherapist = async (therapistData) => {
  try {
    const response = await fetch(`${BASE_URL}/${therapistData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(therapistData),
    })

    if (!response.ok) throw new Error("Failed to update therapist")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updateTherapistSchedule = async (id, schedule) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/schedule`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    })

    if (!response.ok) throw new Error("Failed to update schedule")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const addWorkHours = async (id, workHours) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/add-work-hours`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workHours),
    })

    if (!response.ok) throw new Error("Failed to add work hours")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const removeWorkHours = async (id, workHours) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/remove-work-hours`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workHours),
    })

    if (!response.ok) throw new Error("Failed to remove work hours")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteTherapist = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete therapist")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}
