import type { ConfirmDeleteModalProps } from '../../../@types/props/modalProps';
import { getDeleteModalEntityDetails } from '../../../utils/functions/admin/adminTable/getDeleteModalEntityDetails';
import { useRegionDeletionMutation } from '../../../utils/hooks/admin/deletion/useRegionDeletionMutation';
import { useDeleteEntity } from '../../../utils/hooks/admin/helpers/useDeleteEntity';
import { useAdminContext } from '../../../utils/hooks/context/useAdminContext';
import CustomButton from '../buttons/CustomButton';
import DNALoader from '../DNALoader';
import BaseModal from './BaseModal';

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  entity,
  entityType,
}: ConfirmDeleteModalProps) {
  // Create a state to store the active entity
  const activeEntity = entity
    ? getDeleteModalEntityDetails(entity).find(
        (entityDetails) => entityDetails.entityType === entityType
      )
    : null;

  const { deleteEntity, isPending } = useDeleteEntity();

  const handleEntityDelete = () => {
    if (!activeEntity) return;

    deleteEntity({
      entityType: activeEntity.entityType,
      id: activeEntity.id,
    });
  };

  // Handler for confirming entity deletion
  const handleConfirmEntityDelete = () => {
    if (onClose) {
      onClose();
    }
    handleEntityDelete();
  };

  // Handler for canceling entity deletion
  const handleCancelEntityDelete = () => {
    if (onClose) {
      onClose();
    }
  };

  // Destructure the necessary variables from the admin table global context
  const { regionDeleteModal, setRegionDeleteModal } = useAdminContext();

  // Function to handle region deletion
  const regionDeleteMutation = useRegionDeletionMutation();

  // Handlers for confirming and canceling deletion actions
  const handleConfirmRegionDelete = () => {
    if (onClose) {
      onClose();
    }
    const region_id = entity.id;

    if (region_id) regionDeleteMutation.mutate({ id: region_id });
    setRegionDeleteModal(false);
  };

  // Handlers for canceling deletion actions
  const handleCancelRegionDelete = () => {
    if (onClose) {
      onClose();
    }
    setRegionDeleteModal(false);
  };

  if (isPending) return DNALoader();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      {regionDeleteModal ? (
        <>
          <p>
            Êtes-vous sûr de vouloir supprimer la région{' '}
            <span className="font-semibold">{entity?.name}</span> ?
          </p>
          <span className="text-red-500 font-medium">
            Cette action est irréversible.
          </span>

          <div className="flex justify-center mt-4 gap-4">
            <CustomButton
              btn={{
                type: 'delete',
                text: 'Confirmer',
                style: 'normal',
                onClick: handleConfirmRegionDelete,
              }}
            />

            <CustomButton
              btn={{
                type: 'cancel',
                text: 'Annuler',
                style: 'normal',
                onClick: handleCancelRegionDelete,
              }}
            />
          </div>
        </>
      ) : (
        <>
          {activeEntity?.full_name && (
            <p>
              Êtes-vous sûr de vouloir supprimer le profil de{' '}
              <span className="font-semibold italic">
                {activeEntity.full_name}
              </span>{' '}
              ?
            </p>
          )}

          {activeEntity?.entityType === 'affliction' && (
            <p>
              Êtes-vous sûr de vouloir supprimer l'affliction{' '}
              <span className="font-semibold italic">{activeEntity.name}</span>{' '}
              ?
            </p>
          )}

          {activeEntity?.entityType === 'insurance' && (
            <p>
              Êtes-vous sûr de vouloir supprimer l'organisme{' '}
              <span className="font-semibold italic">{activeEntity.name}</span>{' '}
              ?
            </p>
          )}

          <span className="text-red-500 font-medium">
            Cette action est irréversible.
          </span>

          <div className="flex justify-center mt-4 gap-4">
            <>
              <CustomButton
                btn={{
                  type: 'delete',
                  text: 'Confirmer',
                  style: 'normal',
                  onClick: handleConfirmEntityDelete,
                }}
              />

              <CustomButton
                btn={{
                  type: 'cancel',
                  text: 'Annuler',
                  style: 'normal',
                  onClick: handleCancelEntityDelete,
                }}
              />
            </>
          </div>
        </>
      )}
    </BaseModal>
  );
}
