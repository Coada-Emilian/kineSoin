import PrivateMain from "../../../standaloneComponents/PrivateSection/PrivateMain/PrivateMain";

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
