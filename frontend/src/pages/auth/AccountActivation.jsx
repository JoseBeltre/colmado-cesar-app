import { Info, CircleCheckBig, Ban } from 'lucide-react'
import Logotipo from '../../components/Logotipo'
import { useSearchParams } from 'react-router-dom'
import { authService } from '../../../services/authServices'
import { useState, useEffect } from 'react'
import { Spinner } from '../../components/Spinner'

export function AccountActivation ({ action = 'activate' }) {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setStatus({
          success: false,
          title: 'Ha ocurrido un error',
          subtitle: 'No se ha podido procesar la solicitud',
          description: 'Es probable que el token no funcione o esté expirado.',
          fontColor: '#ff9500'
        })
        return
      }

      let result
      if (action === 'activate') {
        result = await authService.activate(token)
      } else {
        result = await authService.deny(token)
      }

      if (!result.success) {
        setStatus({
          success: false,
          title: 'Ha ocurrido un error',
          subtitle: 'No se ha podido procesar la solicitud',
          description: 'Es probable que el token no funcione o esté expirado.',
          fontColor: '#ff9500'
        })
        return
      }

      setStatus({
        success: true,
        title: action === 'activate' ? 'Cuenta Activada' : 'Cuenta eliminada',
        subtitle: action === 'activate' ? '¡Solicitud Aceptada!' : '¡Solicitud Denegada!',
        description: action === 'activate'
          ? `El usuario ${result.username} ya puede acceder a la aplicación web.`
          : `La solicitud del usuario ${result.username} ha sido eliminada.`,
        fontColor: action === 'activate' ? '#277cec' : '#d85454'
      })
    }

    fetchData()
  }, [token, action])

  if (status === null) {
    // Cargando o esperando respuesta
    return (
      <div className='min-h-dvh flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  const icons = {
    activate: <CircleCheckBig size='60' strokeWidth={1.5} color='#277cec' />,
    deny: <Ban size='60' strokeWidth={1.5} color='#d85454' />,
    error: <Info size='60' strokeWidth={1.5} color='#ff9500' />
  }

  return (
    <div className='flex flex-col min-h-dvh p-10 text-center'>
      <div className='flex flex-col justify-center items-center flex-1'>
        <div>{status.success ? icons[action] : icons.error}</div>
        <h1 className='font-sansita font-bold text-4xl text-center leading-7' style={{ color: status.fontColor }}>
          {status.title}
        </h1>
        <p className='text-black/70 dark:text-white/70 text-xl dark:font-extralight leading-5 mt-2'>{status.subtitle}</p>
        <p className='text-black/70 dark:text-white/70 text-xl dark:font-extralight text-center leading-5 mt-10 xs:w-78'>
          {status.description}
        </p>
      </div>
      <div className='flex justify-center items-center'>
        <Logotipo width='100px' fill='#277cec' />
      </div>
    </div>
  )
}
