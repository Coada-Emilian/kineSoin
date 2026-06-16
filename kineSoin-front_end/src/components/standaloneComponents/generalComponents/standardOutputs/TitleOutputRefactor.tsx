/**
 * @component TitleOutputRefactor
 *
 * Displays a styled title header based on the provided entity type.
 *
 * @param {object} props - Component props.
 * @param {string} props.entityType - The type of entity for which to display the title.
 *
 * @returns {JSX.Element} A div containing the title for the entity inspection.
 *
 * @example
 * <TitleOutputRefactor entityType="therapist" />
 */

import { tableTitleEntityDetails } from '../../../../utils/constants/adminSection/adminProfileDetails/TableTitleEntityDetails';

interface TitleOutputRefactorProps {
  entityType: string;
}

export default function TitleOutputRefactor({
  entityType,
}: TitleOutputRefactorProps) {
  // Get the entity details based on the entityType
  const entityDetails = tableTitleEntityDetails;

  // Find the active entity details based on the entityType
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
