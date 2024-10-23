import { IAffliction } from '../../../../../../../@types/IAffliction';
import { ITherapist } from '../../../../../../../@types/ITherapist';
import CustomButton from '../../../../../../standaloneComponents/Button/CustomButton';

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
