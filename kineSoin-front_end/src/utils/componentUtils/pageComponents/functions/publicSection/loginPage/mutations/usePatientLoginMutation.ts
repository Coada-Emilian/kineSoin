/**
 * @function usePatientLogin
 *
 * A custom React Query mutation hook that handles patient login functionality.
 * It validates user input, sends login credentials to the API, and manages the authentication state.
 *
 * @param {(token: string) => void} setPatientProfileToken - A function to update the patient's authentication token upon successful login.
 * @param {(path: string) => void} navigate - A function to navigate to different routes after login.
 *
 * @returns {Mutation} - A mutation object from React Query that manages the login request state.
 *
 * @example
 * const { mutate: loginPatient, isPending, error } = usePatientLogin(setToken, navigate);
 *
 * <form onSubmit={(e) => {
 *   e.preventDefault();
 *   const formData = new FormData(e.currentTarget);
 *   loginPatient(formData);
 * }}>
 *   <input type="email" name="email" required />
 *   <input type="password" name="password" required />
 *   <button type="submit">Login</button>
 * </form>
 */

import { useMutation } from '@tanstack/react-query';
import { handlePatientLogin } from '../../../../../../apiUtils/publicApiUtils';

export const usePatientLoginMutation = (
  setPatientProfileToken: (token: string) => void,
  navigate: (path: string) => void
) => {
  return useMutation({
    mutationKey: ['patientLogin'],
    mutationFn: async (formData: FormData) => {
      const patientLoginEmail = formData.get('email') as string;
      const patientLoginPassword = formData.get('password') as string;

      if (!patientLoginEmail || !patientLoginPassword) {
        throw new Error('Veuillez remplir tous les champs');
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          patientLoginEmail
        )
      ) {
        throw new Error('Veuillez entrer une adresse email valide');
      }

      return handlePatientLogin(patientLoginEmail, patientLoginPassword);
    },
    onSuccess: (data) => {
      setPatientProfileToken(data);
      navigate('/patient/dashboard');
    },
  });
};
