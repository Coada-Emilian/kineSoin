import { useQuery } from '@tanstack/react-query';
import type { IPatientHistoryData } from '../../@types/interfaces/therapistInterfaces';
import { fetchPatientHistoryAsTherapist } from '../../api/therapist/fetchPatientHistoryAsTherapist';

export const useFetchPatientHistoryAsTherapistQuery = ({
  patientId,
}: {
  patientId: number | undefined;
}) => {
  const queryResult = useQuery({
    queryKey: ['fetchPatientHistoryAsTherapist', patientId],
    queryFn: () => fetchPatientHistoryAsTherapist(patientId!),
    enabled: !!patientId,
    select: (data: IPatientHistoryData | null) => {
      if (!data) return null;
      return {
        ...data,
      };
    },
  });

  return queryResult;
};
