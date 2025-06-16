import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IEntityInterface } from '../../../../../../@types/types/componentTypes';
import { handleBodyRegionDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';
import { useAdminTableGlobalContext } from '../../../../../../utils/contexts/AdminTableGlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';

import { useAfflictionDeleteMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/affliction_mutations/useAfflictionDeleteMutation';
import { useInsuranceDeleteMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/insurance_mutations/useInsuranceDeleteMutation';
import { useMedicDeleteMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/medic_mutations/useMedicDeleteMutation';
import { usePatientDeleteMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/patient_mutations/usePatientDeleteMutation';
import { useTherapistDeleteMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/therapist_mutations/useTherapistDeleteMutation';
import { getDeleteModalEntityDetails } from '../../../../../../utils/functions/component_utils/page_components/admin_table/other_functions/getDeleteModalEntityDetails';
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

  const handleRegionDelete = useMutation({
    mutationKey: ['regionDelete'],
    mutationFn: ({ id }: { id: number }) => handleBodyRegionDeleteAsAdmin(id),
  });

  const therapistDeleteMutation = useTherapistDeleteMutation();
  const patientDeleteMutation = usePatientDeleteMutation();
  const medicDeleteMutation = useMedicDeleteMutation();
  const afflictionDeleteMutation = useAfflictionDeleteMutation();
  const insuranceDeleteMutation = useInsuranceDeleteMutation();

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

  const handleConfirmRegionDelete = () => {
    onClose && onClose();
    handleRegionDelete.mutate({ id: entity.id });
    setRegionDeleteModal(false);
  };

  const handleConfirmEntityDelete = () => {
    onClose && onClose();
    handleEntityDelete();
  };

  const handleCancelRegionDelete = () => {
    onClose && onClose();
    setRegionDeleteModal(false);
  };

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
