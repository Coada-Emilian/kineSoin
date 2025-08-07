import { IModalProps } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import DNALoader from '../../../../../utils/DNALoader';
import { formatPatientStatusText } from '../../../../../utils/functions/privateSection/therapistSection/formatPatientStatusText';
import { getPatientStatusBackgroundColor } from '../../../../../utils/functions/privateSection/therapistSection/getPatientStatusBackgroundColor';
import { useFetchPatientDetailsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientDetailsByTherapist';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import { IdOutputRefactor } from '../../../generalComponents/standardOutputs';
import TherapistPatientDetailsInteractiveButtons from '../therapistPatientDetails/TherapistPatientDetailsInteractiveButtons';
import TherapistPatientDetailsOutputs from '../therapistPatientDetails/TherapistPatientDetailsOutputs';
import BaseModal from './BaseModal';

export default function PatientDetailsModal({ isOpen, onClose }: IModalProps) {
  const { selectedPatient, setPatientDetails, patientDetails } =
    usePatientsContext();

  const { isLoading, isFetching } = useFetchPatientDetailsByTherapist({
    patient_id: selectedPatient?.id ?? 0,
    setPatientDetails,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
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
                className={`${getPatientStatusBackgroundColor(patientDetails?.status ?? '')} py-1 px-2 rounded-xl font-semibold italic`}
              >
                {formatPatientStatusText(patientDetails?.status ?? '')}
              </span>
            </div>
            <IdOutputRefactor id={patientDetails?.id ?? null} />
          </div>

          <TherapistPatientDetailsOutputs />

          <div className="flex items-center justify-center mt-4">
            <CustomBtn
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

        <TherapistPatientDetailsInteractiveButtons />

        <div className="bg-primaryTeal p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
          <div className="flex gap-1 items-center ">
            <CustomBtn
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
