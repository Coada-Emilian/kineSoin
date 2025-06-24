import { useMutation } from '@tanstack/react-query';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../../../localStorage/therapistLocalStorage';

export const useTherapistFetchBasicDataMutation = () => {
  return useMutation({
    mutationKey: ['fetchTherapistBasicProfile'],
    mutationFn: async () => {
      const response = getTherapistTokenAndDataFromLocalStorage();

      if (!response) {
        throw new Error('No therapist data found in local storage');
      }
      return {
        token: response.token,
        fullName: response.fullName,
        picture_url: response.picture_url,
        id: response.id,
      };
    },
    onSuccess: (data) => {
      console.log('Therapist profile fetched successfully');
    },
    onError: (error) => {
      console.error('Failed to fetch therapist profile:', error);
      throw new Error('Failed to fetch therapist profile');
    },
  });
};
