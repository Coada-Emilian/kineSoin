import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePatientStatusAsTherapist } from '../../../../apiUtils/therapistApiUtils';

export const useTogglePatientStatusAsTherapistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['togglePatientStatusAsTherapist'],
    mutationFn: async (id: number) => {
      if (!id) {
        throw new Error('ID du patient invalide');
      }
      return await togglePatientStatusAsTherapist(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchTherapistPatientsData'],
      });
    },
    onError: (error) => {
      console.error('Error toggling patient status:', error);
      throw new Error('Erreur lors de la modification du statut du patient');
    },
  });
};
