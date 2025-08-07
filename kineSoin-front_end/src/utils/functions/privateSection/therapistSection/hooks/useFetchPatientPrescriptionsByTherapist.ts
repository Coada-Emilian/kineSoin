import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IPatientPrescription } from '../../../../../@types/interfaces/customInterfaces';
import { fetchPatientPrescriptionsAsTherapist } from '../../../../apiUtils/therapistApiUtils/prescriptionApiUtils/fetchPatientPrescriptionsAsTherapist';

interface QueryProps {
  setPatientPrescriptions: React.Dispatch<
    React.SetStateAction<IPatientPrescription[] | null>
  >;
  patientId: number;
}
export const useFetchPatientPrescriptionsByTherapist = ({
  setPatientPrescriptions,
  patientId,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchPatientPrescriptionsByTherapist', patientId],
    queryFn: () => fetchPatientPrescriptionsAsTherapist(patientId),
    select: (prescriptions) => {
      if (!Array.isArray(prescriptions)) {
        console.warn('Invalid response format for patient prescriptions');
        return [];
      }

      return prescriptions.map((prescription: IPatientPrescription) => ({
        id: prescription.id,
        date: prescription.date,
        appointment_quantity: prescription.appointment_quantity,
        completed_appointment_quantity:
          prescription.completed_appointment_quantity,
        is_new_prescription: prescription.is_new_prescription,
        is_completed: prescription.is_completed,
        at_home_care: prescription.at_home_care,
        picture_url: prescription.picture_url,
      }));
    },
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setPatientPrescriptions(queryResult.data);
      console.log('Patient prescriptions fetched successfully');
    } else if (queryResult.isError) {
      console.error('Error fetching patient prescriptions:', queryResult.error);
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setPatientPrescriptions,
  ]);

  return queryResult;
};
