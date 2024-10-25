/**
 * @file PatientStatusButtons.tsx
 * @description A component that renders buttons for filtering patient statuses.
 * It provides options to view all patients, active patients, inactive patients,
 * patients pending approval, and banned patients. Clicking a button will update
 * the patient status through the provided `setPatientStatus` function.
 *
 * @interface PatientStatusButtonsProps
 * @param {function} setPatientStatus - A function to update the patient status.
 *
 * @returns {JSX.Element} The rendered PatientStatusButtons component with buttons
 * for each patient status.
 */

import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';

interface PatientStatusButtonsProps {
  setPatientStatus: (status: string) => void;
}

export default function PatientStatusButtons({
  setPatientStatus,
}: PatientStatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <CustomButton
        btnText="Tous"
        allButton
        onClick={() => {
          setPatientStatus('all');
        }}
      />

      <CustomButton
        btnText="Actifs"
        activeButton
        onClick={() => {
          setPatientStatus('active');
        }}
      />

      <CustomButton
        btnText="Inactifs"
        inactiveButton
        onClick={() => {
          setPatientStatus('inactive');
        }}
      />

      <CustomButton
        btnText="En attente"
        pendingButton
        onClick={() => {
          setPatientStatus('pending');
        }}
      />

      <CustomButton
        btnText="Banis"
        bannedButton
        onClick={() => {
          setPatientStatus('banned');
        }}
      />
    </div>
  );
}
