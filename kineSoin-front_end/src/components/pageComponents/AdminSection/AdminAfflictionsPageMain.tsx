import AdminMain from '../../standaloneComponents/AdminSection/AdminMain.tsx';

interface AdminAfflictionsPageMainProps {
  windowWidth: number;
}

export default function AdminAfflictionsPageMain({
  windowWidth,
}: AdminAfflictionsPageMainProps) {
  return <AdminMain isAdminAfflictionsMain windowWidth={windowWidth} />;
}
