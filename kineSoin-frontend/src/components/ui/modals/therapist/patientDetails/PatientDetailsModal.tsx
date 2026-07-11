import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useFetchPatientDetailsAsTherapistQuery } from '../../../../../hooks/therapist/useFetchPatientDetailsAsTherapistMutation';

import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import EntityIdOutput from '../../../outputs/EntityIdOutput';
import EntityStatusOutput from '../../../outputs/EntityStatusOutput';

import TherapistModal from '../TherapistModal';
import PatientDetailsOutputs from './PatientDetailsOutputs';

export default function PatientDetailsModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { selectedPatient, setSelectedPatient } =
    useTherapistSelectionContext();

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

  const handleClose = () => {
    setSelectedPatient(null);
    onClose();
  };

  return (
    <>
      <TherapistModal
        isOpen={isOpen}
        onClose={handleClose}
        patient={patientDetails}
        header="Détails du patient"
        size="md"
        message={
          <>
            <span className="block font-normal not-italic text-lg">
              Informations personnelles de
            </span>
            <span className="block font-semibold text-xl">
              {patientDetails?.name} {patientDetails?.surname}
            </span>
          </>
        }
      >
        <div className="w-full p-4 text-slate-600  text-xs md:text-sm lg:text-base xl:text-lg">
          <div className="flex w-full justify-between items-center">
            <EntityStatusOutput status={patientDetails?.status} />

            <EntityIdOutput id={patientDetails?.id ?? null} />
          </div>

          <PatientDetailsOutputs patientDetails={patientDetails} />
        </div>

        <div className=" p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
          <div className="flex gap-1 items-center ">
            <CustomButton
              btn={{
                type: 'basic',
                text: 'Gérer rendez-vous',
                style: 'normal',
                hasBorder: true,
                to: `/therapist/patient/${patientDetails?.id}/appointments`,
              }}
            />

            <CustomButton
              btn={{
                type: 'cancel',
                text: 'Retour',
                style: 'normal',
                hasBorder: true,
                onClick: handleClose,
              }}
            />
          </div>
        </div>
      </TherapistModal>
    </>
  );
}
