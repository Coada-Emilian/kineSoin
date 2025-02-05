import PrivateMain from '../../../standaloneComponents/PrivateSection/PrivateMain/PrivateMain';

interface PatientPrescriptionPageProps {
  windowWidth?: number;
}

export default function PatientPrescriptionPage({
  windowWidth,
}: PatientPrescriptionPageProps) {
  return (
    <PrivateMain
      isPatientMain
      isPatientPrescriptionMain
      windowWidth={windowWidth}
    />
  );
}
