import CustomButton from '../../../../../standaloneComponents/Button/CustomButton';

interface AfflictionUtilityButtonsProps {
  setIsRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddAfflictionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AfflictionUtilityButtons({
  setIsRegionModalOpen,
  setIsAddAfflictionModalOpen,
}: AfflictionUtilityButtonsProps) {
  return (
    <div className="flex gap-2">
      <CustomButton
        btnText="Voir regions"
        addButton
        onClick={() => setIsRegionModalOpen(true)}
      />
      <CustomButton
        btnText="Ajouter affliction"
        addButton
        onClick={() => setIsAddAfflictionModalOpen(true)}
      />
    </div>
  );
}
