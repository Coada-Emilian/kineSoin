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
          text: 'Actifs',
          style: 'status',
          onClick: () => {
            setStatus('active');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'inactiveBtn',
          text: 'Inactifs',
          style: 'status',
          onClick: () => {
            setStatus('inactive');
          },
        }}
      />
    </div>
  );
}
