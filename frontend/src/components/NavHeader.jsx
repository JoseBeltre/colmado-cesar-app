import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function NavHeader ({ children, button }) {
  const navigate = useNavigate()
  return (
    <header className='bg-primary w-full p-3 flex items-center gap-3 text-white font-bold text-xl'>
      <ArrowLeft className='cursor-pointer' onClick={() => navigate('/')} />
      <h1 className='font-sansita flex items-center'>
        {children}
      </h1>
      {button && button}
    </header>
  )
}
