import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';
import { useAuthentificationContext } from '../../hooks/context/useAuthentificationContext';

export default function AdminGuard({ children }: { children: JSX.Element }) {
  const { isAdminAuthenticated, adminProfileToken } =
    useAuthentificationContext();

  if (!isAdminAuthenticated || !adminProfileToken) {
    return <Navigate to="/loginAdmin" replace />;
  }

  return children;
}
