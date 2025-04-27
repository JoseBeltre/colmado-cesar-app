import { useContext, useEffect, useState } from 'react'
import { authService } from '../../services/authServices'
import { UserContext } from '../context/userContext'

export function useAuthUser () {
  const { user, setUser } = useContext(UserContext)
  const [isLogged, setIsLogged] = useState(null)

  useEffect(() => {
    const handleAuth = async () => {
      if (user?.token) {
        const { success } = await authService.verifyToken({ token: user.token })
        if (success) {
          setIsLogged(true)
          return
        }
      }

      const { success, data } = await authService.refreshToken()
      if (!success) {
        setIsLogged(false)
        return
      }
      setUser(data)
      setIsLogged(true)
    }
    handleAuth()
  }, [])

  return { isLogged }
}
