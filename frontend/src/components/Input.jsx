import { useId } from 'react'

export function Input ({ title, error, ...props }) {
  const inputId = useId()
  return (
    <div>
      {title && <label className='dark:text-white/90 text-sm' htmlFor={inputId}>{title}</label>}
      <input className='bg-black/5 dark:bg-white/5 p-3 w-full rounded-lg outline-black/10 ouline dark:outline-white/20 outline-3 dark:outline-2 transition-colors text-sm dark:text-white/80 dark:placeholder:text-white/50 dark:font-light focus:outline-primary mt-1' type='text' placeholder='Ingrese algo...' id={inputId} {...props} />
      {error && <p className='text-red-400 text-xs pt-1'>{error}</p>}
    </div>
  )
}
