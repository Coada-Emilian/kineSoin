import AdminMain from '../../../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminPatientsPageMainProps {
  windowWidth: number;
}

export default function AdminPatientsPageMain({
  windowWidth,
}: AdminPatientsPageMainProps) {
  return <AdminMain isAdminPatientsMain windowWidth={windowWidth} />;
}
