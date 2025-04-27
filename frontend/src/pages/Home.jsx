import { useProtectedRoute } from '../hooks/useProtectedRoute'
import Logotipo from '../components/Logotipo'
import { useDarkMode } from '../hooks/useDarkMode'
import { ChartColumn, ChevronRight, ClipboardList, NotebookTabs, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home () {
  const { isDark } = useDarkMode()
  useProtectedRoute()
  return (
    <>
      <header className='h-20 py-4'>
        <Logotipo width='100%' height='100%' fill={isDark ? '#fff' : '#327CEC'} />
      </header>
      <main className='px-5 flex flex-col gap-4'>
        <section className='bg-white/10 p-4 rounded-xl border border-white/20'>
          <div className='mb-3'>
            <p className='font-extralight leading-4'>Monto mes en curso</p>
            <h2 className='text-4xl text-white'>$240,000</h2>
          </div>
          <div>
            <p className='font-extralight leading-4'>Cierre del día anterior</p>
            <h2 className='text-4xl text-white'>$42,050</h2>
          </div>
        </section>
        <section className='flex flex-col gap-4'>
          <Link className='flex justify-between text-[#a9a9a9] bg-white/10 p-3 h-12 rounded-xl border border-white/20 overflow-hidden hover:border-primary hover:bg-primary/30 transition-all'>
            <div className='relative w-10'>
              <NotebookTabs className='absolute -top-4 inherit' width='60px' height='80px' />
            </div>
            <p className='text-white/80'>El Cartón</p>
            <ChevronRight />
          </Link>
          <Link className='flex justify-between text-[#a9a9a9] bg-white/10 p-3 h-12 rounded-xl border border-white/20 overflow-hidden hover:border-primary hover:bg-primary/30 transition-all'>
            <div className='relative w-10'>
              <ClipboardList className='absolute -top-4 inherit' width='60px' height='80px' />
            </div>
            <p className='text-white/80'>Historial</p>
            <ChevronRight />
          </Link>
          <Link className='flex justify-between text-[#a9a9a9] bg-white/10 p-3 h-12 rounded-xl border border-white/20 overflow-hidden hover:border-primary hover:bg-primary/30 transition-all'>
            <div className='relative w-10'>
              <UserRound className='absolute -top-4 inherit' width='60px' height='80px' />
            </div>
            <p className='text-white/80'>Clientes</p>
            <ChevronRight />
          </Link>
          <Link className='flex justify-between text-[#a9a9a9] bg-white/10 p-3 h-12 rounded-xl border border-white/20 overflow-hidden hover:border-primary hover:bg-primary/30 transition-all'>
            <div className='relative w-10'>
              <ChartColumn className='absolute -top-4 inherit' width='60px' height='80px' />
            </div>
            <p className='text-white/80'>Crear Reporte</p>
            <ChevronRight />
          </Link>
        </section>
      </main>
    </>
  )
}
