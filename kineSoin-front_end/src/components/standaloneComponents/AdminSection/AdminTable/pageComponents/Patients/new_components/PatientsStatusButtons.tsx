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
          type: 'basic',
          text: 'Tous',
          style: 'status',
          onClick: () => {
            setStatus('all');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'active',
          text: 'Actifs',
          style: 'status',
          onClick: () => {
            setStatus('active');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'inactive',
          text: 'Inactifs',
          style: 'status',
          onClick: () => {
            setStatus('inactive');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'pending',
          text: 'En attente',
          style: 'status',
          onClick: () => {
            setStatus('pending');
          },
        }}
      />

      <CustomBtn
        btn={{
          type: 'banned',
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
