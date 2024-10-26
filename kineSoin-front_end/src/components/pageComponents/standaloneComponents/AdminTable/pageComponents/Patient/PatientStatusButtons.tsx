/**
 * @file PatientStatusButtons.tsx
 * @description A React functional component that renders a set of buttons to filter patient statuses. Each button, when clicked, updates the patient status using a provided function.
 *
 * @param {Object} props - The props for the PatientStatusButtons component.
 * @param {function} props.setPatientStatus - A function that updates the patient status based on the button clicked. Accepts a string representing the status.
 *
 * @returns {JSX.Element} The rendered buttons for filtering patient statuses, including options for all, active, inactive, pending, and banned patients.
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
