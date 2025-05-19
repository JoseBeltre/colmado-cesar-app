export function formatCurrency (amount) {
  return amount >= 0 ? (amount !== 0 ? `$${amount}` : 0) : `-$${Math.abs(amount)}`
}

export function formatDatetimeFromMySQL (mysqlDateTime) {
  const date = new Date(mysqlDateTime.replace(' ', 'T'))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
