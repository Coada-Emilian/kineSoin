import AdminMain2 from './AdminMain2';
import { GlobalAdminContextProvider } from '../../../utils/contexts/GlobalAdminContext';

interface AdminPageProps {
  entityType: 'therapist' | 'patient' | 'affliction' | 'medic' | 'insurance';
}

export default function AdminPage({ entityType }: AdminPageProps) {
  return (
    <GlobalAdminContextProvider>
      <AdminMain2 entityType={entityType} />
    </GlobalAdminContextProvider>
  );
}
