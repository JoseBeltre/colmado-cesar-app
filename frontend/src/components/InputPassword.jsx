import { useId, useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

export function InputPassword ({ title, error, ...props }) {
  const inputId = useId()
  const [inputType, setInputType] = useState('password')
  const handleClick = () => {
    setInputType(prev => prev === 'password' ? 'text' : 'password')
  }
  return (
    <div>
      {title && <label className='dark:text-white/90 text-sm' htmlFor={inputId}>{title}</label>}
      <div className='relative'>
        <input className='bg-black/5 dark:bg-white/5 p-3 w-full rounded-lg outline-black/10 ouline dark:outline-white/20 outline-3 dark:outline-2 transition-colors text-sm dark:text-white/80 dark:placeholder:text-white/50 dark:font-light focus:outline-primary mt-1' placeholder='Ingrese algo...' id={inputId} {...props} type={inputType} />
        <div onClick={handleClick} className='absolute right-2 top-[30%] size-5 cursor-pointer dark:text-white/40'>
          {inputType === 'password' ? <Eye width='100%' /> : <EyeClosed width='100%' />}
        </div>
      </div>
      {error && <p className='text-red-400 text-xs pt-1'>{error}</p>}
    </div>
  )
}
