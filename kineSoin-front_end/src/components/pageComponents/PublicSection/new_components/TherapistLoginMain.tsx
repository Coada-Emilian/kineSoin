/**
 * @function TherapistLoginMain
 *
 * The main component for the therapist login page. It includes the following sections:
 * - A form section (`TherapistLoginFormSection`) for therapists to enter their login credentials.
 * - A header section (`PublicHeadBand`) for displaying the site header or introductory content.
 * - A description section (`TherapistLoginDescriptionSection`) to provide context and explanation for therapist login.
 *
 * This component brings together the login form, header, and description sections for therapist login functionality.
 *
 * @returns {JSX.Element} - The layout for the therapist login page consisting of a form, header, and description sections.
 *
 * @example
 * <TherapistLoginMain />
 */

import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import TherapistLoginFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/loginFormSections/TherapistLoginFormSection';
import TherapistLoginDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/loginDescriptionSections/TherapistLoginDescriptionSection';

export default function TherapistLoginMain() {
  return (
    <>
      <TherapistLoginFormSection />

      <PublicHeadBand />

      <TherapistLoginDescriptionSection />
    </>
  );
}
