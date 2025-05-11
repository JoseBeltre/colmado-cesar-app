import { CartonItem } from '../components/CartonItem'
import { NavHeader } from '../components/NavHeader'
import { useProtectedRoute } from '../hooks/useProtectedRoute'

export function Carton () {
  useProtectedRoute()

  const debts = [
    {
      id: 1,
      name: 'Sosobra',
      amount: 320
    },
    {
      id: 1,
      name: 'El paco',
      amount: 320
    },
    {
      id: 1,
      name: 'Fulana',
      amount: 320
    }
  ]
  return (
    <>
      <NavHeader>
        El Cartón
      </NavHeader>
      <main className='flex flex-col p-3 gap-3 min-h-[calc(100dvh_-_52px)]'>
        <p className='text-black dark:text-white leading-3 mb-3'>Transacciones en el transcurso del día.</p>
        <CartonItem amountTitle='Fiao' amount={3000} quantity={5} items={debts} />
        <CartonItem amountTitle='Mercancía' amount={5000} quantity={5} items={debts} />
        <CartonItem amountTitle='Gastos' amount={1000} quantity={5} items={debts} />
        <button className='mt-auto p-2 rounded-md bg-secondary text-white font-bold cursor-pointer'>
          Cerrar día
        </button>
      </main>
    </>
  )
}
