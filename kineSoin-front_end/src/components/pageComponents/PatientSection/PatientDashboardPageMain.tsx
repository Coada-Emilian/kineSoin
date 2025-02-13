import PrivateMain from '../../standaloneComponents/PrivateSection/PatientSection/Modals/PrivateMain';

interface PatientDashboardProps {
  windowWidth?: number;
}

export default function PatientDashboard({
  windowWidth,
}: PatientDashboardProps) {
  return (
    <PrivateMain
      isPatientDashboardMain
      isPatientMain
      windowWidth={windowWidth}
    />
  );
}
