/**
 * @file AfflictionSection.tsx
 * @description A React functional component that renders a section for managing afflictions within a profile. The component allows users to input or display details about an affliction, including its body region, insurance code, operated status, and description. It provides an interface that adapts based on whether the profile is being edited or viewed.
 *
 * @param {Object} props - The props for the AfflictionSection component.
 * @param {IAffliction} props.affliction - The affliction object containing details about the affliction.
 * @param {string} props.afflictionDescription - The description of the affliction.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setAfflictionDescription - A function to update the affliction description state.
 * @param {boolean} props.isProfileEditing - A boolean indicating if the profile is in editing mode.
 * @param {React.Dispatch<React.SetStateAction<number | undefined>>} props.setChosenBodyRegionId - A function to update the chosen body region ID state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setAfflictionOperatedStatus - A function to update the operated status state for the affliction.
 *
 * @returns {JSX.Element} The rendered AfflictionSection component, which includes input fields or outputs for displaying affliction details based on the editing state.
 */

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
