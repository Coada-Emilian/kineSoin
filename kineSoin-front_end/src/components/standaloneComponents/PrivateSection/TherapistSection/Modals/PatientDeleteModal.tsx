import { IModalProps } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useHandlePatientDeleteAsTherapistMutation } from '../../../../../utils/functions/privateSection/therapistSection/mutations/useHandlePatientDeleteAsTherapistMutation';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from './BaseModal';

export default function PatientDeleteModal({ isOpen, onClose }: IModalProps) {
  const { selectedPatient } = usePatientsContext();

  const handlePatientDeletion =
    useHandlePatientDeleteAsTherapistMutation(onClose);

  const handleConfirmDelete = () => {
    if (selectedPatient?.id) {
      handlePatientDeletion.mutate(selectedPatient.id);
    } else {
      console.error('No patient selected for deletion');
    }
  };

  const handleCancelDelete = () => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex flex-col justify-center text-white font-medium text-lg md:text-xl text-center">
          <p className="text-base md:text-lg mb-2">
            Cabinet kinésithérapie Ruffec
          </p>
          <p className="text-sm md:text-base text-center italic">
            Suppression du patient
          </p>
        </div>

        <div className="bg-primaryTeal py-8 w-full flex flex-col items-center relative mb-14">
          <img
            src={selectedPatient?.picture_url}
            alt={selectedPatient?.name}
            className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2 italic text-primaryBlue font-medium text-center">
          <p>
            Êtes-vous sûr de vouloir supprimer le profil de{' '}
            <span className="font-semibold italic text-red-500">
              {selectedPatient?.name} {selectedPatient?.surname}
            </span>{' '}
            ?
          </p>

          <span className="text-red-500 font-medium mb-4">
            Cette action est irréversible.
          </span>

          <div className="flex justify-center p-4 gap-4 bg-primaryBlue">
            <>
              <CustomBtn
                btn={{
                  type: 'delete',
                  text: 'Confirmer',
                  style: 'normal',
                  onClick: handleConfirmDelete,
                }}
              />

              <CustomBtn
                btn={{
                  type: 'cancel',
                  text: 'Annuler',
                  style: 'normal',
                  onClick: handleCancelDelete,
                }}
              />
            </>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
