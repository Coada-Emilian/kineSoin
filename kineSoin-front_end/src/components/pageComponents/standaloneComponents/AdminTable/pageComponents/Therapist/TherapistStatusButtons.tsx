/**
 * @file TherapistStatusButtons.tsx
 * @description A React component that renders buttons for filtering therapist statuses.
 * This component provides three buttons: "Tous" (All), "Actifs" (Active), and "Inactifs" (Inactive),
 * allowing users to set the status of therapists displayed in an administrative interface.
 *
 * The component receives a function to update the therapist status, which is triggered upon button clicks.
 *
 * @imports
 * - CustomButton from the specified path, used to render individual buttons.
 *
 * @component TherapistStatusButtons
 * @param {Object} props - The component props.
 * @param {function(string): void} props.setTherapistStatus - A function to set the therapist status based on button clicks.
 * It accepts a string parameter representing the status ('all', 'active', or 'inactive').
 *
 * @returns {JSX.Element} The rendered TherapistStatusButtons component containing status filter buttons.
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
