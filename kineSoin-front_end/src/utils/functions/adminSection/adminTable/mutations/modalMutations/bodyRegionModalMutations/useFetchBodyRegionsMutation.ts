/**
 * @hook useFetchBodyRegionsMutation
 *
 * React Query mutation hook for fetching body regions data as an admin.
 * Calls the API to retrieve body regions and updates the provided state setter.
 *
 * @param {(data: any) => void} setBodyRegions - Callback to update the state with fetched body regions data.
 *
 * @returns {UseMutationResult} React Query mutation object with status, error, and mutate function.
 *
 * @example
 * const fetchBodyRegions = useFetchBodyRegionsMutation(setBodyRegions);
 * fetchBodyRegions.mutate();
 *
 * @details
 * - Uses `fetchBodyRegionsAsAdmin` API utility to fetch the data.
 * - On success:
 *    - Updates state by calling `setBodyRegions` with the fetched data.
 * - On error:
 *    - Logs the error to the console.
 */

import { useMutation } from '@tanstack/react-query';
import { fetchBodyRegionsAsAdmin } from '../../../../../../apiUtils/adminApiUtils/bodyRegionApiUtils';

export const useFetchBodyRegionsMutation = (
  setBodyRegions: (data: any) => void
) => {
  return useMutation({
    mutationKey: ['fetchBodyRegions'],
    mutationFn: fetchBodyRegionsAsAdmin,
    onSuccess: (data) => {
      setBodyRegions(data);
    },
    onError: (error: any) => {
      console.error('Error fetching body regions:', error);
    },
  });
};
