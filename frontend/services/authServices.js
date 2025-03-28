const API_URL = 'http://localhost:1234'
export const authService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error en la petición:', error)
      return { success: false, message: error.message }
    }
  },
  deny: async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/deny`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error: ${response.status}`)
      }
      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error en la petición:', error)
      return { success: false, message: error.message }
    }
  },
  activate: async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/activate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error: ${response.status}`)
      }
      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error en la petición:', error)
      return { success: false, message: error.message }
    }
  }
}
