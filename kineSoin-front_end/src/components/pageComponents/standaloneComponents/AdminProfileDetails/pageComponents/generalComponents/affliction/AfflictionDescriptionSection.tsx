import { IAffliction } from '../../../../../../../@types/IAffliction';
import AfflictionDescription from './AfflictionDescription';
import EditAfflictionDescription from './EditAfflictionDescription';

interface AfflictionDescriptionSectionProps {
  affliction: IAffliction;
  afflictionDescription: string;
  setAfflictionDescription: React.Dispatch<React.SetStateAction<string>>;
  isProfileEditing: boolean;
}

export default function AfflictionDescriptionSection({
  affliction,
  afflictionDescription,
  setAfflictionDescription,
  isProfileEditing,
}: AfflictionDescriptionSectionProps) {
  return (
    <section className="mb-2 md:text-2xl">
      {isProfileEditing ? (
        <EditAfflictionDescription
          affliction={affliction}
          afflictionDescription={afflictionDescription}
          setAfflictionDescription={setAfflictionDescription}
        />
      ) : (
        <AfflictionDescription affliction={affliction} />
      )}
    </section>
  );
}
