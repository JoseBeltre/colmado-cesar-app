import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/InputPassword'
import { useContext, useState } from 'react'
import { authService } from '../../../services/authServices'
import { Spinner } from '../../components/Spinner'
import { UserContext } from '../../context/userContext'

export function Login () {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = formData

    const resultAPI = await authService.login({ username, password })
    setIsLoading(true)
    if (!resultAPI.success) {
      setError(resultAPI.message)
      setIsLoading(false)
      return
    }
    setUser(resultAPI.data)
    setError('')
    setIsLoading(false)

    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit} className='grid gap-4'>
      <p className='text-center leading-4 text-black/70 dark:text-white/70 dark:font-light'>Bienvenido al sistema del <span className='text-primary font-extrabold'>Colmado Cesar</span> por favor indique sus credenciales.</p>

      <div className='grid gap-5'>
        <Input
          name='username'
          placeholder='Ingrese su usuario'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputPassword
          name='password'
          placeholder='Ingrese su contraseña'
          value={formData.password}
          onChange={handleChange}
          required
        />

      </div>
      <p className='text-red-400 text-center text-sm'>{error}</p>
      <button className='bg-primary p-2.5 text-white font-extrabold tracking-wider rounded-lg outline-3 dark:outline-2 outline-primary hover:bg-primary/50 hover:text-primary cursor-pointer transition-colors' type='submit'>
        {isLoading ? <Spinner color='#132849' /> : ' Entrar'}
      </button>

      <div className='leading-4 text-center dark:text-white/70 dark:font-extralight text-sm'>
        <p>¿Olvidó su contraseña? <Link to='/auth/register' className='text-primary font-medium underline'>Recuperar</Link></p>
        <p>¿Aún no tiene una cuenta? <Link to='/auth/register' className='text-primary font-medium underline'>Crear cuenta</Link></p>
      </div>
    </form>
  )
}
