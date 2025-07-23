import type React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { RootState } from "../../store"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ("client" | "therapist" | "secretary")[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
