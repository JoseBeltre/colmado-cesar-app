import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'

export function Home () {
  const { user } = useContext(UserContext)
  return (
    <div>
      Callate Juan Cal'lo:
      {user.token}
      <Link to='./auth/login'>Mangoo</Link>
    </div>
  )
}
