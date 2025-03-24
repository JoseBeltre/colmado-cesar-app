import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import { Select } from '../../components/Select'

export function Register () {
  return (
    <form action='' className='grid gap-4 text-black/70 dark:text-white/70'>
      <div>
        <h3 className='text-primary font-sansita text-3xl font-bold text'>Crear Cuenta</h3>
        <p className=' text-black/70 dark:text-white/70 dark:font-light'>Complete los campos para crear su cuenta.</p>
        <p className='text-black/50 dark:text-white/50 text-xs dark:font-light leading-3'>Su cuenta no será habilitada al momento, se enviará una solicitud a un administrador primero.</p>
      </div>

      <div className='grid gap-3'>
        <Input title='Nombres' placeholder='ej. Pablo Jose' />
        <Input title='Apellidos' placeholder='ej. Martinez Perez' type='password' />
        <Select title='Rol que desempeña' placeholder='ej. Martinez Perez' options={['Vendedor', 'Admin', 'Propietario']} />
        <Input title='Correo Electrónico' placeholder='ej. martinez@gmail.com' type='email' />
        <Input title='Celular' placeholder='ej. 8296547841' type='text' />
        <Input title='Contraseña' placeholder='Ingrese una contraseña' type='text' />
        <Input title='Confirmar contraseña' placeholder='Vuelva a ingresar su contraseña' type='text' />

      </div>
      <p className='text-red-400 text-center text-sm'>Contraseña incorrecta</p>
      <button className='bg-primary p-2.5 text-white font-extrabold tracking-wider rounded-lg outline-3 dark:outline-2 outline-primary hover:bg-primary/50 hover:text-primary cursor-pointer transition-colors' type='submit'> Crear cuenta </button>

      <div className='leading-4 text-center dark:text-white/70 dark:font-extralight text-sm'>
        <p>¿Ya tienes una cuenta? <Link to='/auth/login' className='text-primary font-medium underline'>Iniciar sesión</Link></p>
      </div>
    </form>
  )
}
