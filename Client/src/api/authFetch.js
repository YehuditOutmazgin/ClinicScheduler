const BASE_URL = "https://localhost:7015/api"

export const loginUser = async (id, password, birthYear) => {
  try {
    const url = `${BASE_URL}/Login/${id}`

    // For patients, use birth year as password
    const pass = password || birthYear

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pass }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
  //  alert(JSON.stringify(data));
    return data
  } catch (error) {
    throw new Error(error.message || "Login failed")
  }
}
