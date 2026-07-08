import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';
import { useAuthentificationContext } from '../../hooks/context/useAuthentificationContext';

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const { user, isAuthLoading } = useAuthentificationContext();

  if (isAuthLoading) {
    return null;
  }

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/loginAdmin" replace />;
  }

  return children;
}
