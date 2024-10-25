/**
 * @file AfflictionStatusButtons.tsx
 * @description A component that renders buttons for filtering affliction statuses.
 * It provides options to view all afflictions, operated afflictions, and non-operated
 * afflictions. Clicking a button will update the affliction status through the provided
 * `setAfflictionStatus` function.
 *
 * @interface AfflictionStatusButtonsProps
 * @param {function} setAfflictionStatus - A function to update the affliction status.
 *
 * @returns {JSX.Element} The rendered AfflictionStatusButtons component with buttons
 * for each affliction status.
 */

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
        btnText="Non opérées"
        inactiveButton
        onClick={() => {
          setAfflictionStatus('non-operated');
        }}
      />
    </div>
  );
}
