import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider ({ children }) {
  const [user, setUser] = useState({
    token: undefined,
    user: {
      username: undefined,
      firstName: undefined,
      lastName: undefined,
      role: undefined,
      email: undefined
    }
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
