import { Link } from 'react-router-dom'
import { Input } from '../../components/Input'

export function Login () {
  return (
    <form action='' className='grid gap-4'>
      <p className='text-center leading-4 text-black/70 dark:text-white/70 dark:font-light'>Bienvenido al sistema del <span className='text-primary font-extrabold'>Colmado Cesar</span> por favor indique sus credenciales.</p>

      <div className='grid gap-5'>
        <Input placeholder='Ingrese su usuario' />
        <Input placeholder='Ingrese su contraseña' type='password' />

      </div>
      <p className='text-red-400 text-center text-sm'>Contraseña incorrecta</p>
      <button className='bg-primary p-2.5 text-white font-extrabold tracking-wider rounded-lg outline-3 dark:outline-2 outline-primary hover:bg-primary/50 hover:text-primary cursor-pointer transition-colors' type='submit'> Entrar </button>

      <div className='leading-4 text-center dark:text-white/70 dark:font-extralight text-sm'>
        <p>¿Olvidó su contraseña? <Link to='/auth/register' className='text-primary font-medium underline'>Recuperar</Link></p>
        <p>¿Aún no tiene una cuenta? <Link to='/auth/register' className='text-primary font-medium underline'>Crear cuenta</Link></p>
      </div>
    </form>
  )
}
