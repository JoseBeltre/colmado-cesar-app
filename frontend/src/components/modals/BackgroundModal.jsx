import { useEffect } from 'react'

export const BackgroundModal = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  return (
    <div onClick={closeModal} className='fixed inset-0 flex justify-center items-center p-3 bg-black/20 backdrop-blur-[2px] z-0'>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
