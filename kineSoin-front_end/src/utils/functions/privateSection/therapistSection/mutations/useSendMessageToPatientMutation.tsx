import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { sendMessageToPatient } from '../../../../apiUtils/therapistApiUtils';

export const useSendMessageToPatientMutation = (onClose: () => void) => {
  return useMutation({
    mutationKey: ['sendMessageToPatient'],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: number;
      formData: FormData;
    }) => {
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      if (!id || !formData) {
        throw new Error('Invalid parameters for sending message');
      } else {
        const messageContent = formData.get('content') as string;

        if (!messageContent || messageContent.trim() === '') {
          throw new Error('Message content cannot be empty');
        } else {
          await sendMessageToPatient(id, messageContent);
        }
      }
    },
    onSuccess: () => {
      console.log('Message sent successfully');
      onClose();
      toast.success('Message envoyé avec succès !');
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast.error("Une erreur est survenue lors de l'envoi du message.");
      throw new Error('Failed to send message');
    },
  });
};
