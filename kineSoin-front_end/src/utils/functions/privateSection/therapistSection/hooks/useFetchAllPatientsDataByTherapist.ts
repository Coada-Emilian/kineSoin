import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IUserProfile } from '../../../../../@types/interfaces/customInterfaces';
import { fetchAllPatientsDataAsTherapist } from '../../../../apiUtils/therapistApiUtils/patientApiUtils/fetchAllPatientsDataAsTherapist';

interface QueryProps {
  setAllPatients: React.Dispatch<React.SetStateAction<IUserProfile[]>>;
}

export const useFetchAllPatientsDataByTherapist = ({
  setAllPatients,
}: QueryProps) => {
  const queryResult = useQuery({
    queryKey: ['fetchAllPatientsDataByTherapist'],
    queryFn: fetchAllPatientsDataAsTherapist,
    select: (patients) => {
      if (!Array.isArray(patients)) {
        console.warn('Invalid response format for all patients data');
        return [];
      }

      return patients.map((patient: IUserProfile) => ({
        id: patient.id,
        fullName: patient.fullName,
        picture_url: patient.picture_url,
        status: patient.status,
        therapist: patient.therapist || null,
      }));
    },
  });

  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data) {
      setAllPatients(queryResult.data);
      console.log('All patients data fetched successfully');
    } else if (queryResult.isError) {
      console.error('Error fetching all patients data:', queryResult.error);
    }
  }, [
    queryResult.data,
    queryResult.isSuccess,
    queryResult.isError,
    setAllPatients,
  ]);

  return queryResult;
};
