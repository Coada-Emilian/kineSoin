import type { StatusButtonsProps } from '../../../../../@types/props/customProps';
import CustomButton from '../../../../ui/buttons/CustomButton';

export default function AfflictionsStatusButtons({
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
          text: 'Opérées',
          style: 'status',
          onClick: () => {
            setStatus('operated');
          },
        }}
      />

      <CustomButton
        btn={{
          type: 'inactive',
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
