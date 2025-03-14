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
          type: 'basicBtn',
          text: 'Créer',
          style: 'normal',
        }}
        type="submit"
      />

      <CustomBtn
        btn={{
          type: 'cancelBtn',
          text: 'Annuler',
          style: 'normal',
          onClick: () => {
            onClose && onClose();
          },
        }}
      />
    </div>
  );
}
