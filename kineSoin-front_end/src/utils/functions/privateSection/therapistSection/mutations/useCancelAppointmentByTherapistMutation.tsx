import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  cancelAppointmentAsTherapist,
  reduceAppointmentQuantity,
} from '../../../../apiUtils/therapistApiUtils';

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
      const appointmentResponse =
        await cancelAppointmentAsTherapist(appointmentId);
      const prescriptionResponse =
        await reduceAppointmentQuantity(prescriptionId);

      if (!appointmentResponse || !prescriptionResponse) {
        throw new Error("Erreur pendant l'annulation du rendez-vous.");
      }
    },
    onSuccess: () => {
      console.log('Appointment canceled successfully');
      clientQuery.invalidateQueries({
        queryKey: ['fetchSameDayAppointments'],
      });
      onClose();

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
