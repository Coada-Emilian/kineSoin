import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';
import DNALoader from '../../../../../../utils/DNALoader';
import { handleAfflictionDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/affliction_utils/adminAfflictionApiUtils';
import { handleBodyRegionDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';
import { handleInsuranceOrganismDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/insurance_utils/adminInsuranceApiUtils';
import { handleMedicDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/medic_utils/adminMedicApiUtils';
import { handlePatientDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/patient_utils/adminPatientApiUtils';
import { handleTherapistDeleteAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/therapist_utils/adminTherapistApiUtils';
import CustomButton from '../../../../generalComponents/customButton/oldComponents/CustomButton';
import BaseModal from '../../../../privateSection/therapistSection/modals/BaseModal';

interface ConfirmDeleteModalRefactorProps {
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
}

export default function ConfirmDeleteModalRefactor({
  isOpen,
  onClose,
  entity,
  entityType,
}: ConfirmDeleteModalRefactorProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return DNALoader();
  }

  useEffect(() => {
    console.log(entity);
  }, [entity]);

  const entityDeleteDetails = [
    {
      entityType: 'therapist',
      function: handleTherapistDeleteAsAdmin,
      redirect: '/admin/therapists',
      full_name: (entity as ITherapist | IPatient | IMedic).fullName,
    },
    {
      entityType: 'patient',
      function: handlePatientDeleteAsAdmin,
      redirect: '/admin/patients',
      full_name: (entity as ITherapist | IPatient | IMedic).fullName,
    },
    {
      entityType: 'affliction',
      function: handleAfflictionDeleteAsAdmin,
      redirect: '/admin/afflictions',
      name: entity.name,
    },
    {
      entityType: 'medic',
      function: handleMedicDeleteAsAdmin,
      redirect: '/admin/medics',
      full_name: (entity as ITherapist | IPatient | IMedic).fullName,
    },
    {
      entityType: 'insurance',
      function: handleInsuranceOrganismDeleteAsAdmin,
      redirect: '/admin/insurances',
      name: (entity as IAffliction | IInsurance | IBodyRegion).name,
    },
    {
      entityType: 'region',
      function: handleBodyRegionDeleteAsAdmin,
      redirect: '/admin/regions',
      name: 'entity.name',
    },
  ];

  const activeEntity = entityDeleteDetails.find(
    (entityDetails) => entityDetails.entityType === entityType
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col text-center items-center gap-3 w-fit p-6 text:xxs xs:text-xs md:text-sm lg:text-base xl:text-lg">
        {activeEntity?.full_name && (
          <p>
            Êtes-vous sûr de vouloir supprimer le profile de{' '}
            <span className="font-semibold italic">
              {activeEntity.full_name}
            </span>{' '}
            ?
          </p>
        )}

        {activeEntity?.entityType === 'affliction' && (
          <p>
            Êtes-vous sûr de vouloir supprimer l'affliction{' '}
            <span className="font-semibold italic">{activeEntity.name}</span> ?
          </p>
        )}

        {activeEntity?.entityType === 'insurance' && (
          <p>
            Êtes-vous sûr de vouloir supprimer l'organisme{' '}
            <span className="font-semibold italic">{activeEntity.name}</span> ?
          </p>
        )}

        {/* {region && (
          <p>
            Êtes-vous sûr de vouloir supprimer la région{' '}
            <span className="font-semibold">{region.name}</span> ?
          </p>
        )} */}

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
      </div>
    </BaseModal>
  );
}
