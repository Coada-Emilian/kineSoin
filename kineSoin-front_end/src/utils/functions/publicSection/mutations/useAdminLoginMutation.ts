/**
 * @function useAdminLogin
 *
 * A custom hook that handles the admin login process using React Query's `useMutation`.
 * It validates the input fields (email and password) before making the API call via `handleAdminLogin`.
 * If successful, it updates the admin's profile token using `setAdminProfileToken`.
 *
 * @param {Function} setAdminProfileToken - A function to update the admin's authentication token upon successful login.
 *
 * @returns {object} - The mutation object from `useMutation`, containing methods and status information.
 *
 * @example
 * const { mutate: loginAdmin, isPending, error } = useAdminLogin(setAdminProfileToken);
 *
 * <form onSubmit={(e) => { e.preventDefault(); loginAdmin(new FormData(e.currentTarget)); }}>
 *   ...
 * </form>
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { checkAdminCredentials } from '../../adminSection/adminLoginPage/checkAdminCredentials';

export const useAdminLoginMutation = (
  setAdminProfileToken: (token: string) => void
) => {
  const navigate = useNavigate();
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

      const token = await checkAdminCredentials(adminEmail, adminPassword);

      if (!token) {
        throw new Error('Identifiants incorrects. Veuillez réessayer.');
      } else {
        navigate('/admin/therapists');
        return token;
      }
    },
    onSuccess: (token) => {
      setAdminProfileToken(token);
    },
    onError: (error: Error) => {
      throw new Error(error.message);
    },
  });
};
