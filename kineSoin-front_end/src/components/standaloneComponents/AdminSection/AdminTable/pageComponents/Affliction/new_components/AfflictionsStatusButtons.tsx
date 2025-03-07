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
          btnType: 'basicBtn',
          btnText: 'Tous',
          isStatusBtn: true,
          onClick: () => {
            setStatus('all');
          },
        }}
      />

      <CustomBtn
        btn={{
          btnType: 'activeBtn',
          btnText: 'Opérées',
          isStatusBtn: true,
          onClick: () => {
            setStatus('operated');
          },
        }}
      />

      <CustomBtn
        btn={{
          btnType: 'inactiveBtn',
          btnText: 'Non-opérées',
          isStatusBtn: true,
          onClick: () => {
            setStatus('non-operated');
          },
        }}
      />
    </div>
  );
}
