import { Navigate } from 'react-router-dom';
import type { JSX } from 'react/jsx-runtime';
import { useAuthenticationContext } from '../../hooks/context/useAuthenticationContext';

export default function TherapistGuard({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, isAuthLoading } = useAuthenticationContext();

  if (isAuthLoading) {
    return null;
  }

  if (user?.role !== 'THERAPIST') {
    return <Navigate to="/loginTherapist" replace />;
  }

  return children;
}
