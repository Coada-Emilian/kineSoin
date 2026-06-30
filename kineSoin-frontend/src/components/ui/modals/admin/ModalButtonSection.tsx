import type { ModalButtonSectionProps } from '../../../../@types/props/componentProps';
import CustomButton from '../../buttons/CustomButton';

export default function ModalButtonSection({
  mode = 'create',
  onClose,
  setNextModal,
}: ModalButtonSectionProps) {
  return (
    <div className="flex gap-2 mt-6 w-fit mx-auto">
      <CustomButton
        btn={{
          type: 'basic',
          text: mode === 'next' ? 'Suivant' : 'Créer',
          style: 'normal',
          onClick: mode === 'next' ? setNextModal : undefined,
        }}
        type={mode === 'create' ? 'submit' : undefined}
      />

      <CustomButton
        btn={{
          type: 'cancel',
          text: 'Annuler',
          style: 'normal',
          onClick: onClose,
        }}
      />
    </div>
  );
}
