import AfflictionBodyRegion from '../generalComponents/affliction/AfflictionBodyRegion';
import AfflictionInsuranceCode from '../generalComponents/affliction/AfflictionInsuranceCode';
import AfflictionOperatedStatus from '../generalComponents/affliction/AfflictionOperatedStatus';
import AfflictionDescriptionSection from '../generalComponents/affliction/AfflictionDescriptionSection';
import { IAffliction } from '../../../../../../@types/IAffliction';

interface AfflictionSectionProps {
  affliction: IAffliction;
  afflictionDescription: string;
  setAfflictionDescription: React.Dispatch<React.SetStateAction<string>>;
  isProfileEditing: boolean;
  setChosenBodyRegionId: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setAfflictionOperatedStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AfflictionSection({
  affliction,
  afflictionDescription,
  setAfflictionDescription,
  isProfileEditing,
  setChosenBodyRegionId,
  setAfflictionOperatedStatus,
}: AfflictionSectionProps) {
  return (
    <>
      <AfflictionBodyRegion
        isProfileEditing={isProfileEditing}
        affliction={affliction}
        setChosenBodyRegionId={setChosenBodyRegionId}
      />
      <AfflictionInsuranceCode
        isProfileEditing={isProfileEditing}
        affliction={affliction}
      />
      <AfflictionOperatedStatus
        isProfileEditing={isProfileEditing}
        affliction={affliction}
        setAfflictionOperatedStatus={setAfflictionOperatedStatus}
      />
      <AfflictionDescriptionSection
        affliction={affliction}
        afflictionDescription={afflictionDescription}
        setAfflictionDescription={setAfflictionDescription}
        isProfileEditing={isProfileEditing}
      />
    </>
  );
}
