// Purpose: The purpose of this component is to render the therapist status buttons.

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
