import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { modifyPatientDetailsAsTherapist } from '../../../../apiUtils/therapistApiUtils/patientApiUtils/modifyPatientDetailsAsTherapist';

export const useModifyPatientDetailsAsTherapistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['modifyPatientDetailsAsTherapist'],

    // Accept an object with patient_id and formData
    mutationFn: async ({
      patient_id,
      formData,
    }: {
      patient_id: number;
      formData: FormData;
    }) => {
      if (!patient_id) {
        throw new Error('ID du patient invalide');
      }
      return await modifyPatientDetailsAsTherapist(patient_id, formData);
    },

    onSuccess: (_, variables) => {
      toast.success('Détails du patient modifiés avec succès !');
      queryClient.invalidateQueries({
        queryKey: ['fetchPatientDetailsByTherapist', variables.patient_id],
      });
    },

    onError: (error) => {
      toast.error('Erreur lors de la modification des détails du patient.');
      console.error(
        'Erreur lors de la modification des détails du patient:',
        error
      );
    },
  });
};
