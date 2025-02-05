import AdminMain from '../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminInsurancePageMainProps {
  windowWidth: number;
}

export default function AdminInsurancePageMain({
  windowWidth,
}: AdminInsurancePageMainProps) {
  return <AdminMain isAdminInsuranceMain windowWidth={windowWidth} />;
}
