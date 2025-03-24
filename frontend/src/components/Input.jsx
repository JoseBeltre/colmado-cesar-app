export function Input (props) {
  return (
    <input className='bg-black/5 dark:bg-white/5 p-3 w-full rounded-lg outline-black/10 ouline dark:outline-white/20 outline-3 dark:outline-2 transition-colors text-sm dark:text-white/70 dark:placeholder:text-white/50 dark:font-light focus:outline-primary' type='text' placeholder='Ingrese algo...' {...props} />
  )
}
