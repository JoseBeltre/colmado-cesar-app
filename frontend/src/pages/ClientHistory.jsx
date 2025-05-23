import { useParams } from 'react-router-dom'
import { NavHeader } from '../components/NavHeader'
import { clients } from '../../mocks/clients.js'
import { transactions } from '../../mocks/transactions.js'
import { ClientHistoryItem } from '../components/ClientHistoryItem.jsx'
export function ClientHistory () {
  const { id } = useParams()
  const client = clients[id]
  return (
    <>
      <NavHeader>
        Historial de {client.firstName}
      </NavHeader>
      <main className='p-3 grid gap-2'>
        <header>
          <div className='flex gap-1 mt-1'>
            <button className='theme-container p-1 px-2 text-sm text-black dark:text-white/40 cursor-pointer'>Más reciente primero</button>
            <button className='theme-container p-1 px-2 text-sm text-black dark:text-white/40 cursor-pointer'>Mayor - Menor</button>
          </div>
        </header>
        <section className='grid gap-2'>
          {
            transactions.map(transaction =>
              <ClientHistoryItem key={transaction.id} date={transaction.addedAt} amount={transaction.amount} />
            )
          }
        </section>
      </main>
    </>
  )
}
