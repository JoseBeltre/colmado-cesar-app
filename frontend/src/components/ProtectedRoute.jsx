import { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from '../hooks/useAuthUser'
import { UserContext } from '../context/userContext'
import { authService } from '../../services/authServices'

export function ProtectedRoute ({ children }) {
  const navigate = useNavigate()
  const { isLogged } = useAuthUser()
  const { user, setUser } = useContext(UserContext)

  const hasRefreshed = useRef(false)

  useEffect(() => {
    const refreshToken = async () => {
      if (!hasRefreshed.current) {
        hasRefreshed.current = true
        const refreshRes = await authService.refreshToken({ token: user.token })
        if (!refreshRes.success) {
          return false
        } else {
          setUser(refreshRes.data)
          return true
        }
      }
    }

    const checkAuth = async () => {
      if (isLogged === false) {
        const wasRefreshed = await refreshToken()
        if (wasRefreshed) return
        navigate('/auth/login')
      }
    }
    if (!hasRefreshed.current) {
      checkAuth()
    }
  }, [navigate, isLogged, setUser, user])

  return children
}
