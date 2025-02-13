import PrivateMain from '../../../standaloneComponents/PrivateSection/PatientSection/Modals/PrivateMain';

interface PatientMessagesPageProps {
  windowWidth?: number;
}

export default function PatientMessagesPage({
  windowWidth,
}: PatientMessagesPageProps) {
  return (
    <>
      <PrivateMain
        isPatientMain
        isPatientMessagesMain
        windowWidth={windowWidth}
      />
    </>
  );
}
