import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deletePatientAsTherapist } from '../../../../apiUtils/therapistApiUtils/patientApiUtils/deletePatientAsTherapist';
import { useNavigate } from 'react-router-dom';

export const useHandlePatientDeleteAsTherapistMutation = (
  onClose: () => void
) => {
  const clientQuery = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['deletePatientAsTherapist'],
    mutationFn: async (id: number) => {
      if (!id) {
        throw new Error('Invalid patient ID for deletion');
      } else {
        await deletePatientAsTherapist(id);
        console.log(`Patient with ID ${id} deleted successfully`);
      }
    },
    onSuccess: () => {
      console.log('Patient deleted successfully');
      toast.success('Patient supprimé avec succès !');
      ['fetchAllPatientsDataByTherapist'].forEach((key) => {
        clientQuery.invalidateQueries({ queryKey: [key] });
      });
      onClose();
      navigate('/therapist/patients');
    },
    onError: (error) => {
      console.error('Error deleting patient:', error);
      toast.error('Une erreur est survenue lors de la suppression du patient.');
      throw new Error('Failed to delete patient');
    },
  });
};
