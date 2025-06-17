import z from 'zod'

const transactionSchema = z.object({
  amount: z.number()
    .min(-2000, { message: 'La cantidad mínima es -2,000 pesos en caso de una deuda.' })
    .max(8000, { message: 'El máximo  que se puede agregar es de 8,000 pesos.' }),
  description: z.string()
    .min(2, { message: 'La descripción debe ser de mínimo 10 carácteres.' })
    .max(255, { message: 'El descripción no puede exceder 255 caracteres' }),
  employeeId: z.string().uuid({ message: 'Id inválido' })
})

export function validateTransaction (data) {
  return transactionSchema.safeParse(data)
}

export function validatePartialTransaction (data) {
  return transactionSchema.partial().safeParse(data)
}
