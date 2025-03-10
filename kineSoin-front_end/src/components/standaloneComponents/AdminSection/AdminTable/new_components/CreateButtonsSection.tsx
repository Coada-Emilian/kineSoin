import CustomBtn from '../../../generalComponents/CustomButton/CustomButtonRefactor';

interface CreateButtonsSectionProps {
  onClose?: () => void;
}
export default function CreateButtonsSection({
  onClose,
}: CreateButtonsSectionProps) {
  return (
    <div className="flex gap-2 mt-6 w-fit mx-auto">
      <CustomBtn
        btn={{
          btnType: 'basicBtn',
          btnText: 'Créer',
          isNormalBtn: true,
          isFormBtn: true,
        }}
      />

      <CustomBtn
        btn={{
          btnType: 'cancelBtn',
          btnText: 'Annuler',
          isNormalBtn: true,
          onClick: () => {
            onClose && onClose();
          },
        }}
      />
    </div>
  );
}
