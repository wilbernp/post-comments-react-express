import { useAppSelector } from '@/redux/hooks'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes() {
    const {email} = useAppSelector(state => state.user)
      return email.length?<Outlet/>:<Navigate to="/auth/login" />
}
