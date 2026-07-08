import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';
import { useAuthentificationContext } from '../../hooks/context/useAuthentificationContext';

export default function TherapistGuard({
  children,
}: {
  children: JSX.Element;
}) {
  const { isTherapistAuthenticated, therapistProfileToken, isAuthLoading } =
    useAuthentificationContext();

  if (isAuthLoading) {
    return null;
  }

  if (!isTherapistAuthenticated || !therapistProfileToken) {
    return <Navigate to="/loginTherapist" replace />;
  }

  return children;
}
