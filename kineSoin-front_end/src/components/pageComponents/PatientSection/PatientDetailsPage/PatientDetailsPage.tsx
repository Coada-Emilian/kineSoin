import PrivateMain from '../../../standaloneComponents/PrivateSection/PrivateMain/PrivateMain';

interface PatientDetailsPageProps {
  windowWidth?: number;
}
export default function PatientDetailsPage({
  windowWidth,
}: PatientDetailsPageProps) {
  return (
    <PrivateMain windowWidth={windowWidth} isPatientMain isPatientDetailsMain />
  );
}
