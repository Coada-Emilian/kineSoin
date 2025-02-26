import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';

interface AfflictionsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function AfflictionsStatusButtons({
  setStatus,
}: AfflictionsStatusButtonsProps) {
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
        btnText="Opérées"
        activeButton
        onClick={() => {
          setStatus('operated');
        }}
      />

      <CustomButton
        btnText="Non-opérées"
        inactiveButton
        onClick={() => {
          setStatus('non-operated');
        }}
      />
    </div>
  );
}
