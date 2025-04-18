import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { AuthLayout } from './pages/auth/AuthLayout'
import { AccountActivation } from './pages/auth/AccountActivation'
import { UserProvider } from './context/userContext'
import { ProtectedRoute } from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (<ProtectedRoute><Home /></ProtectedRoute>)
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/auth/activate',
    element: <AccountActivation />
  },
  {
    path: '/auth/deny',
    element: <AccountActivation action='deny' />
  }
])

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
)
