/**
 * @file AfflictionStatusButtons.tsx
 * @description A React functional component that renders buttons for selecting the status of afflictions. It provides options to filter afflictions based on their status: "All," "Operated," and "Non-operated."
 *
 * @param {Object} props - The props for the AfflictionStatusButtons component.
 * @param {function(string): void} props.setAfflictionStatus - A function to handle the status change, which takes a status string ('all', 'operated', or 'non-operated') as an argument.
 *
 * @returns {JSX.Element} The rendered AfflictionStatusButtons component with options to set the affliction status.
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
