import type { StatusButtonsProps } from '../../../../../@types/props/customProps';
import CustomButton from '../../../../ui/buttons/CustomButton';

export default function TherapistsStatusButtons({
  setStatus,
}: StatusButtonsProps) {
  return (
    <div className="flex gap-2 ">
      <CustomButton
        btn={{
          type: 'basic',
          text: 'Tous',
          style: 'status',
          onClick: () => {
            setStatus('all');
          },
        }}
      />

      <CustomButton
        btn={{
          type: 'active',
          text: 'Actifs',
          style: 'status',
          onClick: () => {
            setStatus('active');
          },
        }}
      />

      <CustomButton
        btn={{
          type: 'inactive',
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
