import PrivateMain from '../../standaloneComponents/PrivateSection/PatientSection/PrivateMain';

interface PatientAppointmentsPageMainProps {
  windowWidth?: number;
}

export default function PatientAppointmentsPageMain({
  windowWidth,
}: PatientAppointmentsPageMainProps) {
  return (
    <PrivateMain
      isPatientMain
      isPatientAppointmentsMain
      windowWidth={windowWidth}
    />
  );
}
