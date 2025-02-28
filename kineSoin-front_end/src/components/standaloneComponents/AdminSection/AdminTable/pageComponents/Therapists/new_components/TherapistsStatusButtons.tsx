import CustomButton from '../../../../../generalComponents/CustomButton/CustomButton';

interface TherapistsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
export default function TherapistsStatusButtons({
  setStatus,
}: TherapistsStatusButtonsProps) {
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
    </div>
  );
}
