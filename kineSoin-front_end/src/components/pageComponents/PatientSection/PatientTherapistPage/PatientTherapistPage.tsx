import PrivateMain from '../../../standaloneComponents/PrivateSection/PatientSection/Modals/PrivateMain';

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
