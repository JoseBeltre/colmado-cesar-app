import { useState } from 'react'
import { CartonItemDetails } from './CartonItemDetails'

export function CartonItem ({ amountTitle, amount, quantity, items }) {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <section>
      <article className='bg-white rounded-2xl border-1 border-[#C7C7C7] p-4 pb-2 dark:bg-white/10 dark:border-white/20'>
        <div className='flex justify-between font-light text-black/70 leading-2 dark:text-white/50'>
          <p>{amountTitle}</p>
          <p>Cant.</p>
        </div>
        <div className='flex justify-between text-3xl dark:text-white'>
          <p>${amount}</p>
          <p>{quantity}</p>
        </div>
        <div className='flex gap-1 mt-1.5'>
          <button onClick={() => setShowDetails(!showDetails)} className='bg-black/30 text-white rounded-full flex-1 p-1 text-sm cursor-pointer hover:bg-black/50 transition-colors'>Ver desglose</button>
          <button className='bg-primary text-white rounded-full flex-1 p-1 text-sm cursor-pointer hover:bg-[#3462bc] transition-colors'>Agregar</button>
        </div>
      </article>
      {showDetails &&
        <div className='mt-3 grid gap-2 mx-2'>
          {
            items.map((item) =>
              <CartonItemDetails key={item.id} name={item.name} amount={item.amount} />
            )
          }
        </div>}
    </section>
  )
}
