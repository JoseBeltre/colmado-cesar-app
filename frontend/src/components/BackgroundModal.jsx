import { useEffect } from 'react'

export const BackgroundModal = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <div onClick={closeModal} className='fixed inset-0 flex justify-center items-center p-10 bg-black/50 backdrop-blur-xs'>
      {children}
    </div>
  )
}
