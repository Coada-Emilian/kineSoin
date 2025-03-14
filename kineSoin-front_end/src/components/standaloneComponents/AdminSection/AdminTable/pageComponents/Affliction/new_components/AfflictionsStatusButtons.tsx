import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';

interface AfflictionsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function AfflictionsStatusButtons({
  setStatus,
}: AfflictionsStatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <CustomBtn
        btn={{
          type: 'basicBtn',
          text: 'Tous',
          style: 'status',
          onClick: () => {
            setStatus('all');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'activeBtn',
          text: 'Opérées',
          style: 'status',
          onClick: () => {
            setStatus('operated');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'inactiveBtn',
          text: 'Non-opérées',
          style: 'status',
          onClick: () => {
            setStatus('non-operated');
          },
        }}
      />
    </div>
  );
}
