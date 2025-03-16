/**
 * @function PatientRegisterMain
 *
 * The main component for the patient registration page. It includes the following sections:
 * - A context provider (`PatientRegisterContextProvider`) to manage the state and logic for patient registration.
 * - A form section (`PatientRegisterFormSection`) for collecting registration details from the user.
 * - A header section (`PublicHeadBand`) for displaying the site header or introductory content.
 * - A description section (`PatientRegisterDescriptionSection`) to provide context and explanation for patient registration.
 *
 * This component wraps all the necessary sections related to patient registration and ensures state management through context.
 *
 * @returns {JSX.Element} - The layout for the patient registration page consisting of a form, header, and description sections.
 *
 * @example
 * <PatientRegisterMain />
 */

import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';
import { PatientRegisterContextProvider } from '../../../../utils/contexts/PatientRegisterContext';
import PatientRegisterFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/registerFormSections/PatientRegisterFormSection';
import PatientRegisterDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/PatientRegisterDescriptionSection';

export default function PatientRegisterMain() {
  return (
    <>
      <PatientRegisterContextProvider>
        <PatientRegisterFormSection />

        <PublicHeadBand />

        <PatientRegisterDescriptionSection />
      </PatientRegisterContextProvider>
    </>
  );
}
