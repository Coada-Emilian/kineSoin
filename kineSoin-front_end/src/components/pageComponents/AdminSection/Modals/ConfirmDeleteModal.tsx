/**
 * @file ConfirmDeleteModal.tsx
 * @description A modal component that prompts the user for confirmation before
 * deleting a specified entity (therapist, patient, affliction, medic, or insurance).
 * The modal displays a warning about the irreversibility of the action and
 * provides options to confirm or cancel the deletion.
 *
 * @interface ConfirmDeleteModalProps
 * @param {boolean} isDeleteModalOpen - A boolean indicating whether the delete
 * modal is open or closed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsDeleteModalOpen -
 * A function to update the state of the delete modal's visibility.
 * @param {ITherapist | null} [therapist] - The therapist object to be deleted,
 * if applicable.
 * @param {IPatient | null} [patient] - The patient object to be deleted, if
 * applicable.
 * @param {IAffliction | null} [affliction] - The affliction object to be deleted,
 * if applicable.
 * @param {IMedic | null} [medic] - The medic object to be deleted, if applicable.
 * @param {IInsurance | null} [insurance] - The insurance object to be deleted,
 * if applicable.
 *
 * @returns {JSX.Element} The rendered ConfirmDeleteModal component, displaying
 * confirmation messages and action buttons for deletion.
 */

import ReactModal from 'react-modal';
import { ITherapist } from '../../../../@types/ITherapist';
import {
  handleAfflictionDelete,
  handleInsuranceOrganismDelete,
  handleMedicDelete,
  handlePatientDelete,
  handleTherapistDelete,
} from '../../../../utils/apiUtils';
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../../../../@types/IPatient';
import { IAffliction } from '../../../../@types/IAffliction';
import { IMedic } from '../../../../@types/IMedic';
import { IInsurance } from '../../../../@types/IInsurance';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

interface ConfirmDeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
}

export default function ConfirmDeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  therapist,
  patient,
  affliction,
  medic,
  insurance,
}: ConfirmDeleteModalProps) {
  const navigate = useNavigate();
  
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
      <div className="flex flex-col text-center gap-3 w-fit">
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

        <span className="text-red-500 font-medium">
          Cette action est irréversible.
        </span>

        <div className="flex justify-center mt-4 gap-4">
          <CustomButton
            btnText="Confirmer la suppression"
            deleteButton
            onClick={() => {
              setIsDeleteModalOpen(false);
              if (therapist) {
                handleTherapistDelete(therapist.id);
                navigate('/admin/therapists');
                window.location.reload();
              } else if (patient) {
                handlePatientDelete(patient.id);
                navigate('/admin/patients');
                window.location.reload();
              } else if (affliction) {
                handleAfflictionDelete(affliction.id);
                navigate('/admin/afflictions');
                window.location.reload();
              } else if (medic) {
                handleMedicDelete(medic.id);
                navigate('/admin/medics');
                window.location.reload();
              } else if (insurance) {
                handleInsuranceOrganismDelete(insurance.id);
                navigate('/admin/insurances');
                window.location.reload();
              }
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
