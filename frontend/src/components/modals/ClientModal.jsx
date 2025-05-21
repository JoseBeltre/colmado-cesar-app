import { Save } from 'lucide-react'
import { BackgroundModal } from './BackgroundModal'
import { Button } from '../Button'
import { Input } from '../Input'
import { useEffect, useState } from 'react'

export function ClientModal ({ closeModal, action = 'add', client }) {
  const isEditing = action === 'edit'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    aka: '',
    phoneNumber: '',
    address: ''
  })

  useEffect(() => {
    if (isEditing) {
      const { firstName, lastName, aka, phoneNumber, address } = client
      setFormData({
        firstName,
        lastName,
        aka,
        phoneNumber,
        address
      })
    }
  }, [isEditing, client])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <BackgroundModal closeModal={closeModal}>
      <div className='theme-container w-full max-w-2xl p-0 overflow-hidden border-none z-50'>
        <header className='flex justify-between items-center bg-primary dark:bg-white/10 font-bold dark:font-medium text-white p-3 py-1 pt-2'>
          <h5>
            {
              isEditing ? 'Editar información' : 'Agregar nuevo cliente'
            }
          </h5>
        </header>
        <div className='grid gap-5 p-3'>
          <Input
            name='firstName'
            title='Nombres'
            placeholder='ej. Pedro Luciano'
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            name='lastName'
            title='Apellidos'
            placeholder='ej. Marte'
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            name='aka'
            title='Apodo'
            placeholder='ej. Moreno'
            value={formData.aka}
            onChange={handleChange}
          />
          <Input
            name='phoneNumber'
            title='Numero de telefono'
            placeholder='ej. 8298434442'
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            name='address'
            title='Dirección'
            placeholder='ej. Calle Francisco A. Caamaño'
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <footer className='p-3 flex gap-2 justify-end'>
          <Button onClick={closeModal} className='bg-transparent text-secondary underline flex-none'>
            Cancelar
          </Button>
          <Button className='bg-success flex-none px-6 font-bold text-white'>
            <Save size={20} />
            Guardar
          </Button>
        </footer>
      </div>
    </BackgroundModal>
  )
}
