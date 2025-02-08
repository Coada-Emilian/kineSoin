import AdminMain from '../../../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminPatientPageMainProps {
  windowWidth: number;
}

export default function AdminPatientPageMain({
  windowWidth,
}: AdminPatientPageMainProps) {
  return <AdminMain isAdminPatientMain windowWidth={windowWidth} />;
}
