import PrivateMain from '../../standaloneComponents/PrivateSection/PrivateMain';

interface TherapistDashboardProps {
  windowWidth?: number;
}

export default function TherapistDashboard({
  windowWidth,
}: TherapistDashboardProps) {
  return (
    <PrivateMain
      isTherapistDashboardMain
      isTherapistMain
      windowWidth={windowWidth}
    />
  );
}
