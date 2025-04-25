import { Outlet, useNavigate } from 'react-router-dom'
import { Logotipo } from '../../components/Logotipo'
import { useEffect } from 'react'
import { useAuthUser } from '../../hooks/useAuthUser'
import { useDarkMode } from '../../hooks/useDarkMode'

export function AuthLayout () {
  const { isLogged } = useAuthUser()
  const navigate = useNavigate()
  const { isDark } = useDarkMode()

  useEffect(() => {
    if (isLogged) {
      navigate('/')
    }
  }, [navigate, isLogged])

  return (
    <div className='flex flex-col justify-center items-center min-h-dvh py-6 pb-10 px-4 xs:px-10'>
      <header className='pb-10 px-4'>
        <Logotipo width='100%' height='100%' fill={isDark ? '#fff' : '#327CEC'} />
      </header>
      <Outlet />
    </div>
  )
}
