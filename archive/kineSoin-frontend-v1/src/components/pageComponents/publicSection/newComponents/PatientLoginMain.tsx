import PublicHeadBand from '../../../standaloneComponents/publicSection/PublicHeadBand';
import PatientLoginDescriptionSection from '../../../standaloneComponents/publicSection/newComponents/descriptionSection/loginDescriptionSection/PatientLoginDescriptionSection';
import PatientLoginFormSection from '../../../standaloneComponents/publicSection/newComponents/formSection/loginFormSection/PatientLoginFormSection';

export default function PatientLoginMain() {
  return (
    <>
      <PatientLoginFormSection />

      <PublicHeadBand />

      <PatientLoginDescriptionSection />
    </>
  );
}
