import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { cancelAppointmentAsTherapist } from '../../api/therapist/cancelAppointmentAsTherapist';
import { incrementPrescriptionAppointmentQuantity } from '../../api/therapist/incrementPrescriptionAppointmentQuantity';
import type { CancelAppointmentAsTherapistFunctionProps } from '../../@types/props/functionProps';

export const useCancelAppointmentAsTherapistMutation = (
  onClose: () => void
) => {
  const clientQuery = useQueryClient();
  return useMutation({
    mutationKey: ['cancelAppointmentAsTherapist'],
    mutationFn: async ({
      appointmentId,
      prescriptionId,
    }: CancelAppointmentAsTherapistFunctionProps) => {
      if (!appointmentId) {
        throw new Error('Invalid appointment ID for cancellation');
      }
      if (!prescriptionId) {
        throw new Error('Invalid prescription ID for cancellation');
      }
   
      const appointmentResponse =
        await cancelAppointmentAsTherapist(appointmentId);
        
      const prescriptionResponse =
        await incrementPrescriptionAppointmentQuantity(prescriptionId);

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
