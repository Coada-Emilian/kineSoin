/**
 * @function PatientLoginMain
 *
 * The main component for the patient login page, which includes three primary sections:
 * - A form section (`PatientLoginFormSection`) for user authentication.
 * - A header section (`PublicHeadBand`) for displaying the site's header or introduction.
 * - A description section (`PatientLoginDescriptionSection`) for providing information and context specific to patient login.
 *
 * This component organizes and renders the various sections of the patient login page.
 *
 * @returns {JSX.Element} - The layout for the patient login page consisting of a form, header, and description sections.
 *
 * @example
 * <PatientLoginMain />
 */

import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import PatientLoginDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/loginDescriptionSections/PatientLoginDescriptionSection';
import PatientLoginFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/loginFormSections/PatientLoginFormSection';

export default function PatientLoginMain() {
  return (
    <>
      <PatientLoginFormSection />

      <PublicHeadBand />

      <PatientLoginDescriptionSection />
    </>
  );
}
