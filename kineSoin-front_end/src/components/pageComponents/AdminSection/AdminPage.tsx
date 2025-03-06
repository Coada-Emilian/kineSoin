import { IEntityTypes } from '../../../@types/componentTypes';
import AdminMain2 from './AdminMain2';

interface AdminPageProps {
  entityType: IEntityTypes;
}

export default function AdminPage({ entityType }: AdminPageProps) {
  return <AdminMain2 entityType={entityType} />;
}
