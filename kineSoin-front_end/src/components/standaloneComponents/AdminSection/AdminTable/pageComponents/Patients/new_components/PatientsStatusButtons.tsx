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

      <CustomBtn
        btn={{
          type: 'pendingBtn',
          text: 'En attente',
          style: 'status',
          onClick: () => {
            setStatus('pending');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'bannedBtn',
          text: 'Bannis',
          style: 'status',
          onClick: () => {
            setStatus('banned');
          },
        }}
      />
    </div>
  );
}
