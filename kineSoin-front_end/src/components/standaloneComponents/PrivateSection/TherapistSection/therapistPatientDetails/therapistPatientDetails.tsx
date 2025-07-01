import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ITherapistPatientDetails } from '../../../../../@types/interfaces/customInterfaces';
import { useTherapistSectionContext } from '../../../../../utils/contexts/TherapistSectionContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useFetchPatientDetailsByTherapist } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchPatientDetailsByTherapist';
import BaseOutput from '../../../generalComponents/BaseOutput';

export default function TherapistPatientDetails() {
  const { patientId } = useParams();

  const { patientDetails, setPatientDetails } = useTherapistSectionContext();

  useEffect(() => {
    console.log(patientDetails);
  }, [patientDetails]);

  const { isLoading, isFetching } = useFetchPatientDetailsByTherapist({
    patient_id: patientId ? Number(patientId) : 0,
    setPatientDetails,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-96 w-full">
        <DNALoader />
      </div>
    );
  }

  const getPatientOutputs = (
    patientDetails: ITherapistPatientDetails | null
  ) => {
    if (!patientDetails) return null;

    return (
      <div className="flex flex-col gap-2">
        <BaseOutput
          label="Statut"
          value={patientDetails.status}
          isOneThirdWidth={true}
        />
        <BaseOutput
          label="Nom"
          value={`${patientDetails.surname} ${patientDetails.name}, ${patientDetails.age} ans`}
        />
        <BaseOutput
          label="Adresse"
          value={`${patientDetails.street_number} ${patientDetails.street_name}, ${patientDetails.postal_code} ${patientDetails.city}`}
        />
        <BaseOutput
          label="Numéro de téléphone"
          value={`${patientDetails.prefix} ${patientDetails.phone_number}`}
        />
        <BaseOutput label="E-mail" value={patientDetails.email} />
        <BaseOutput
          label="Thérapeute"
          value={`${patientDetails.therapist.name} ${patientDetails.therapist.surname}`}
        />
        <BaseOutput
          label="Assurance"
          value={patientDetails.insurance[0].name}
        />
      </div>
    );
  };

  return (
    <div className="flex md:flex-col justify-around w-full">
      <div>{getPatientOutputs(patientDetails)}</div>

      <div>
        <img
          src={patientDetails?.picture_url}
          alt="Patient"
          className="w-96 h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
