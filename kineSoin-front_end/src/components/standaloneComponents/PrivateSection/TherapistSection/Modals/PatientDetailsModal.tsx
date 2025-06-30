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

  // Always call hooks first
  useEffect(() => {
    console.log(patientDetails);
  }, [patientDetails]);

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

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      {/* <div className="w-full flex flex-col items-center mb-6">
        <p className="text-lg md:text-xl">
          <span className="font-normal">{selectedPatient.surname}</span>{' '}
          <span className="font-semibold">{selectedPatient.name}</span>
        </p>
        <p className="text-primaryBlue italic font-semibold">
          {selectedPatient.age} ans
        </p>
      </div>
      <div>
        {patientDetails && patientDetails.length > 0 ? (
          patientDetails.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-1 text-xs md:text-lg"
            >
              <p className="w-1/2">{detail.label}</p>
              <p className="w-1/2 font-normal">{detail.value}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No details available.</p>
        )}
      </div> */}
    </BaseModal>
  );
}
