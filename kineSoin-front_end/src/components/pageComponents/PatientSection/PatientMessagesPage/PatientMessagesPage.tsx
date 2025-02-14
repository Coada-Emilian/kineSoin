import PrivateMain from '../../../standaloneComponents/PrivateSection/PatientSection/PrivateMain';

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
