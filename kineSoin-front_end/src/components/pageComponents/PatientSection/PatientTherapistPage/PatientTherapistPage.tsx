import PrivateMain from '../../../standaloneComponents/PrivateSection/PrivateMain/PrivateMain';

interface PatientTherapistPageProps {
  windowWidth?: number;
}

export default function PatientTherapistPage({
  windowWidth,
}: PatientTherapistPageProps) {
  return (
    <PrivateMain
      isPatientMain
      windowWidth={windowWidth}
      isPatientTherapistPage
    />
  );
}
