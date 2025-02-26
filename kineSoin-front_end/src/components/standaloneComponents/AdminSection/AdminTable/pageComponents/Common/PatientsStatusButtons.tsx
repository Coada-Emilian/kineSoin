import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';

interface PatientsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function PatientsStatusButtons({
  setStatus,
}: PatientsStatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <CustomButton
        btnText="Tous"
        allButton
        onClick={() => {
          setStatus('all');
        }}
      />

      <CustomButton
        btnText="Actifs"
        activeButton
        onClick={() => {
          setStatus('active');
        }}
      />

      <CustomButton
        btnText="Inactifs"
        inactiveButton
        onClick={() => {
          setStatus('inactive');
        }}
      />

      <CustomButton
        btnText="En attente"
        pendingButton
        onClick={() => {
          setStatus('pending');
        }}
      />

      <CustomButton
        btnText="Bannis"
        bannedButton
        onClick={() => {
          setStatus('blocked');
        }}
      />
    </div>
  );
}
