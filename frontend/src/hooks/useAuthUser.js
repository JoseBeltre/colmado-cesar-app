import { useContext, useEffect, useState } from 'react'
import { authService } from '../../services/authServices'
import { UserContext } from '../context/userContext'

export function useAuthUser () {
  const [isLogged, setIsLogged] = useState(null) // null = aún cargando
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.token) {
        setIsLogged(false)
        return
      }

      const resultAPI = await authService.verifyToken({ token: user.token })

      if (!resultAPI.success) {
        console.log(resultAPI.message)
        setUser(null)
        setIsLogged(false)
        return
      }

      setIsLogged(true)
    }

    fetchData()
  }, [user?.token, setUser])

  return { isLogged }
}
