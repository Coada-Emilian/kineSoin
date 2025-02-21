import AdminMain from '../../../standaloneComponents/AdminSection/AdminMain/AdminMain.tsx';

interface AdminTherapistPageMainProps {
  windowWidth: number;
}

export default function AdminTherapistPageMain({
  windowWidth,
}: AdminTherapistPageMainProps) {
  return <AdminMain isAdminTherapistMain windowWidth={windowWidth} />;
}
