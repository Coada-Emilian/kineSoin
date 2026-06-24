import type { BodyRegionsModalProps } from '../../../../../@types/props/modalProps';
import CustomButton from '../../../buttons/CustomButton';
import BaseModal from '../../BaseModal';
import BodyRegionsTableModal from './bodyRegionsTableModal/BodyRegionsTableModal';

export default function BodyRegionsModal({
  isOpen,
  onClose,
  setIsAddRegionModalOpen,
}: BodyRegionsModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic mb-4">
          Toutes les régions
        </h2>

        <p className="text-center text-sm text-gray-500 mb-4">
          Consultez et gérez les régions disponibles
        </p>

        <BodyRegionsTableModal />

        <div className="flex gap-2 mt-6 w-fit mx-auto">
          <CustomButton
            btn={{
              type: 'basic',
              text: 'Créer',
              style: 'normal',
              onClick: () => {
                onClose();
                setIsAddRegionModalOpen(true);
              },
            }}
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
      </div>
    </BaseModal>
  );
}
