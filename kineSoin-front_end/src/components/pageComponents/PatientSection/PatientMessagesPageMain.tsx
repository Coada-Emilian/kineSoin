import PrivateMain from '../../standaloneComponents/PrivateSection/PrivateMain';

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
