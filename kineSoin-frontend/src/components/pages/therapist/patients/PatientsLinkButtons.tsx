import CustomButton from '../../../ui/buttons/CustomButton';

export default function PatientsLinkButtons() {
  return (
    <div className="w-11/12 flex gap-2 mb-2">
      <CustomButton
        btn={{
          type: 'basic',
          text: 'Mes patients',
          style: 'status',
        }}
      />

      <CustomButton
        btn={{
          type: 'send',
          text: 'Tous les patients',
          style: 'status',
        }}
      />

      <CustomButton
        btn={{
          type: 'pending',
          text: 'Patients en attente',
          style: 'status',
        }}
      />
    </div>
  );
}
