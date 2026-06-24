import type { BodyRegionsModalProps } from '../../../../../@types/props/modalProps';
import BaseModal from '../../BaseModal';
import ButtonSection from '../ButtonSection';
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

        <ButtonSection
          setIsRegionModalOpen={onClose}
          setIsAddRegionModalOpen={setIsAddRegionModalOpen}
        />
      </div>
    </BaseModal>
  );
}
