import { useProtectedRoute } from '../hooks/useProtectedRoute'
import Logotipo from '../components/Logotipo'
import { useDarkMode } from '../hooks/useDarkMode'
import { ChartPie, ClipboardList, NotebookTabs, UserIcon } from 'lucide-react'
import { MenuItem } from '../components/MenuItem'

const links = [
  {
    text: 'El Cartón',
    to: '/carton',
    icon: <NotebookTabs className='absolute -top-5 inherit' width='60px' height='80px' />
  },
  {
    text: 'Clientes',
    to: '/clientes',
    icon: <UserIcon className='absolute -top-5 inherit' width='60px' height='80px' />
  },
  {
    text: 'Historial',
    to: '/historial',
    icon: <ClipboardList className='absolute -top-5 inherit' width='60px' height='80px' />
  },
  {
    text: 'Crear reporte',
    to: '/reporte',
    icon: <ChartPie className='absolute -top-5 inherit' width='60px' height='80px' />
  }
]

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
          {
            links.map((link, index) =>
              <MenuItem key={index} to={link.to} icon={link.icon} text={link.text} />
            )
          }
        </section>
      </main>
    </>
  )
}
