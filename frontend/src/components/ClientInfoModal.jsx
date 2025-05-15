import { CircleDollarSign, ClipboardList, UserMinus, UserPenIcon, X } from 'lucide-react'
import { BackgroundModal } from './BackgroundModal'
import { Button } from './Button'

export function ClientInfoModal ({ closeModal }) {
  return (
    <BackgroundModal closeModal={closeModal}>
      <div className='theme-container w-full max-w-2xl p-0 overflow-hidden border-none z-50'>
        <header className='flex justify-between items-center bg-primary dark:bg-white/10 font-bold dark:font-medium text-white p-3 py-1 pt-2'>
          <h5>Información del cliente</h5>
          <X className='cursor-pointer' onClick={closeModal} />
        </header>
        <div className='grid gap-5 p-3'>
          <div className='border-b py-2'>
            <h2 className='text-black dark:text-white text-2xl leading-5'>Tata</h2>
            <p className='leading-5'>Maria Ortega Cardenal</p>
          </div>
          <div className='grid grid-cols-2 leading-4 gap-2'>
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Estado</p><p className='text-end text-secondary'>Deuda pendiente</p>
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Monto de deuda</p><p className='text-end text-secondary'>$300</p>
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Numero telefónico</p><a className='text-end' href='tel:8297420323'>8297420323</a>
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Dirección</p><p className='text-end'>Calle Los Rosales, Santo Domingo Este</p>
          </div>
          <div className='leading-4'>
            <p>Registrado el <span className='font-semibold dark:font-medium text-black dark:text-white'>5/5/2023</span></p>
            <p>Registrado por <span className='font-semibold dark:font-medium text-black dark:text-white'>Nelson Gonzalez</span></p>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Button className='bg-white text-black border border-black col-span-2 font-semibold'>
              <ClipboardList size={20} />
              Ver historial del cliente
            </Button>
            <Button className='bg-success col-span-2 text-white'>
              <CircleDollarSign size={20} />
              Sumar pago
            </Button>
            <Button className='bg-secondary text-white'>
              <UserMinus size={20} />
              Eliminar cliente
            </Button>
            <Button className=' text-white'>
              <UserPenIcon size={20} />
              Editar Información
            </Button>
          </div>
        </div>
      </div>
    </BackgroundModal>
  )
}
