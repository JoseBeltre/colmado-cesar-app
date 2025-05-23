export function formatCurrency (amount) {
  return amount >= 0 ? (amount !== 0 ? `$${amount}` : 0) : `-$${Math.abs(amount)}`
}

// Devuelve 01/12/2025
export function formatDatetimeFromMySQL (mysqlDateTime) {
  const date = new Date(mysqlDateTime.replace(' ', 'T'))
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Devuelve 01 de diciembre de 2025
export function formatDateToLong (dateISO) {
  const date = new Date(dateISO)
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
