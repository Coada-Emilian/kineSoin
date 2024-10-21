import ReactModal from 'react-modal';
import { ITherapist } from '../../../../@types/ITherapist';

interface ConfirmDeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  therapist: ITherapist;
  handleTherapistDelete: (therapist_id: number) => Promise<void>;
}

export default function ConfirmDeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  therapist,
  handleTherapistDelete,
}: ConfirmDeleteModalProps) {
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
      <div className="flex flex-col text-center gap-3">
        <p className="flex flex-col">
          Êtes-vous sûr de vouloir supprimer le profile de
          <span className="font-semibold">{therapist.fullName}</span> ?
          <span className="text-red-500 font-medium">
            Cette action est irréversible.
          </span>
        </p>
        <div className="flex justify-center mt-4 gap-4">
          <button
            className="rounded-lg text-white font-bold bg-red-500 hover:bg-red-600 text-sm p-2 px-4"
            onClick={() => {
              handleTherapistDelete(therapist.id);
              setIsDeleteModalOpen(false);
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
