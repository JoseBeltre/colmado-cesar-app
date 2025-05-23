import { formatCurrency, formatDateToLong } from '../utils/utils'

export function ClientHistoryItem ({ amount, date }) {
  const formattedAmount = formatCurrency(amount)
  const formattedDate = formatDateToLong(date)
  return (
    <article className='theme-container flex justify-between px-3'>
      <h2>{formattedDate}</h2>
      <h2 className='text-white'>{formattedAmount}</h2>
    </article>
  )
}
