import PrivateMain from '../../../standaloneComponents/PrivateSection/PatientSection/Modals/PrivateMain';

interface PatientPrescriptionPageMainProps {
  windowWidth?: number;
}

export default function PatientPrescriptionPageMain({
  windowWidth,
}: PatientPrescriptionPageMainProps) {
  return (
    <PrivateMain
      isPatientMain
      isPatientPrescriptionMain
      windowWidth={windowWidth}
    />
  );
}
