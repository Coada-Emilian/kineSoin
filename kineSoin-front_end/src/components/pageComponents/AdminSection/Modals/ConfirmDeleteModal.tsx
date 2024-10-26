/**
 * @file ConfirmDeleteModal.tsx
 * @description A React component that displays a confirmation modal for deleting a profile,
 * affliction, or insurance organism. The modal prompts the user for confirmation and executes
 * the deletion action if confirmed.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isDeleteModalOpen - A boolean indicating if the modal is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsDeleteModalOpen - A
 * function to set the modal's open state.
 * @param {ITherapist | null} [props.therapist] - An optional therapist object for deletion.
 * @param {IPatient | null} [props.patient] - An optional patient object for deletion.
 * @param {IAffliction | null} [props.affliction] - An optional affliction object for deletion.
 * @param {IMedic | null} [props.medic] - An optional medic object for deletion.
 * @param {IInsurance | null} [props.insurance] - An optional insurance object for deletion.
 *
 * @returns {JSX.Element} The rendered ConfirmDeleteModal component, which includes
 * confirmation prompts and buttons for confirming or canceling the deletion.
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
