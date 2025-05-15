export function ClientItem ({ onClick }) {
  return (
    <div onClick={onClick} className='theme-container px-3 py-4 flex justify-between items-center cursor-pointer'>
      <div className=''>
        <h5 className='text-black dark:text-white text-lg leading-4'>Pablo Pimentel Rojas</h5>
        <h6 className='text-black dark:text-white/50 leading-3'>Jose Maestro</h6>
      </div>
      <h5 className='text-xl text-black dark:text-white'>
        - $1400
      </h5>
    </div>
  )
}
