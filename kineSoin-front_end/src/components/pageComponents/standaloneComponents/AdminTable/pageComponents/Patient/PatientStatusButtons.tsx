// Purpose: The purpose of this component is to render the patient status buttons.

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
