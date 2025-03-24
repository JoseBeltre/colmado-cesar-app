import { Outlet } from 'react-router-dom'
import { Logotipo } from '../../components/Logotipo'
import { useEffect, useState } from 'react'

export function AuthLayout () {
  const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches

  const [isDark, setIsDark] = useState(prefersDarkMode())

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    // Agregar el listener
    mediaQuery.addEventListener('change', (event) => {
      setIsDark(event.matches)
    })
  }, [])

  return (
    <div className='flex flex-col justify-center items-center min-h-dvh py-6 pb-10 px-4 xs:px-10'>
      <header className='pb-10 px-4'>
        <Logotipo width='100%' height='100%' fill={isDark ? '#fff' : '#327CEC'} />
      </header>
      <Outlet />
    </div>
  )
}
