import { useEffect } from 'react'
import { useAuthUser } from './useAuthUser'
import { useNavigate } from 'react-router-dom'

export function useProtectedRoute () {
  const { isLogged } = useAuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLogged === false) {
      navigate('/auth/login')
    }
  }, [isLogged, navigate])
}
