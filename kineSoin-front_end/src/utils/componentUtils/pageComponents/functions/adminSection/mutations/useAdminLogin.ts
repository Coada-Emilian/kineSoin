import { useMutation } from '@tanstack/react-query';
import { checkAdminCredentials } from '../AdminLoginPageUtils/authentificationUtil';

export const useAdminLogin = (
  setAdminProfileToken: (token: string) => void
) => {
  return useMutation({
    mutationKey: ['adminLogin'],
    mutationFn: async (formData: FormData) => {
      const adminEmail = formData.get('email') as string;
      const adminPassword = formData.get('password') as string;

      if (!adminEmail || !adminPassword) {
        throw new Error('Veuillez remplir tous les champs');
      } else if (!adminEmail.includes('@')) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      return checkAdminCredentials(adminEmail, adminPassword);
    },
    onSuccess: (data) => {
      setAdminProfileToken(data);
    },
  });
};
