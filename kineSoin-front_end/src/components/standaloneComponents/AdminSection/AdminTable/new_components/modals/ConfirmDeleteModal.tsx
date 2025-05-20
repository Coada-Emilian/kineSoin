/**
 * @function ConfirmDeleteModal
 *
 * This component displays a confirmation modal for deleting various entities such as therapists, patients, afflictions,
 * medics, insurances, and body regions. It prompts the user with a confirmation message based on the entity type and
 * provides options to either confirm or cancel the deletion.
 * The deletion process is managed using `react-query` mutations, and the modal updates dynamically based on the selected entity.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Determines whether the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {IEntityInterface} props.entity - The entity to be deleted.
 * @param {string} props.entityType - The type of the entity (e.g., therapist, affliction, insurance).
 *
 * @returns {JSX.Element} - A modal that prompts the user to confirm the deletion of an entity.
 *
 * @example
 * <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} entity={entityData} entityType="therapist" />
 *
 * @remarks
 * - The component uses `getAdminDeleteMutations()` to retrieve appropriate delete mutations for different entity types.
 * - A separate state (`activeEntity`) is maintained to store entity details retrieved via `getDeleteModalEntityDetails()`.
 * - If the deletion is in progress, the `DNALoader` is displayed.
 * - Upon confirming deletion, the respective mutation is triggered, and the page reloads.
 * - For body region deletions, a different flow is handled via `handleRegionDelete`.
 */

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IEntityInterface } from '../../../../../../@types/types/componentTypes';
import { handleBodyRegionDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/adminBodyRegionApiUtils';
import { getDeleteModalEntityDetails } from '../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getDeleteModalEntityDetails';
import getAdminDeleteMutations from '../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/modals/mutations/adminDeleteMutations';
import { useAdminTableGlobalContext } from '../../../../../../utils/contexts/AdminTableGlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';
import CustomBtn from '../../../../generalComponents/CustomButton/CustomButtonRefactor';
import BaseModal from '../../../../PrivateSection/TherapistSection/Modals/BaseModal';

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
  // Get the necessary delete mutations for different entity types
  const {
    handleTherapistDelete,
    handlePatientDelete,
    handleAfflictionDelete,
    handleMedicDelete,
    handleInsuranceDelete,
  } = getAdminDeleteMutations();

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

  const handleRegionDelete = useMutation({
    mutationKey: ['regionDelete'],
    mutationFn: ({ id }: { id: number }) => handleBodyRegionDeleteAsAdmin(id),
    onSuccess: () => {
      window.location.reload();
    },
  });

  // Function to handle the deletion of the entity
  const handleDelete = () => {
    if (activeEntity?.entityType === 'therapist') {
      handleTherapistDelete.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'patient') {
      handlePatientDelete.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'affliction') {
      handleAfflictionDelete.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'medic') {
      handleMedicDelete.mutate({ id: entity.id });
    } else if (activeEntity?.entityType === 'insurance') {
      handleInsuranceDelete.mutate({ id: entity.id });
    }
  };

  // If the page is loading, display the loader
  if (
    handleRegionDelete.isPending ||
    handleAfflictionDelete.isPending ||
    handleTherapistDelete.isPending ||
    handlePatientDelete.isPending ||
    handleMedicDelete.isPending ||
    handleInsuranceDelete.isPending
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
                  onClick: () => {
                    onClose && onClose();
                    handleRegionDelete.mutate({ id: entity.id });
                    setRegionDeleteModal(false);
                  },
                }}
              />

              <CustomBtn
                btn={{
                  type: 'cancel',
                  text: 'Annuler',
                  style: 'normal',
                  onClick: () => {
                    onClose && onClose();
                    setRegionDeleteModal(false);
                  },
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
                    onClick: () => {
                      onClose && onClose();
                      handleDelete();
                    },
                  }}
                />

                <CustomBtn
                  btn={{
                    type: 'cancel',
                    text: 'Annuler',
                    style: 'normal',
                    onClick: () => onClose && onClose(),
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
