import CustomButton from '../../../../../generalComponents/CustomButton/CustomButton';
import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';

interface TherapistsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
export default function TherapistsStatusButtons({
  setStatus,
}: TherapistsStatusButtonsProps) {
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
          btnText: 'Actifs',
          isStatusBtn: true,
          onClick: () => {
            setStatus('active');
          },
        }}
      />

      <CustomBtn
        btn={{
          btnType: 'inactiveBtn',
          btnText: 'Inactifs',
          isStatusBtn: true,
          onClick: () => {
            setStatus('inactive');
          },
        }}
      />
    </div>
  );
}
