import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';
import { useAuthenticationContext } from '../../hooks/context/useAuthenticationContext';

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const { user, isAuthLoading } = useAuthenticationContext();

  if (isAuthLoading) {
    return null;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/loginAdmin" replace />;
  }

  return children;
}
