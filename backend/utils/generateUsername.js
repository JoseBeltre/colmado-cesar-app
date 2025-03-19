// Funcion para crear los nombres de usuario
export function generateUsername (firstName, lastName) {
  if (!firstName || !lastName || typeof firstName !== 'string' || typeof lastName !== 'string') {
    throw new Error('Nombre y apellido deben ser valores válidos')
  }
  // sacar primer nombre
  const formattedFirstName = firstName.trim().split(' ')[0].toLowerCase()
  const formattedLastName = lastName.trim().split(' ')[0].toLowerCase()
  // unir y devolver en minusculas
  return `${formattedFirstName}.${formattedLastName}`
}
