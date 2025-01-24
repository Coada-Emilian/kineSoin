// Purpose: The purpose of this component is to render the affliction status buttons.

import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';

interface AfflictionStatusButtonsProps {
  setAfflictionStatus: (status: string) => void;
}

export default function AfflictionStatusButtons({
  setAfflictionStatus,
}: AfflictionStatusButtonsProps) {
  return (
    <div className="flex gap-1">
      <CustomButton
        btnText="Tous"
        allButton
        onClick={() => {
          setAfflictionStatus('all');
        }}
      />

      <CustomButton
        btnText="Opérées"
        activeButton
        onClick={() => {
          setAfflictionStatus('operated');
        }}
      />

      <CustomButton
        btnText="Non-opérées"
        inactiveButton
        onClick={() => {
          setAfflictionStatus('non-operated');
        }}
      />
    </div>
  );
}
