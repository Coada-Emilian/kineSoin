import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';

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
          type: 'basic',
          text: 'Créer',
          style: 'normal',
        }}
        type="submit"
      />

      <CustomBtn
        btn={{
          type: 'cancel',
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
