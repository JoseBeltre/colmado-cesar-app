import z from 'zod'

const employeesSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  role: z.enum(['admin', 'vendedor']),
  email: z.string().email(),
  password: z.string().min(8).max(255),
  phoneNumber: z.string().min(10).max(11)
})

export function validateEmployee (data) {
  return employeesSchema.safeParse(data)
}

export function validatePartialEmployee (data) {
  return employeesSchema.partial().safeParse(data)
}
