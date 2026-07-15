import { useEffect } from 'react';
import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useFetchPatientDetailsAsTherapistQuery } from '../../../../../hooks/therapist/useFetchPatientDetailsAsTherapistQuery';
import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import TherapistModal from '../TherapistModal';
import PatientCoordinatesSection from './PatientCoordinatesSection';
import PatientDetailsHeader from './PatientDetailsHeader';
import PatientInsuranceDetailsSection from './PatientInsuranceDetailsSection';

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

  useEffect(() => {
    console.log('patientDetails:', patientDetails);
  }, [patientDetails]);

  if (isLoading || isFetching) {
    return DNALoader();
  }

  const handleClose = () => {
    setSelectedPatient(null);
    onClose();
  };

  return (
    <TherapistModal
      isOpen={isOpen}
      onClose={handleClose}
      patient={patientDetails}
      header="Détails du patient"
      size="xl"
      message={
        <>
          <span className="block font-semibold text-2xl not-italic">
            {patientDetails?.surname} {patientDetails?.name}
          </span>
        </>
      }
    >
      <>
        <div className="w-full p-8 text-slate-600  text-xs md:text-sm lg:text-base xl:text-lg justify-center flex flex-col gap-4 ">
          <PatientDetailsHeader patient={patientDetails} />

          <div className="grid w-full grid-cols-2 gap-4 items-stretch text-slate-600 text-lg">
            <PatientCoordinatesSection patient={patientDetails} />

            <PatientInsuranceDetailsSection patient={patientDetails} />
          </div>

          <div className=" p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
            <div className="flex gap-3 items-center ">
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
        </div>
      </>
    </TherapistModal>
  );
}
