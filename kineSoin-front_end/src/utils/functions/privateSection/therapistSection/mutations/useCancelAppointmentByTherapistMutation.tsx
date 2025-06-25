import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  cancelAppointment,
  reducePrescriptionQuantity,
} from '../../../../apiUtils/therapistApiUtils/therapistApiUtils';

export const useCancelAppointmentByTherapistMutation = (
  onClose: () => void
) => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['cancelAppointmentByTherapist'],
    mutationFn: async ({
      appointmentId,
      prescriptionId,
    }: {
      appointmentId: number;
      prescriptionId: number;
    }) => {
      if (!appointmentId) {
        throw new Error('Invalid appointment ID for cancellation');
      }
      if (!prescriptionId) {
        throw new Error('Invalid prescription ID for cancellation');
      }
      // Assuming cancelAppointment and reducePrescriptionQuantity are defined elsewhere
      const appointmentResponse = await cancelAppointment(appointmentId);
      const prescriptionResponse =
        await reducePrescriptionQuantity(prescriptionId);

      if (!appointmentResponse || !prescriptionResponse) {
        throw new Error(
          'Error during appointment or prescription cancellation'
        );
      }
    },
    onSuccess: () => {
      console.log('Appointment canceled successfully');
      onClose();
      clientQuery.invalidateQueries({
        queryKey: ['fetchSameDayAppointments'],
      });
      toast.success('Rendez-vous annulé avec succès !');
    },
    onError: (error) => {
      console.error('Error canceling appointment:', error);
      toast.error(
        "Une erreur est survenue lors de l'annulation du rendez-vous."
      );
      throw new Error('Failed to cancel appointment');
    },
  });
};
