import UserHeadband from '../UserHeadband/UserHeadband';

interface PrivateMainProps {
  isPatientDashboardMain?: boolean;
}

export default function PrivateMain({
  isPatientDashboardMain,
}: PrivateMainProps) {
  return <UserHeadband />;
}
