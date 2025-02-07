// Purpose: Provide the ConfirmDeleteModal component which displays a modal to confirm the deletion of a profile.

import ReactModal from 'react-modal';
import { ITherapist } from '../../../../@types/ITherapist';
import {
  handleAfflictionDelete,
  handleInsuranceOrganismDelete,
  handleMedicDelete,
  handlePatientDelete,
  handleRegionDelete,
  handleTherapistDelete,
} from '../../../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../../../../@types/IPatient';
import { IAffliction } from '../../../../@types/IAffliction';
import { IMedic } from '../../../../@types/IMedic';
import { IInsurance } from '../../../../@types/IInsurance';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import DNALoader from '../../../../utils/DNALoader';
import { useState } from 'react';
import { IBodyRegion } from '../../../../@types/IBodyRegion';

interface ConfirmDeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
  region?: IBodyRegion | null;
}

export default function ConfirmDeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  therapist,
  patient,
  affliction,
  medic,
  insurance,
  region,
}: ConfirmDeleteModalProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <ReactModal
      isOpen={isDeleteModalOpen}
      onRequestClose={() => setIsDeleteModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="flex flex-col text-center items-center gap-3 w-fit">
        {(patient || therapist || medic) && (
          <p>
            Êtes-vous sûr de vouloir supprimer le profile de{' '}
            <span className="font-semibold">
              {therapist
                ? therapist.fullName
                : patient
                  ? patient.fullName
                  : medic
                    ? medic.fullName
                    : ''}
            </span>{' '}
            ?
          </p>
        )}

        {affliction && (
          <p>
            Êtes-vous sûr de vouloir supprimer l'affliction{' '}
            <span className="font-semibold">{affliction.name}</span> ?
          </p>
        )}

        {insurance && (
          <p>
            Êtes-vous sûr de vouloir supprimer l'organisme{' '}
            <span className="font-semibold">{insurance.name}</span> ?
          </p>
        )}

        {region && (
          <p>
            Êtes-vous sûr de vouloir supprimer la région{' '}
            <span className="font-semibold">{region.name}</span> ?
          </p>
        )}

        <span className="text-red-500 font-medium">
          Cette action est irréversible.
        </span>

        <div className="flex justify-center mt-4 gap-4">
          <CustomButton
            btnText="Confirmer la suppression"
            deleteButton
            onClick={() => {
              setIsDeleteModalOpen(false);
              setIsLoading(true);
              {
                therapist
                  ? handleTherapistDelete(therapist.id)
                  : patient
                    ? handlePatientDelete(patient.id)
                    : affliction
                      ? handleAfflictionDelete(affliction.id)
                      : medic
                        ? handleMedicDelete(medic.id)
                        : insurance
                          ? handleInsuranceOrganismDelete(insurance.id)
                          : region
                            ? handleRegionDelete(region.id)
                            : '';
              }
              setIsLoading(false);
              navigate(
                therapist
                  ? '/admin/therapists'
                  : patient
                    ? '/admin/patients'
                    : affliction
                      ? '/admin/afflictions'
                      : medic
                        ? '/admin/medics'
                        : insurance
                          ? '/admin/insurances'
                          : ''
              );
              window.location.reload();
            }}
          />

          <CustomButton
            btnText="Annuler"
            cancelButton
            onClick={() => setIsDeleteModalOpen(false)}
          />
        </div>
      </div>
    </ReactModal>
  );
}
