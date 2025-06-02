import z from 'zod'

const clientSchema = z.object({
  firstName: z.string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    .max(30, { message: 'El nombre no puede exceder los 30 caracteres.' })
    .refine(name => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name), {
      message: 'El nombre solo debe contener letras y espacios'
    }),
  lastName: z.string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    .max(30, { message: 'El apellido no puede exceder 30 caracteres' })
    .refine(name => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name), {
      message: 'El apellido solo debe contener letras y espacios'
    }),
  aka: z.string()
    .min(2, { message: 'El apodo debe tener al menos 2 caracteres' })
    .max(30, { message: 'El apodo no puede exceder 30 caracteres' }),
  address: z.string()
    .min(8, { message: 'La dirección debe tener al menos 8 caracteres' })
    .max(255, { message: 'La dirección no puede exceder 255 caracteres' }).optional().or(z.literal('')),
  phoneNumber: z.string()
    .regex(/^\d{10,11}$/, {
      message: 'El número telefónico debe tener entre 10 y 11 dígitos'
    }).optional().or(z.literal('')),
  employeeId: z.string().uuid()
}).refine(data => {
  const hasNameOrAka = !!data.firstName?.trim() || !!data.aka?.trim()
  const lastNameImpliesFirstName = !data.lastName?.trim() || !!data.firstName?.trim()
  return hasNameOrAka && lastNameImpliesFirstName
})

export function validateClient (data) {
  return clientSchema.safeParse(data)
}

export function validatePartialClient (data) {
  return clientSchema.partial().safeParse(data)
}
