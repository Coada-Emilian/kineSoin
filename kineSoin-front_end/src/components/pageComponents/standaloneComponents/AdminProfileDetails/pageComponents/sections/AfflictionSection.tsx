import { IAffliction } from '../../../../../../@types/IAffliction';
import AfflictionInput from '../generalComponents/affliction/AfflictionInput';
import AfflictionOutput from '../generalComponents/affliction/AfflictionOutput';

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
      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <AfflictionInput
            affliction={affliction}
            setChosenBodyRegionId={setChosenBodyRegionId}
            isRegionInput
          />
        ) : (
          <AfflictionOutput affliction={affliction} isRegionOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <AfflictionInput affliction={affliction} isInsuranceCodeInput />
        ) : (
          <AfflictionOutput affliction={affliction} isInsuranceCodeOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <AfflictionInput
            affliction={affliction}
            isOperatedInput
            setAfflictionOperatedStatus={setAfflictionOperatedStatus}
          />
        ) : (
          <AfflictionOutput affliction={affliction} isOperatedOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <AfflictionInput
            affliction={affliction}
            isDescriptionInput
            afflictionDescription={afflictionDescription}
            setAfflictionDescription={setAfflictionDescription}
          />
        ) : (
          <AfflictionOutput isDescriptionOutput affliction={affliction} />
        )}
      </section>
    </>
  );
}
