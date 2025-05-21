/**
 * @hook useFetchBodyRegions
 *
 * A custom React Query mutation hook to fetch body regions data. This function interacts with the backend to retrieve
 * the list of body regions and updates the UI accordingly.
 *
 * @param {(data: any) => void} setBodyRegions - Function to set the body regions data in the state.
 * @param {(msg: string) => void} setError - Function to update the global error message.
 *
 * @returns {Mutation} - Returns a React Query mutation object for fetching body regions.
 *
 * @example
 * const fetchBodyRegionsMutation = useFetchBodyRegions(setBodyRegions, setError);
 * fetchBodyRegionsMutation.mutate();
 *
 * @remarks
 * - On success, sets the retrieved body regions data into the state.
 * - On error, sets an appropriate error message in the global context.
 */

import { useMutation } from '@tanstack/react-query';
import { fetchBodyRegionsAsAdmin } from '../../../../../apiUtils/adminApiUtils/body_region_utils/adminBodyRegionApiUtils';

export const useFetchBodyRegionsMutation = (
  setBodyRegions: (data: any) => void,
  setError: (msg: string) => void
) => {
  return useMutation({
    mutationKey: ['fetchBodyRegions'],
    mutationFn: fetchBodyRegionsAsAdmin,
    onSuccess: (data) => {
      setBodyRegions(data);
    },
    onError: () => {
      setError('Erreur lors du chargement des régions corporelles.');
    },
  });
};
