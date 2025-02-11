/**
 * @file ModifyButtons.tsx
 * @description A React functional component that displays conditional buttons for modifying either a therapist or affliction profile, allowing the user to toggle edit mode.
 *
 * @param {Object} props - The props for the ModifyButtons component.
 * @param {ITherapist | null} [props.therapist] - Optional therapist object indicating if the therapist modification button should be displayed.
 * @param {IAffliction | null} [props.affliction] - Optional affliction object indicating if the affliction modification button should be displayed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsProfileEditing - Function to set the profile editing state.
 *
 * @returns {JSX.Element} The rendered ModifyButtons component, displaying buttons for therapist and affliction modifications based on the provided props.
 */

import { IAffliction, ITherapist } from '../../../../../../../@types/types';
import CustomButton from '../../../../../generalComponents/CustomButton/CustomButton';

interface ModifyButtonsProps {
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModifyButtons({
  therapist,
  affliction,
  setIsProfileEditing,
}: ModifyButtonsProps) {
  return (
    <div>
      {therapist && (
        <CustomButton
          btnText="Modifier kinésithérapeute"
          btnType="button"
          modifyButton
          onClick={() => setIsProfileEditing(true)}
        />
      )}
      {affliction && (
        <CustomButton
          btnText="Modifier affliction"
          btnType="button"
          modifyButton
          onClick={() => setIsProfileEditing(true)}
        />
      )}
    </div>
  );
}
