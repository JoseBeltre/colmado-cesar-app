import { CircleDollarSign, ClipboardList, UserMinus, UserPenIcon, X } from 'lucide-react'
import { BackgroundModal } from './BackgroundModal'
import { Button } from '../Button'
import { formatCurrency, formatDatetimeFromMySQL } from '../../utils/utils'
import { useState } from 'react'
import { ClientModal } from './ClientModal'
import { ConfirmModal } from './ConfirmModal'
import { SumPaymentModal } from './SumPaymentModal'

export function ClientInfoModal ({ closeModal, client }) {
  const formattedBalance = formatCurrency(client.balance)
  const formattedCreatedAt = formatDatetimeFromMySQL(client.createdAt)
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false)
  const [isSumPaymentModalOpen, setIsSumPaymentModalOpen] = useState(false)
  const getClientDebtState = () => {
    if (client.balance === 0) {
      return <p className='text-end'>Sin deuda</p>
    } else if (client.balance > 0) {
      return <p className='text-end text-success font-semibold'>Con dinero</p>
    } else {
      return <p className='text-end text-secondary font-semibold'>Deuda pendiente</p>
    }
  }
  const getClientBalance = () => {
    if (client.balance === 0) {
      return ''
    } else if (client.balance > 0) {
      return <p className='text-end text-success font-semibold'>{formattedBalance}</p>
    } else {
      return <p className='text-end text-secondary font-semibold'>{formattedBalance}</p>
    }
  }

  return (
    <BackgroundModal closeModal={closeModal}>
      <div className='theme-container w-full md:w-md p-0 overflow-hidden border-none z-50'>
        <header className='flex justify-between items-center bg-primary dark:bg-white/10 font-bold dark:font-medium text-white p-3 py-1 pt-2'>
          <h5>Información del cliente</h5>
          <X className='cursor-pointer' onClick={closeModal} />
        </header>
        <div className='grid gap-5 p-3'>
          <div className='border-b py-2'>
            <h2 className='text-black dark:text-white text-2xl leading-5'>{client.aka}</h2>
            <p className='leading-5'>{client.firstName + ' ' + client.lastName}</p>
          </div>
          <div className='grid grid-cols-2 leading-4 gap-2'>
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Estado</p>
            {getClientDebtState()}
            {
              client.balance !== 0 &&
                <p className='font-semibold dark:font-medium text-black dark:text-white'>Monto de deuda</p>
            }
            {getClientBalance()}
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Numero telefónico</p>
            {
              client.phoneNumber !== null
                ? <a className='text-end' href={`tel:${client.phoneNumber}`}>{client.phoneNumber}</a>
                : <p className='text-end'>No registrado</p>
            }
            <p className='font-semibold dark:font-medium text-black dark:text-white'>Dirección</p>
            <p className='text-end'>{client.address !== null ? client.address : 'No registrada'}</p>
          </div>
          <div className='leading-4'>
            <p>Registrado el <span className='font-semibold dark:font-medium text-black dark:text-white'>{formattedCreatedAt}</span></p>
            <p>Registrado por <span className='font-semibold dark:font-medium text-black dark:text-white'>{client.createdBy}</span></p>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Button className='bg-white text-black border border-black col-span-2 font-semibold'>
              <ClipboardList size={20} />
              Ver historial del cliente
            </Button>
            <Button onClick={() => setIsSumPaymentModalOpen(!isSumPaymentModalOpen)} className='bg-success col-span-2 text-white'>
              <CircleDollarSign size={20} />
              Sumar pago
            </Button>
            <Button onClick={() => setIsDeleteClientModalOpen(!isDeleteClientModalOpen)} className='bg-secondary text-white'>
              <UserMinus size={20} />
              Eliminar cliente
            </Button>
            <Button className='text-white' onClick={() => setIsEditClientModalOpen(!isEditClientModalOpen)}>
              <UserPenIcon size={20} />
              Editar Información
            </Button>
          </div>
        </div>
      </div>
      {
        isEditClientModalOpen &&
          <ClientModal closeModal={() => setIsEditClientModalOpen(!isEditClientModalOpen)} action='edit' client={client} />
      }
      {
        isDeleteClientModalOpen &&
          <ConfirmModal
            onCancel={() => setIsDeleteClientModalOpen(!isDeleteClientModalOpen)}
            client={client}
            title={`Eliminar a ${client.firstName}`}
            confirmText='Si, estoy seguro'
          >
            ¿Está seguro que desea eliminar a <span className='font-semibold'>{client.firstName + ' ' + client.lastName}</span>? Esta acción es irreversible.
          </ConfirmModal>
      }
      {
        isSumPaymentModalOpen &&
          <SumPaymentModal client={client} closeModal={() => setIsSumPaymentModalOpen(!isSumPaymentModalOpen)} />
      }
    </BackgroundModal>
  )
}
