import PrivateMain from '../../standaloneComponents/PrivateSection/PatientSection/PrivateMain';

interface PatientTherapistPageMainProps {
  windowWidth?: number;
}

export default function PatientTherapistPageMain({
  windowWidth,
}: PatientTherapistPageMainProps) {
  return (
    <PrivateMain
      isPatientMain
      windowWidth={windowWidth}
      isPatientTherapistPage
    />
  );
}
