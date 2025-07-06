import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';
import DNALoader from '../../../../../utils/DNALoader';
import { getProfileStatusClassName } from '../../../../../utils/functions/adminSection/adminProfileDetails/getProfileStatusClassName';
import { useFetchPatientDetailsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientDetailsByTherapist';
import { useFetchTherapistsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchTherapistsByTherapist';
import { useModifyPatientDetailsAsTherapistMutation } from '../../../../../utils/functions/privateSection/therapistSection/mutations/useModifyPatientDetailsAsTherapistMutation';
import { transformPatientStatusNames } from '../../../../../utils/functions/privateSection/therapistSection/transformPatientStatusNames';
import { IdOutputRefactor } from '../../../generalComponents/standardOutputs';
import PatientDeleteModal from '../modals/PatientDeleteModal';
import SendMessageModal from '../modals/SendMessageModal';
import PatientDetailsBottomButtons from './PatientDetailsBottomButtons';
import PatientDetailsInteractiveButtons from './PatientDetailsInteractiveButtons';
import PatientDetailsOutputs from './PatientDetailsOutputs';
import PatientDetailsUtilityButtons from './PatientDetailsUtilityButtons';

export default function TherapistPatientDetails() {
  const { patientId } = useParams();

  const {
    patientDetails,
    setPatientDetails,
    isDeletePatientModalOpen,
    setIsDeletePatientModalOpen,
    isSendMessageModalOpen,
    setIsSendMessageModalOpen,
    setTherapistProfiles,
    setIsPatientProfileEditing,
  } = useTherapistSectionContext();

  const [entityStatus, setEntityStatus] = useState<string>('');

  useEffect(() => {
    setEntityStatus(patientDetails?.status ?? '');
  }, [patientDetails?.status]);

  const { isLoading: isTherapistsLoading, isFetching: isTherapistsFetching } =
    useFetchTherapistsByTherapist({
      setTherapistProfiles,
    });

  const { isLoading, isFetching } = useFetchPatientDetailsByTherapist({
    patient_id: patientId ? Number(patientId) : 0,
    setPatientDetails,
  });

  // ✅ Correct hook usage here:
  const modifyPatientDetailsMutation =
    useModifyPatientDetailsAsTherapistMutation();

  if (isLoading || isFetching || isTherapistsLoading || isTherapistsFetching) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
  }

  const patientStatus = transformPatientStatusNames(entityStatus);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.append('status', entityStatus ?? '');

    modifyPatientDetailsMutation.mutate({
      patient_id: patientDetails?.id ?? 0,
      formData,
    });
    setIsPatientProfileEditing(false);
  };

  return (
    <div className=" w-full">
      <form className="flex justify-center" onSubmit={handleFormSubmit}>
        <div className="flex flex-col md:m-2 border border-gray-300 text-primaryBlue rounded-xl shadow-2xl w-5/6 md:w-1/2 items-center md:items-start">
          <div className="w-full p-6 bg-primaryBlue rounded-t-xl flex justify-center text-white italic font-medium text-lg md:text-xl">
            Cabinet kinésithérapie Ruffec
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

          <div className="w-full p-4 md:py-10 md:px-24">
            <div className="text-sm md:text-md lg:text-lg xl:text-xl flex items-center justify-between gap-2 w-full">
              <div className="flex gap-2 items-center mb-2 w-full">
                <h4 className="font-bold">Statut: </h4>
                <span
                  className={`${getProfileStatusClassName(patientStatus)}py-1 px-2 rounded-xl font-semibold italic`}
                >
                  {patientStatus}
                </span>
              </div>

              <IdOutputRefactor id={patientDetails?.id ?? null} />
            </div>

            <PatientDetailsOutputs />

            <PatientDetailsUtilityButtons />
          </div>

          <PatientDetailsInteractiveButtons />
          
          <PatientDetailsBottomButtons setEntityStatus={setEntityStatus} />
        </div>
      </form>

      {isDeletePatientModalOpen && (
        <PatientDeleteModal
          isOpen={isDeletePatientModalOpen}
          onClose={() => setIsDeletePatientModalOpen(false)}
        />
      )}

      {isSendMessageModalOpen && (
        <SendMessageModal
          isOpen={isSendMessageModalOpen}
          onClose={() => setIsSendMessageModalOpen(false)}
        />
      )}
    </div>
  );
}
