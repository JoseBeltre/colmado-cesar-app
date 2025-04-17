import { useContext } from 'react'
import { UserContext } from '../context/userContext'

export function Home () {
  const { user } = useContext(UserContext)
  console.log(user)
  return (
    <div>
      Callate Juan Cal'lo:
      {user.token}
    </div>
  )
}
