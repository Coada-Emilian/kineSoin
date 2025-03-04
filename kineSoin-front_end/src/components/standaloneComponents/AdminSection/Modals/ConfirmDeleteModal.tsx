import { useNavigate } from 'react-router-dom';
import CustomButton from '../../generalComponents/CustomButton/CustomButton';
import DNALoader from '../../../../utils/DNALoader';
import { useEffect, useState } from 'react';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../@types/standardInterfaces';
import BaseModal from '../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleTherapistDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminTherapistApiUtils';
import { handlePatientDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminPatientApiUtils';
import { handleAfflictionDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminAfflictionApiUtils';
import { handleMedicDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminMedicApiUtils';
import { handleInsuranceOrganismDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminInsuranceApiUtils';
import { handleBodyRegionDeleteAsAdmin } from '../../../../utils/apiUtils/adminApiUtils/adminBodyRegionApiUtils';
import { getDeleteModalEntityDetails } from '../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/getDeleteModalEntityDetails';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity:
    | ITherapist
    | IPatient
    | IAffliction
    | IMedic
    | IInsurance
    | IBodyRegion;
  entityType: string;
  regionDeleteModal?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  entity,
  entityType,
  regionDeleteModal,
}: ConfirmDeleteModalProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return DNALoader();
  }

  const modalEntityDetails = getDeleteModalEntityDetails({ entity });

  const activeEntity = modalEntityDetails.find(
    (entityDetails) => entityDetails.entityType === entityType
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-center items-center gap-3 w-fit p-6 text:xxs xs:text-xs md:text-sm lg:text-base xl:text-lg">
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
              <CustomButton
                btnText="Confirmer"
                deleteButton
                onClick={() => {
                  onClose && onClose();
                  setIsLoading(true);
                  handleBodyRegionDeleteAsAdmin(entity.id);
                  setIsLoading(false);
                  window.location.reload();
                }}
              />

              <CustomButton
                btnText="Annuler"
                cancelButton
                onClick={() => onClose && onClose()}
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
              <CustomButton
                btnText="Confirmer"
                deleteButton
                onClick={() => {
                  onClose && onClose();
                  setIsLoading(true);
                  {
                    activeEntity?.function(entity.id);
                  }
                  setIsLoading(false);
                  navigate(
                    activeEntity?.redirect ? activeEntity.redirect : '/admin'
                  );
                  window.location.reload();
                }}
              />

              <CustomButton
                btnText="Annuler"
                cancelButton
                onClick={() => onClose && onClose()}
              />
            </div>
          </>
        )}
      </div>
    </BaseModal>
  );
}
