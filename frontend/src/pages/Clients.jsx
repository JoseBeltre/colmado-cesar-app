import { UserPlus, UserSearch } from 'lucide-react'
import { NavHeader } from '../components/NavHeader'
import { useState } from 'react'
import { ClientInfoModal } from '../components/ClientInfoModal'
import { ClientItem } from '../components/ClientItem'
import { clients } from '../../mocks/clients'
import { ClientModal } from '../components/ClientModal'
import { Button } from '../components/Button'
export function Clients () {
  const [isClientInfoModalOpen, setIsClientInfoModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false)
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)

  const handleClientInfoModal = (client) => {
    setSelectedClient(client)
    setIsClientInfoModalOpen(!isClientInfoModalOpen)
  }
  return (
    <>
      <NavHeader>
        Clientes
        <Button onClick={() => setIsAddClientModalOpen(!isAddClientModalOpen)} className='text-primary bg-white rounded-md ms-auto flex-none p-1.5'>
          <UserPlus size={20} />
        </Button>
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
          {
            clients.map(client => {
              return (
                <ClientItem
                  key={client.id}
                  firstName={client.firstName}
                  lastName={client.lastName}
                  aka={client.aka}
                  balance={client.balance}
                  onClick={() => handleClientInfoModal(client)}
                />
              )
            })
          }
        </div>
        {
          isClientInfoModalOpen &&
            <ClientInfoModal closeModal={() => handleClientInfoModal(null)} client={selectedClient} openEdit={() => setIsEditClientModalOpen(!isEditClientModalOpen)} />
        }
        {
          isAddClientModalOpen &&
            <ClientModal closeModal={() => setIsAddClientModalOpen(!isAddClientModalOpen)} />
        }
        {
          isEditClientModalOpen &&
            <ClientModal closeModal={() => setIsEditClientModalOpen(!isEditClientModalOpen)} action='edit' client={selectedClient} />
        }
      </main>z
    </>
  )
}
