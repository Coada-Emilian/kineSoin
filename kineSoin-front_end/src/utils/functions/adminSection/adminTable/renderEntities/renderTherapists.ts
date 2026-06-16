/**
 * @function renderTherapists
 *
 * Filters and sets the list of therapists to be rendered based on their status.
 *
 * @param {ITherapist[]} allTherapists - Array of all therapists to filter from.
 * @param {React.Dispatch<React.SetStateAction<ITherapist[]>>} setRenderedTherapists - State setter function to update the rendered therapists list.
 * @param {string} therapistStatus - Status filter to apply; expected values: 'all', 'active', or 'inactive'.
 *
 * @returns {void} This function updates the rendered therapists state via the setter; does not return a value.
 *
 * @example
 * renderTherapists(allTherapists, setRenderedTherapists, 'active');
 *
 * @details
 * - If `therapistStatus` is 'all', sets the full list.
 * - If 'active', filters therapists with status 'active'.
 * - If 'inactive', filters therapists with status 'inactive'.
 * - Defaults to empty array if `allTherapists` is undefined or null.
 */

import { ITherapist } from '../../../../../@types/interfaces/modelInterfaces';

// Function to render therapists based on status
export const renderTherapists = (
  allTherapists: ITherapist[],
  setRenderedTherapists: React.Dispatch<React.SetStateAction<ITherapist[]>>,
  therapistStatus: string
) => {
  if (therapistStatus === 'all') {
    setRenderedTherapists(allTherapists ?? []);
  } else if (therapistStatus === 'active') {
    const activeTherapists = (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'active'
    );
    setRenderedTherapists(activeTherapists);
  } else if (therapistStatus === 'inactive') {
    const inactiveTherapists = (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'inactive'
    );
    setRenderedTherapists(inactiveTherapists);
  }
};
