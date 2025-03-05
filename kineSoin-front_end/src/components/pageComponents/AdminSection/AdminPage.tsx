import AdminMain2 from './AdminMain2';

interface AdminPageProps {
  entityType: 'therapist' | 'patient' | 'affliction' | 'medic' | 'insurance';
}

export default function AdminPage({ entityType }: AdminPageProps) {
  return <AdminMain2 entityType={entityType} />;
}
