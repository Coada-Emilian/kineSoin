import { useEffect } from 'react';
import { IModalProps } from '../../../../../@types/interfaces/customInterfaces';
import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchPatientDetailsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientDetailsByTherapist';
import BaseModal from './BaseModal';

export default function PatientDetailsModal({ isOpen, onClose }: IModalProps) {
  const { selectedPatient, setPatientDetails, patientDetails } =
    useTherapistSectionContext();

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

  useEffect(() => {
    console.log(patientDetails);
  }, [patientDetails]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div>
        {/* {' '}
        <div className="w-full flex flex-col items-center  mb-6">
          <p className="text-lg md:text-xl ">
            <span className="font-normal">{patientData?.surname}</span>{' '}
            <span className="font-semibold">{patientData?.name}</span>
          </p>

          <p className="text-primaryBlue italic font-semibold">
            {patientData?.age} ans
          </p>
        </div>
        <div>
          {patientDetails.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-1 text-xs md:text-lg"
            >
              <p className="w-1/2">{detail.label}</p>
              <p className="w-1/2 font-normal">{detail.value}</p>
            </div>
          ))}
        </div>{' '} */}
        <h1>PatientmODAL</h1>
      </div>
    </BaseModal>
  );
}
