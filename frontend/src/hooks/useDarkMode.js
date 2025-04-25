import { useEffect, useState } from 'react'

export function useDarkMode () {
  const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches
  const [isDark, setIsDark] = useState(prefersDarkMode())

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (event) => {
      setIsDark(event.matches)
    })
  }, [])

  return { isDark }
}
