/**
 * @function ConfirmDeleteModal
 *
 * A modal component that handles confirmation for deleting various types of entities in the admin section.
 * It supports deletion of therapists, patients, afflictions, medics, insurances, and body regions.
 * The component leverages React Query mutations for async deletion operations and displays a loader while processing.
 *
 * @param isOpen - A boolean to control the visibility of the modal.
 * @param onClose - A callback function to close the modal.
 * @param entity - The entity object targeted for deletion.
 * @param entityType - A string representing the type of entity to delete (e.g., "therapist", "region").
 *
 * @returns {JSX.Element} - A modal dialog prompting user confirmation to delete the specified entity.
 *
 * @example
 * <ConfirmDeleteModal
 *   isOpen={isDeleteModalOpen}
 *   onClose={closeModal}
 *   entity={selectedEntity}
 *   entityType="patient"
 * />
 *
 * @remarks
 * - Uses custom mutation hooks for each entity type to perform deletions.
 * - Displays confirmation messages tailored to the entity type.
 * - Shows a DNA-style loader while any deletion is in progress.
 * - Resets and closes the modal appropriately after confirmation or cancellation.
 * - Uses global context state to manage region deletion modal visibility.
 */

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IEntityInterface } from '../../../../../../@types/types/componentTypes';
import { handleBodyRegionDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/bodyRegionApiUtils';
import { useAdminTableGlobalContext } from '../../../../../../utils/contexts/AdminTableGlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';
import { useAfflictionDeleteMutation } from '../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/afflictionModalMutations/useAfflictionDeleteMutation';
import { useInsuranceDeleteMutation } from '../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/insuranceModalMutations/useInsuranceDeleteMutation';
import { useMedicDeleteMutation } from '../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/medicModalMutations/useMedicDeleteMutation';
import { usePatientDeleteMutation } from '../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/patientModalMutations/usePatientDeleteMutation';
import { useTherapistDeleteMutation } from '../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/therapistModalMutations/useTherapistDeleteMutation';
import { getDeleteModalEntityDetails } from '../../../../../../utils/functions/adminSection/adminTable/otherFunctions/getDeleteModalEntityDetails';
import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from '../../../../privateSection/therapistSection/modals/BaseModal';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: IEntityInterface;
  entityType: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  entity,
  entityType,
}: ConfirmDeleteModalProps) {
  // Create a state to store the active entity
  const [activeEntity, setActiveEntity] = useState<IEntityInterface>(null);

  // Destructure the necessary variables from the admin table global context
  const { regionDeleteModal, setRegionDeleteModal } =
    useAdminTableGlobalContext();

  // useEffect to set the active entity
  useEffect(() => {
    if (entity) {
      const modalEntityDetails = getDeleteModalEntityDetails(entity);
      const activeEntity = modalEntityDetails.find(
        (entityDetails) => entityDetails.entityType === entityType
      );
      if (activeEntity) {
        setActiveEntity(activeEntity);
      }
    }
  }, [entity]);

  // Function to handle region deletion
  const handleRegionDelete = useMutation({
    mutationKey: ['regionDelete'],
    mutationFn: ({ id }: { id: number }) => handleBodyRegionDeleteAsAdmin(id),
  });

  // Mutations for deleting different entities
  const therapistDeleteMutation = useTherapistDeleteMutation();
  const patientDeleteMutation = usePatientDeleteMutation();
  const medicDeleteMutation = useMedicDeleteMutation();
  const afflictionDeleteMutation = useAfflictionDeleteMutation();
  const insuranceDeleteMutation = useInsuranceDeleteMutation();

  // Function to handle entity deletion based on the active entity type
  const handleEntityDelete = () => {
    if (activeEntity?.entityType === 'therapist') {
      therapistDeleteMutation.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'patient') {
      patientDeleteMutation.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'affliction') {
      afflictionDeleteMutation.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'medic') {
      medicDeleteMutation.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'insurance') {
      insuranceDeleteMutation.mutate({ id: entity.id });
    }
  };

  // Handlers for confirming and canceling deletion actions
  const handleConfirmRegionDelete = () => {
    onClose && onClose();
    handleRegionDelete.mutate({ id: entity.id });
    setRegionDeleteModal(false);
  };

  // Handler for confirming entity deletion
  const handleConfirmEntityDelete = () => {
    onClose && onClose();
    handleEntityDelete();
  };

  // Handlers for canceling deletion actions
  const handleCancelRegionDelete = () => {
    onClose && onClose();
    setRegionDeleteModal(false);
  };

  // Handler for canceling entity deletion
  const handleCancelEntityDelete = () => {
    onClose && onClose();
  };

  // If the page is loading, display the loader
  if (
    handleRegionDelete.isPending ||
    afflictionDeleteMutation.isPending ||
    therapistDeleteMutation.isPending ||
    patientDeleteMutation.isPending ||
    medicDeleteMutation.isPending ||
    insuranceDeleteMutation.isPending
  )
    return DNALoader();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center mx-auto text-center gap-3 w-fit p-6 text:xxs xs:text-xs md:text-sm lg:text-base xl:text-lg">
        {regionDeleteModal ? (
          <>
            <p>
              Êtes-vous sûr de vouloir supprimer la région{' '}
              <span className="font-semibold">{entity.name}</span> ?
            </p>
            <span className="text-red-500 font-medium">
              Cette action est irréversible.
            </span>

            <div className="flex justify-center mt-4 gap-4">
              <CustomBtn
                btn={{
                  type: 'delete',
                  text: 'Confirmer',
                  style: 'normal',
                  onClick: handleConfirmRegionDelete,
                }}
              />

              <CustomBtn
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
                <span className="font-semibold italic">
                  {activeEntity.name}
                </span>{' '}
                ?
              </p>
            )}

            {activeEntity?.entityType === 'insurance' && (
              <p>
                Êtes-vous sûr de vouloir supprimer l'organisme{' '}
                <span className="font-semibold italic">
                  {activeEntity.name}
                </span>{' '}
                ?
              </p>
            )}

            <span className="text-red-500 font-medium">
              Cette action est irréversible.
            </span>

            <div className="flex justify-center mt-4 gap-4">
              <>
                <CustomBtn
                  btn={{
                    type: 'delete',
                    text: 'Confirmer',
                    style: 'normal',
                    onClick: handleConfirmEntityDelete,
                  }}
                />

                <CustomBtn
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
      </div>
    </BaseModal>
  );
}
