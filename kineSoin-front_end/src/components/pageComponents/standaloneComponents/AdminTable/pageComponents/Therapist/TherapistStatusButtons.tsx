/**
 * @file TherapistStatusButtons.tsx
 * @description A React functional component that renders buttons for selecting the status of therapists. It allows users to filter therapists by their status (all, active, inactive).
 *
 * @param {Object} props - The props for the TherapistStatusButtons component.
 * @param {function} props.setTherapistStatus - A function that sets the status of the therapists based on the button clicked. Accepts a status string as a parameter.
 *
 * @returns {JSX.Element} The rendered buttons for selecting therapist statuses, each triggering a status update on click.
 */

import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';

interface TherapistStatusButtonsProps {
  setTherapistStatus: (status: string) => void;
}

export default function TherapistStatusButtons({
  setTherapistStatus,
}: TherapistStatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <CustomButton
        btnText="Tous"
        allButton
        onClick={() => {
          setTherapistStatus('all');
        }}
      />

      <CustomButton
        btnText="Actifs"
        activeButton
        onClick={() => {
          setTherapistStatus('active');
        }}
      />

      <CustomButton
        btnText="Inactifs"
        inactiveButton
        onClick={() => {
          setTherapistStatus('inactive');
        }}
      />
    </div>
  );
}
