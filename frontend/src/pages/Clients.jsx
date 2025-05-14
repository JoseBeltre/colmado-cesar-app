import { CircleDollarSign, ClipboardList, UserPenIcon, UserSearch, X } from 'lucide-react'
import { NavHeader } from '../components/NavHeader'
import { BackgroundModal } from '../components/BackgroundModal'
import { useState } from 'react'
import { Button } from '../components/Button'
export function Clients () {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  return (
    <>
      <NavHeader>
        Clientes
      </NavHeader>
      <main className='p-3 grid gap-2'>
        <header>
          <div className='theme-container flex gap-2 items-center text-black dark:text-white/40'>
            <UserSearch className='text-inherit' size={20} />
            <input className='focus:outline-none text-black dark:text-white/60' type='search' name='searchClient' id='searchClient' placeholder='Buscar cliente' />
          </div>
          <div className='flex gap-1 mt-1'>
            <button className='theme-container p-1 px-2 text-sm text-black dark:text-white/40 cursor-pointer'>A - Z</button>
            <button className='theme-container p-1 px-2 text-sm text-black dark:text-white/40 cursor-pointer'>Mayor - Menor</button>
          </div>
        </header>
        <div className='grid gap-2'>
          <div onClick={() => setIsAddModalOpen(!isAddModalOpen)} className='theme-container px-3 py-4 flex justify-between items-center cursor-pointer'>
            <div className=''>
              <h5 className='text-black dark:text-white text-lg leading-4'>Pablo Pimentel Rojas</h5>
              <h6 className='text-black dark:text-white/50 leading-3'>Jose Maestro</h6>
            </div>
            <h5 className='text-xl text-black dark:text-white'>
              - $1400
            </h5>
          </div>
          <div onClick={() => setIsAddModalOpen(!isAddModalOpen)} className='theme-container px-3 py-4 flex justify-between items-center cursor-pointer'>
            <div className=''>
              <h5 className='text-black dark:text-white text-lg leading-4'>Pablo Pimentel Rojas</h5>
              <h6 className='text-black dark:text-white/50 leading-3'>Jose Maestro</h6>
            </div>
            <h5 className='text-xl text-black dark:text-white'>
              - $1400
            </h5>
          </div>
        </div>
        {
          isAddModalOpen &&
            <BackgroundModal closeModal={() => setIsAddModalOpen(!isAddModalOpen)}>
              <div className='theme-container w-full max-w-2xl p-0 overflow-hidden border-none z-50'>
                <header className='flex justify-between items-center bg-primary dark:bg-white/10 font-bold dark:font-medium text-white p-3 py-1 pt-2'>
                  <h5>Información del cliente</h5>
                  <X className='cursor-pointer' onClick={() => setIsAddModalOpen(!isAddModalOpen)} />
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
                      <UserPenIcon size={20} />
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
        }
      </main>
    </>
  )
}
