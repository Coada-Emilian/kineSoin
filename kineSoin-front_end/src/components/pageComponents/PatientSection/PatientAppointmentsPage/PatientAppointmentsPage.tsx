import PrivateMain from '../../standaloneComponents/PrivateMain/PrivateMain';

interface PatientAppointmentsPageProps {
  windowWidth?: number;
}

export default function PatientAppointmentsPage({
  windowWidth,
}: PatientAppointmentsPageProps) {
  return (
    <PrivateMain
      isPatientMain
      isPatientAppointmentsMain
      windowWidth={windowWidth}
    />
  );
}
