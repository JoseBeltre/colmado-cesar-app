import { BackgroundModal } from './BackgroundModal'
import { ConfirmModal } from './ConfirmModal'
import { Input } from '../Input'
import { useState } from 'react'
import { formatCurrency } from '../../utils/utils'

export function SumPaymentModal ({ closeModal, client }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const fullname = client.firstName.split(' ')[0] + ' ' + client.lastName.split(' ')[0]
  const title = <>Sumar pago a <span>{fullname}</span></>
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState('Pago de deuda')

  const debt = client.balance + parseInt(amount)
  const formattedDebt = formatCurrency(debt)
  let personalizedMsg
  if (debt < 0) {
    personalizedMsg = `Esta acción rebajará su deuda a ${formattedDebt}.`
  } else if (debt > 0) {
    personalizedMsg = (client.balance === 0) ? 'Este monto se añadirá a su cuenta.' : `Esta acción saldará su deuda y el colmado le deberá ${formattedDebt}.`
  } else {
    personalizedMsg = 'Esta acción saldará su deuda.'
  }
  return (
    <BackgroundModal closeModal={closeModal}>
      <ConfirmModal
        onCancel={closeModal}
        title={title}
        onConfirm={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
      >
        <div className='grid gap-3'>
          <Input
            name='amount'
            title='Ingresar monto a sumar'
            placeholder='ej. 400'
            value={amount}
            type='number'
            min={1}
            max={5000}
            onChange={e => setAmount(e.target.value)}
          />
          <Input
            name='description'
            title='Concepto'
            placeholder='ej. Pago de deuda.'
            value={description}
            min={1}
            max={5000}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </ConfirmModal>
      {
        isConfirmModalOpen &&
          <ConfirmModal
            onCancel={closeModal}
            title={title}
            onConfirm={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
          >
            ¿Estás seguro que deseas sumarle <span className='font-semibold text-success'>${amount}</span> a {fullname}? {personalizedMsg}
          </ConfirmModal>
      }
    </BackgroundModal>
  )
}
