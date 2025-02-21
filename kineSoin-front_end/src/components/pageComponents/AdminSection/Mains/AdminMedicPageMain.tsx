import AdminMain from '../../../standaloneComponents/AdminSection/AdminMain/AdminMain.tsx';

interface AdminMedicPageMainProps {
  windowWidth: number;
}

export default function AdminMedicPageMain({
  windowWidth,
}: AdminMedicPageMainProps) {
  return <AdminMain isAdminMedicMain windowWidth={windowWidth} />;
}
