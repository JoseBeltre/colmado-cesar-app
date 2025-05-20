import { Save } from 'lucide-react'
import { BackgroundModal } from './BackgroundModal'
import { Button } from './Button'
import { Input } from './Input'

export function AddClientModal ({ closeModal }) {
  return (
    <BackgroundModal closeModal={closeModal}>
      <div className='theme-container w-full max-w-2xl p-0 overflow-hidden border-none z-50'>
        <header className='flex justify-between items-center bg-primary dark:bg-white/10 font-bold dark:font-medium text-white p-3 py-1 pt-2'>
          <h5>Agregar cliente nuevo</h5>
        </header>
        <div className='grid gap-5 p-3'>
          <Input title='Nombres' placeholder='ej. Pedro Luciano' />
          <Input title='Apellidos' placeholder='ej. Marte' />
          <Input title='Apodo' placeholder='ej. Moreno' />
          <Input title='Numero de telefono' placeholder='ej. 8298434442' />
          <Input title='Dirección' placeholder='ej. Calle Francisco A. Caamaño' />
        </div>
        <footer className='p-3 flex gap-2 justify-end'>
          <Button onClick={closeModal} className='bg-transparent text-secondary underline flex-none'>
            Cancelar
          </Button>
          <Button className='bg-success flex-none px-6 font-bold'>
            <Save size={20} />
            Guardar
          </Button>
        </footer>
      </div>
    </BackgroundModal>
  )
}
