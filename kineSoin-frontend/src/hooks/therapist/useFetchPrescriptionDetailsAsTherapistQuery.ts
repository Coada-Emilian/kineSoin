import { useQuery } from '@tanstack/react-query';
import { fetchPrescriptionDetailsAsTherapist } from '../../api/therapist/fetchPrescriptionDetailsAsTherapist';

export const useFetchPrescriptionDetailsAsTherapistQuery = ({
  prescription_id,
}: {
  prescription_id: number;
}) => {
  const queryResult = useQuery({
    queryKey: ['fetchPrescriptionDetailsAsTherapist', prescription_id],
    queryFn: () => fetchPrescriptionDetailsAsTherapist(prescription_id),
    enabled: prescription_id > 0,
  });
  return queryResult;
};
