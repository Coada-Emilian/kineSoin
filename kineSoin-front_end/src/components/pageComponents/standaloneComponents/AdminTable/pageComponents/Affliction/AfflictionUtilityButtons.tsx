/**
 * @file AfflictionUtilityButtons.tsx
 * @description A component that renders utility buttons for managing afflictions.
 * It provides options to view regions and add a new affliction. Clicking a button
 * will open the respective modal by updating the provided state functions.
 *
 * @interface AfflictionUtilityButtonsProps
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsRegionModalOpen -
 * A state updater function to control the visibility of the region modal.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddAfflictionModalOpen -
 * A state updater function to control the visibility of the add affliction modal.
 *
 * @returns {JSX.Element} The rendered AfflictionUtilityButtons component with buttons
 * to view regions and add an affliction.
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
        onClick={() => setIsRegionModalOpen(true)}
      />

      <CustomButton
        btnText="Ajouter affliction"
        addButton
        onClick={() => {
          console.log('clicked');
          setIsAddAfflictionModalOpen(true);
        }}
      />
    </div>
  );
}
