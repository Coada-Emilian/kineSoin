import AdminMain from '../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminInsurancesPageMainProps {
  windowWidth: number;
}

export default function AdminInsurancesPageMain({
  windowWidth,
}: AdminInsurancesPageMainProps) {
  return <AdminMain isAdminInsurancesMain windowWidth={windowWidth} />;
}
