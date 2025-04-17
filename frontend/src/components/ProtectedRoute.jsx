import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from '../hooks/useAuthUser'

export function ProtectedRoute ({ children }) {
  const navigate = useNavigate()
  const { isLogged } = useAuthUser()
  useEffect(() => {
    if (isLogged === false) {
      navigate('auth/login')
    }
  }, [navigate, isLogged])
  return children
}
