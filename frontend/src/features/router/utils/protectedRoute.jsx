import { Navigate } from 'react-router'
import { useLogin } from '../../shared/store/useLogin'

function ProtectedRoute({ children, allowedRoles = ['user', 'admin', 'driver'] }) {
  const { user, loading } = useLogin()

  if (loading) {
    return <div className="loading-state"><span className="loading-spinner" />Loading account...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
