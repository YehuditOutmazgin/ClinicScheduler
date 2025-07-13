const BASE_URL = "https://localhost:7015/api/Patient"

export const getAllPatients = async () => {
  try {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error("Failed to fetch patients")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getPatientById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error("Failed to fetch patient")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const addPatient = async (patientData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })

    if (!response.ok) throw new Error("Failed to add patient")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const updatePatient = async (id, patientData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    })

    if (!response.ok) throw new Error("Failed to update patient")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deletePatient = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) throw new Error("Failed to delete patient")
    return await response.json()
  } catch (error) {
    throw new Error(error.message)
  }
}
