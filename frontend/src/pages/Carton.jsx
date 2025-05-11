import { NavHeader } from '../components/NavHeader'
import { useProtectedRoute } from '../hooks/useProtectedRoute'

export function Carton () {
  useProtectedRoute()
  return (
    <>
      <NavHeader>
        El Cartón
      </NavHeader>
      <main className='flex flex-col p-3 min-h-[calc(100dvh_-_52px)]'>
        <p className='text-black dark:text-white leading-3 mb-3'>Transacciones en el transcurso del día.</p>
        <section className='bg-white rounded-2xl border-1 border-[#C7C7C7] p-4 pb-2 dark:bg-white/10 dark:border-white/20'>
          <div className='flex justify-between font-light text-black/70 leading-2 dark:text-white/50'>
            <p>Deudas (Fiao)</p>
            <p>Cant.</p>
          </div>
          <div className='flex justify-between text-3xl dark:text-white'>
            <p>$12,000</p>
            <p>4</p>
          </div>
          <div className='flex gap-1 mt-1.5'>
            <button className='bg-black/30 text-white rounded-full flex-1 p-1 text-sm cursor-pointer hover:bg-black/50 transition-colors'>Ver desglose</button>
            <button className='bg-primary text-white rounded-full flex-1 p-1 text-sm cursor-pointer hover:bg-[#3462bc] transition-colors'>Agregar</button>
          </div>
        </section>
        <button className='mt-auto p-2 rounded-md bg-secondary text-white font-bold cursor-pointer'>
          Cerrar día
        </button>
      </main>
    </>
  )
}
