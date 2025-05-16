export function ClientItem ({ firstName, lastName, aka, balance = 0, onClick }) {
  let fullName = ''
  if (lastName && firstName) {
    fullName = firstName.split(' ')[0] + ' ' + lastName.split(' ')[0]
  }
  const formattedBalance = balance >= 0 ? (balance !== 0 ? `$${balance}` : 0) : `-$${Math.abs(balance)}`
  return (
    <div onClick={onClick} className='theme-container px-3 py-4 flex justify-between items-center cursor-pointer'>
      <div className=''>
        <h5 className='text-black dark:text-white text-lg leading-4'>{fullName}</h5>
        <h6 className='text-black dark:text-white/50 leading-4'>{aka}</h6>
      </div>
      {/* <h5 className={`text-xl text-black dark:text-white ${balance > 0 ? 'text-success dark:text-success' : ''}`}>
        {balance !== 0 && formattedBalance}
      </h5> */}
      {
        balance >= 0
          ? balance !== 0
            ? <h5 className='text-xl text-success '>{formattedBalance}</h5>
            : ''
          : <h5 className='text-xl text-error '>{formattedBalance}</h5>
      }
    </div>
  )
}
