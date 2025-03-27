import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'
import { Link } from 'react-router-dom'
import { Select } from '../../components/Select'
import { validateEmployee } from '../../../schemas/employee'
import { useEffect, useState } from 'react'
import { authService } from '../../../services/authServices'
import { AlertBox } from '../../components/AlertBox'

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
  const [mainError, setMainError] = useState('')
  const [isAlertBoxOpen, setIsAlertBoxOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Funcion para manejar el cambio de la contraseña y confirmar contraseña
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
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
  }, [formData.password, formData.confirmPassword])

  // Funcion para manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  // Funcion para manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = validateEmployee(formData)

    if (!result.success) {
      const formattedErrors = {}
      result.error.errors.forEach(err => {
        formattedErrors[err.path[0]] = err.message
      })
      setErrors(formattedErrors)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden'
      }))
      return
    }
    setErrors({})
    setIsLoading(true)
    const resultAPI = await authService.register(formData)
    if (!resultAPI.success) {
      if (resultAPI.message === 'Failed to fetch') {
        resultAPI.message = 'Error al conectar con el servidor.'
      }
      setMainError(resultAPI.message)
    } else {
      setIsAlertBoxOpen(true)
      setFormData({
        firstName: '',
        lastName: '',
        role: 'vendedor',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      })
    }
    setIsLoading(false)
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
        <InputPassword
          name='password'
          title='Contraseña'
          placeholder='Ingrese una contraseña'
          type='password'
          onChange={handleChange}
          value={formData.password}
          error={errors?.password}
          required
        />
        <InputPassword
          name='confirmPassword'
          title='Confirmar contraseña'
          placeholder='Vuelva a ingresar su contraseña'
          type='password'
          onChange={handleChange}
          value={formData.confirmPassword}
          error={errors?.confirmPassword}
          required
        />

      </div>
      <p className='text-red-400 text-center text-sm'>{mainError}</p>
      <button className='bg-primary p-2.5 mt-3 text-white font-extrabold tracking-wider rounded-lg outline-3 dark:outline-2 outline-primary hover:bg-primary/50 hover:text-primary cursor-pointer transition-colors' type='submit'>
        {isLoading ? 'Procesando...' : 'Crear Cuenta'}
      </button>

      <div className='leading-4 text-center dark:text-white/70 dark:font-extralight text-sm'>
        <p>¿Ya tienes una cuenta? <Link to='/auth/login' className='text-primary font-medium underline'>Iniciar sesión</Link></p>
      </div>
      {
      isAlertBoxOpen &&
        <AlertBox type='success' closeModal={() => setIsAlertBoxOpen(!isAlertBoxOpen)}>
          Su solicitud ha sido enviada a un administrador, se le avisará mediante su correo cuando su cuenta esté en funcionamiento. ¡Atento!
        </AlertBox>
      }
    </form>
  )
}
