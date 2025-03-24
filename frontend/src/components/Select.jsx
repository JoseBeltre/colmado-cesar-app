import { useId } from 'react'

export function Select ({ title, options, ...props }) {
  const inputId = useId()
  return (
    <div>
      {title && <label className='dark:text-white/90 text-sm' htmlFor={inputId}>{title}</label>}
      <select className='bg-black/5 dark:bg-white/5 p-3 w-full rounded-lg outline-black/10 ouline dark:outline-white/20 outline-3 dark:outline-2 transition-colors text-sm dark:text-white/80 dark:placeholder:text-white/50 dark:font-light focus:outline-primary mt-1' type='text' placeholder='Ingrese algo...' id={inputId} {...props}>
        {
          options.map(option => {
            return (
              <option className='capitalize' key={option} value={option}>{option}</option>
            )
          })
        }
      </select>
    </div>
  )
}
