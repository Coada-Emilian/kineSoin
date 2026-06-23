import type { AdminAddTherapistButtonSectionProps } from '../../../../../@types/props/componentProps';
import CustomButton from '../../../buttons/CustomButton';

export default function ButtonSection({
  onClose,
  setIsAddTherapistModalP2Open,
  setIsAddTherapistModalP3Open,
}: AdminAddTherapistButtonSectionProps) {
  return (
    <div className="flex gap-2 mt-6 w-fit mx-auto">
      <CustomButton
        btn={{
          type: 'basic',
          text: `${setIsAddTherapistModalP2Open || setIsAddTherapistModalP3Open ? 'Suivant' : 'Créer'}`,
          style: 'normal',
        }}
        type="submit"
      />

      <CustomButton
        btn={{
          type: 'cancel',
          text: 'Annuler',
          style: 'normal',
          onClick: () => {
            if (onClose) {
              onClose();
            }
          },
        }}
      />
    </div>
  );
}
