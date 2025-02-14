import PrivateMain from '../../standaloneComponents/PrivateSection/PatientSection/PrivateMain';

interface PatientMessagesPageMainProps {
  windowWidth?: number;
}

export default function PatientMessagesPageMain({
  windowWidth,
}: PatientMessagesPageMainProps) {
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
