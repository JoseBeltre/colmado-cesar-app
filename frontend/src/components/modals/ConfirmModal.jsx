import { Button } from '../Button'
import { BackgroundModal } from './BackgroundModal'

export function ConfirmModal ({ closeModal, onConfirm, title, confirmText = 'Confirmar', children }) {
  return (
    <BackgroundModal closeModal={closeModal}>
      <div className='theme-container grid gap-3 p-0'>
        <header className='flex justify-between items-center bg-primary dark:bg-white/10 font-bold dark:font-medium text-white p-3 py-1 pt-2'>
          <h2>{title}</h2>
        </header>
        <div className='leading-4 px-4'>
          {children}
        </div>
        <footer className='flex gap-2 justify-end mx-4 mb-2'>
          <Button onClick={closeModal} className='bg-transparent text-secondary underline flex-none'>
            Cancelar
          </Button>
          <Button onClick={onConfirm} className='bg-success flex-none p-3 font-bold text-white'>
            {confirmText}
          </Button>
        </footer>
      </div>
    </BackgroundModal>
  )
}
