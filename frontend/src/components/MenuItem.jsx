import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MenuItem ({ icon, text, to }) {
  return (
    <Link
      to={to}
      className='flex justify-between hover:text-primary text-[#838383] dark:text-[#a9a9a9] bg-white dark:bg-white/10 p-3 h-12 rounded-xl border border-white/20 overflow-hidden hover:border-primary hover:bg-primary/30 transition-all'
    >
      <div className='relative w-10'>
        {icon}
      </div>
      <p className='text-black/70 dark:text-white/80'>{text}</p>
      <ChevronRight />
    </Link>
  )
}
