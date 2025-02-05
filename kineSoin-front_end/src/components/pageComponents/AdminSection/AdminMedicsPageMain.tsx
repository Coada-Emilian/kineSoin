import AdminMain from '../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminMedicsPageMainProps {
  windowWidth: number;
}

export default function AdminMedicsPageMain({
  windowWidth,
}: AdminMedicsPageMainProps) {
  return <AdminMain isAdminMedicsMain windowWidth={windowWidth} />;
}
