import PrivateMain from '../../../standaloneComponents/PrivateSection/PatientSection/Modals/PrivateMain';

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
