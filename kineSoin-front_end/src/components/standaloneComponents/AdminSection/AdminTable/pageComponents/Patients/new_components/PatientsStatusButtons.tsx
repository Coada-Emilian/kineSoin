import CustomBtn from '../../../../../generalComponents/CustomButton/CustomButtonRefactor';

interface PatientsStatusButtonsProps {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function PatientsStatusButtons({
  setStatus,
}: PatientsStatusButtonsProps) {
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

      <CustomBtn
        btn={{
          btnType: 'pendingBtn',
          btnText: 'En attente',
          isStatusBtn: true,
          onClick: () => {
            setStatus('pending');
          },
        }}
      />

      <CustomBtn
        btn={{
          btnType: 'bannedBtn',
          btnText: 'Bannis',
          isStatusBtn: true,
          onClick: () => {
            setStatus('banned')
          },
        }}
      />
    </div>
  );
}
