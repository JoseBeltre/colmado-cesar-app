import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import { Select } from '../../components/Select'
import { validateEmployee } from '../../../schemas/employee'
import { useState } from 'react'

export function Register () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'vendedor',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  // Funcion para manejar el cambio de la contraseña y confirmar contraseña
  const handleConfirmPassword = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (value !== formData.password && value === '') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden'
      }))
    } else {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }))
    }
  }
  // Funcion para manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  // Funcion para manejar el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    const result = validateEmployee(formData)

    if (!result.success) {
      const formattedErrors = {}
      result.error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message
      })
      setErrors(formattedErrors)
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden'
      }))
    }
    setErrors({})

    // TODO: Enviar los datos al backend para crear la cuenta
  }

  return (
    <form onSubmit={handleSubmit} className='grid gap-4 text-black/70 dark:text-white/70'>
      <div>
        <h3 className='text-primary font-sansita text-3xl font-bold text'>Crear Cuenta</h3>
        <p className=' text-black/70 dark:text-white/70 dark:font-light'>Complete los campos para crear su cuenta.</p>
        <p className='text-black/50 dark:text-white/50 text-xs dark:font-light leading-3'>Su cuenta no será habilitada al momento, se enviará una solicitud a un administrador primero.</p>
      </div>

      <div className='grid gap-3'>
        <Input
          name='firstName'
          title='Nombres'
          placeholder='ej. Pablo Jose'
          error={errors?.firstName}
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          name='lastName'
          title='Apellidos'
          placeholder='ej. Martinez Perez'
          error={errors?.lastName}
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Select
          name='role'
          title='Rol que desempeña'
          placeholder='ej. Martinez Perez'
          options={['vendedor', 'admin', 'propietario']}
          value={formData.role}
          onChange={handleChange}
          error={errors?.role}
          required
        />
        <Input
          name='email'
          title='Correo Electrónico'
          placeholder='ej. martinez@gmail.com'
          type='email'
          onChange={handleChange}
          value={formData.email}
          error={errors?.email}
          required
        />
        <Input
          name='phoneNumber'
          title='Celular'
          placeholder='ej. 8296547841'
          type='text'
          onChange={handleChange}
          value={formData.phoneNumber}
          error={errors?.phoneNumber}
          required
        />
        <Input
          name='password'
          title='Contraseña'
          placeholder='Ingrese una contraseña'
          type='text'
          onChange={handleConfirmPassword}
          value={formData.password}
          error={errors?.password}
          required
        />
        <Input
          name='confirmPassword'
          title='Confirmar contraseña'
          placeholder='Vuelva a ingresar su contraseña'
          type='text'
          onChange={handleConfirmPassword}
          value={formData.confirmPassword}
          error={errors?.confirmPassword}
          required
        />

      </div>
      {/* <p className='text-red-400 text-center text-sm'>Contraseña incorrecta</p> */}
      <button className='bg-primary p-2.5 mt-3 text-white font-extrabold tracking-wider rounded-lg outline-3 dark:outline-2 outline-primary hover:bg-primary/50 hover:text-primary cursor-pointer transition-colors' type='submit'> Crear cuenta </button>

      <div className='leading-4 text-center dark:text-white/70 dark:font-extralight text-sm'>
        <p>¿Ya tienes una cuenta? <Link to='/auth/login' className='text-primary font-medium underline'>Iniciar sesión</Link></p>
      </div>
    </form>
  )
}
