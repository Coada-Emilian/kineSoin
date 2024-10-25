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
          <button
            className="rounded-lg text-white font-bold bg-red-500 hover:bg-red-600 text-sm p-2 px-4"
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
          >
            Confirmer la suppression
          </button>
          <button
            className="rounded-lg text-gray-700 font-bold bg-gray-200 hover:bg-gray-300 text-sm p-2 px-4"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Annuler
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
