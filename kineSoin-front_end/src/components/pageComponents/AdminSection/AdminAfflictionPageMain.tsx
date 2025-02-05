import AdminMain from '../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminAfflictionPageMainProps {
  windowWidth: number;
}

export default function AdminAfflictionPageMain({
  windowWidth,
}: AdminAfflictionPageMainProps) {
  return <AdminMain isAdminAfflictionMain windowWidth={windowWidth} />;
}
