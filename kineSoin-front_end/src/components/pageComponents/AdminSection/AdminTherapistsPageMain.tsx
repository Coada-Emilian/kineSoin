import AdminMain from '../../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminTherapistsPageMainProps {
  windowWidth: number;
}

export default function AdminTherapistsPageMain({
  windowWidth,
}: AdminTherapistsPageMainProps) {
  return <AdminMain isAdminTherapistsMain windowWidth={windowWidth} />;
}
