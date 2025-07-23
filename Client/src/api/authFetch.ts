export interface LoginResponse {
  data: {
    id: string
    name: string
    email?: string
    phone?: string
    birthYear: number
  }
  role: string
}

export const loginUser = async (id: string, password: string, birthYear: number): Promise<LoginResponse> => {
  // Mock API call - replace with actual API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock authentication logic
      if (id === "patient1" && password === "password" && birthYear === 1990) {
        resolve({
          data: {
            id: "patient1",
            name: "John Doe",
            email: "john@example.com",
            phone: "123-456-7890",
            birthYear: 1990,
          },
          role: "patient",
        })
      } else if (id === "therapist1" && password === "password" && birthYear === 1985) {
        resolve({
          data: {
            id: "therapist1",
            name: "Dr. Sarah Smith",
            email: "sarah@clinic.com",
            phone: "123-456-7891",
            birthYear: 1985,
          },
          role: "therapist",
        })
      } else if (id === "secretary1" && password === "password" && birthYear === 1988) {
        resolve({
          data: {
            id: "secretary1",
            name: "Mary Johnson",
            email: "mary@clinic.com",
            phone: "123-456-7892",
            birthYear: 1988,
          },
          role: "secretary",
        })
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}
