export function CartonItemDetails ({ name, amount, openModal }) {
  return (
    <div onClick={openModal} className='flex justify-between bg-white/75 dark:bg-[#1f1f1f] rounded-md py-1 p-4 cursor-pointer hover:bg-white/10 transition-colors'>
      <p className='dark:text-white'>{name}</p>
      <p>${amount}</p>
    </div>
  )
}
