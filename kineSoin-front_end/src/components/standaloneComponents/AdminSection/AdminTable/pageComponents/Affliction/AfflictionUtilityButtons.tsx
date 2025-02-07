/**
 * @file AfflictionUtilityButtons.tsx
 * @description A React functional component that renders utility buttons for managing afflictions. It provides options to view regions and add a new affliction.
 *
 * @param {Object} props - The props for the AfflictionUtilityButtons component.
 * @param {function(boolean): void} props.setIsRegionModalOpen - A function that sets the state to open or close the region modal.
 * @param {function(boolean): void} props.setIsAddAfflictionModalOpen - A function that sets the state to open or close the add affliction modal.
 *
 * @returns {JSX.Element} The rendered AfflictionUtilityButtons component, consisting of buttons to view regions and add a new affliction.
 */

import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';

interface AfflictionUtilityButtonsProps {
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddAfflictionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AfflictionUtilityButtons({
  setIsRegionModalOpen,
  setIsAddAfflictionModalOpen,
}: AfflictionUtilityButtonsProps) {
  return (
    <div className="flex gap-2">
      <CustomButton
        btnText="Voir regions"
        addButton
        onClick={() => {
          setIsRegionModalOpen(true);
        }}
      />

      <CustomButton
        btnText="Ajouter affliction"
        addButton
        onClick={() => {
          setIsAddAfflictionModalOpen(true);
        }}
      />
    </div>
  );
}
