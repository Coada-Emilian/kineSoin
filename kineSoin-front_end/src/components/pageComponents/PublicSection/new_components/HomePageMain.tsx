/**
 * @function HomePageMain
 *
 * The main component for the home page, which includes three primary sections:
 * - A form section (`HomePageFormSection`) for user interactions.
 * - A header section (`PublicHeadBand`) for displaying the site's header or introduction.
 * - A description section (`HomePageDescriptionSection`) for providing more information or context to users.
 *
 * This component organizes and renders the various sections on the home page.
 *
 * @returns {JSX.Element} - The home page layout consisting of form, header, and description sections.
 *
 * @example
 * <HomePageMain />
 */

import HomePageDescriptionSection from '../../../standaloneComponents/PublicSection/new_components/descriptionSections/HomePageDescriptionSection';
import HomePageFormSection from '../../../standaloneComponents/PublicSection/new_components/formSections/HomePageFormSection';
import PublicHeadBand from '../../../standaloneComponents/PublicSection/PublicHeadBand';

export default function HomePageMain() {
  return (
    <>
      <HomePageFormSection />

      <PublicHeadBand />

      <HomePageDescriptionSection />
    </>
  );
}
