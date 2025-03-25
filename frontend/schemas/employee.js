import z from 'zod'

const employeesSchema = z.object({
  firstName: z.string()
    .trim()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    .max(255, { message: 'El nombre no puede exceder los 255 caracteres.' })
    .refine(name => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name), {
      message: 'El nombre solo debe contener letras y espacios'
    }),
  lastName: z.string()
    .trim()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    .max(255, { message: 'El apellido no puede exceder 255 caracteres' })
    .refine(name => /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name), {
      message: 'El apellido solo debe contener letras y espacios'
    }),
  role: z.enum(['admin', 'vendedor', 'propietario'], {
    errorMap: () => ({ message: 'El rol debe ser admin, vendedor o propietario' })
  }),
  email: z.string().trim().email({ message: 'El email no es válido' }),
  password: z.string()
    .trim()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    .max(255, { message: 'La contraseña no puede exceder los 255 caracteres' }),
  phoneNumber: z.string()
    .trim()
    .regex(/^\d{10,11}$/, {
      message: 'El número telefónico debe tener entre 10 y 11 dígitos'
    })
})

export function validateEmployee (data) {
  return employeesSchema.safeParse(data)
}

export function validatePartialEmployee (data) {
  return employeesSchema.partial().safeParse(data)
}
