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
}

export default function AfflictionSection({
  affliction,
  afflictionDescription,
  setAfflictionDescription,
  isProfileEditing,
}: AfflictionSectionProps) {
  return (
    <>
      <AfflictionBodyRegion
        isProfileEditing={isProfileEditing}
        affliction={affliction}
      />
      <AfflictionInsuranceCode affliction={affliction} />
      <AfflictionOperatedStatus affliction={affliction} />
      <AfflictionDescriptionSection
        affliction={affliction}
        afflictionDescription={afflictionDescription}
        setAfflictionDescription={setAfflictionDescription}
        isProfileEditing={isProfileEditing}
      />
    </>
  );
}
