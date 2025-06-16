import { tableTitleEntityDetails } from '../../../../../../utils/constants/adminSection/adminProfileDetails/TableTitleEntityDetails';

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
