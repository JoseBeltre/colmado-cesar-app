import { Info, CircleCheckBig, Ban } from 'lucide-react'
import Logotipo from '../../components/Logotipo'

export function AccountActivation ({ action = 'activate' }) {
  const success = true
  const fontColor = success ? (action === 'activate' ? '#277cec' : '#d85454') : '#ff9500'

  const getTexts = () => {
    if (!success) {
      return {
        title: 'Ha ocurrido un error',
        subtitle: 'No se ha podido procesar la solicitud',
        description: 'Es probable que el token no funcione o esté expirado.'
      }
    }

    return action === 'activate'
      ? {
          title: 'Cuenta Activada',
          subtitle: '¡Solicitud Aceptada!',
          description: 'El usuario manuel.perez ya puede acceder a la aplicación web.'
        }
      : {
          title: 'Cuenta eliminada',
          subtitle: '¡Solicitud Denegada!',
          description: 'La solicitud del usuario manuel.perez ha sido eliminada.'
        }
  }

  const { title, subtitle, description } = getTexts()
  // Objeto con los diferentes iconoes
  const icons = {
    activate: <CircleCheckBig size='60' strokeWidth={1.5} color='#277cec' />,
    deny: <Ban size='60' strokeWidth={1.5} color='#d85454' />,
    error: <Info size='60' strokeWidth={1.5} color='#ff9500' />
  }

  return (
    <div className='flex flex-col min-h-dvh p-10'>
      <div className='flex flex-col justify-center items-center flex-1'>
        <div> {success ? icons[action] : icons.error}
        </div>
        <h1 className='font-sansita font-bold text-4xl' style={{ color: fontColor }}>{title}</h1>
        <p className='text-black/70 dark:text-white/70 text-xl dark:font-extralight'>{subtitle}</p>
        <p className='text-black/70 dark:text-white/70 text-xl dark:font-extralight text-center leading-5 mt-10 xs:w-78'>{description}</p>
      </div>
      <div className='flex justify-center items-center'>
        <Logotipo width='100px' fill='#277cec' />
      </div>
    </div>
  )
}
