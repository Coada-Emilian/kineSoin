/**
 * @component TitleOutputRefactor
 *
 * This component displays the title of the section in the admin profile details page. It dynamically selects the appropriate title based on the `entityType` prop.
 *
 * The `entityType` prop represents the type of entity whose details are being inspected, such as therapist, patient, or another entity. This prop is used to match the correct title from the `tableTitleEntityDetails` array.
 *
 * The component looks for the matching entity in `tableTitleEntityDetails` and displays its corresponding title with the text "Inspection" as a prefix. If no match is found, it will not render a title.
 *
 * @param {string} entityType - The type of entity whose title needs to be displayed.
 *
 * @returns {JSX.Element} The component displays the title for the inspection section based on the `entityType` prop.
 *
 * @example
 * <TitleOutputRefactor entityType="therapist" />
 */

import { tableTitleEntityDetails } from '../../../../../../../../../utils/constants/admin_section/admin_profile_details/TableTitleEntityDetails';

interface TitleOutputRefactorProps {
  entityType: string;
}

export default function TitleOutputRefactor({
  entityType,
}: TitleOutputRefactorProps) {
  const entityDetails = tableTitleEntityDetails;

  const activeEntity = entityDetails.find(
    (entityDetail) => entityDetail.entityType === entityType
  );

  return (
    <div className=" font-semibold md:w-full flex justify-center">
      <h1 className=" text-md md:text-lg lg:text-xl xl:text-2xl text-white italic">
        Inspection {activeEntity?.title}
      </h1>
    </div>
  );
}
