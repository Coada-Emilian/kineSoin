import PrivateMain from '../../standaloneComponents/PrivateSection/PrivateMain';

interface PatientDetailsPageMainProps {
  windowWidth?: number;
}
export default function PatientDetailsPageMain({
  windowWidth,
}: PatientDetailsPageMainProps) {
  return (
    <PrivateMain windowWidth={windowWidth} isPatientMain isPatientDetailsMain />
  );
}
