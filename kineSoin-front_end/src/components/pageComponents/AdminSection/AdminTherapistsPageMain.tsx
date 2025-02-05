import AdminMain2 from '../standaloneComponents/AdminSection/AdminMain2.tsx';

interface AdminTherapistsPageMainProps {
  windowWidth: number;
}

export default function AdminTherapistsPageMain({
  windowWidth,
}: AdminTherapistsPageMainProps) {
  return <AdminMain2 isAdminTherapistsMain windowWidth={windowWidth} />;
}
