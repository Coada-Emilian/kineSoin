import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useFetchPatientDetailsAsTherapistQuery } from '../../../../../hooks/therapist/useFetchPatientDetailsAsTherapistMutation';
import { getEntityStatusClassName } from '../../../../../utils/functions/getEntityStatusClassName';
import { getEntityStatusText } from '../../../../../utils/functions/getEntityStatusText';

import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import EntityIdOutput from '../../../outputs/EntityIdOutput';

import BaseModal from '../../BaseModal';
import PatientDetailsInteractiveButtons from './PatientDetailsInteractiveButtons';
import PatientDetailsOutputs from './PatientDetailsOutputs';

export default function PatientDetailsModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { selectedPatient } = useTherapistSelectionContext();

  const {
    data: patientDetails,
    isLoading,
    isFetching,
  } = useFetchPatientDetailsAsTherapistQuery({
    patient_id: selectedPatient?.id ?? 0,
  });

  if (isLoading || isFetching) {
    return DNALoader();
  }

  if (!selectedPatient) {
    return (
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <p>No patient selected.</p>
      </BaseModal>
    );
  }

  const handleBackClick = () => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col  border text-primaryBlue rounded-xl shadow-2xl items-center text-center">
        <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex flex-col justify-center text-white font-medium text-lg md:text-xl ">
          <p className="text-base md:text-lg mb-2">
            Cabinet kinésithérapie Ruffec
          </p>
          <p className="text-sm md:text-base text-center italic">
            Details du patient
          </p>
        </div>

        <div className="bg-primaryTeal p-8 md:p-12 w-full relative mb-8">
          <div className="absolute top-3 md:top-8 left-0 w-full h-full rounded-xl">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto flex justify-center items-center">
              <img
                src={patientDetails?.picture_url}
                alt="profile"
                className="rounded-full shadow-xl w-full h-full object-cover border-4 border-white"
              />
            </div>
          </div>
        </div>

        <div className="w-full p-4 md:pt-10 md:px-12">
          <div className="text-sm md:text-md lg:text-lg xl:text-xl flex items-center justify-between gap-2 w-full">
            <div className="flex gap-2 items-center mb-2 w-full">
              <h4 className="font-bold">Statut: </h4>
              <span
                className={`${getEntityStatusClassName(patientDetails?.status ?? '')} py-1 px-2 rounded-xl font-semibold italic`}
              >
                {getEntityStatusText(patientDetails?.status ?? '')}
              </span>
            </div>
            <EntityIdOutput id={patientDetails?.id ?? null} />
          </div>

          <PatientDetailsOutputs patientDetails={patientDetails} />

          <div className="flex items-center justify-center mt-4">
            <CustomButton
              btn={{
                type: 'basic',
                text: 'Gérer rendez-vous',
                style: 'normal',
                hasBorder: true,
                to: `/therapist/patient/${patientDetails?.id}/appointments`,
              }}
            />
          </div>
        </div>

        <PatientDetailsInteractiveButtons />

        <div className="bg-primaryTeal p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
          <div className="flex gap-1 items-center ">
            <CustomButton
              btn={{
                type: 'cancel',
                text: 'Retour',
                style: 'normal',
                hasBorder: true,
                onClick: handleBackClick,
              }}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
