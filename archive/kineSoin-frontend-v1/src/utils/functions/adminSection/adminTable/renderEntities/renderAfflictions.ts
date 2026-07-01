/**
 * @function renderAfflictions
 *
 * Filters and sets the list of afflictions to be rendered based on their operated status.
 *
 * @param {IAffliction[]} allAfflictions - Array of all afflictions to filter from.
 * @param {React.Dispatch<React.SetStateAction<IAffliction[]>>} setRenderedAfflictions - State setter function to update the rendered afflictions list.
 * @param {string} afflictionStatus - Status filter to apply; expected values: 'all', 'operated', or 'non-operated'.
 *
 * @returns {void} This function updates the rendered afflictions state via the setter; does not return a value.
 *
 * @example
 * renderAfflictions(allAfflictions, setRenderedAfflictions, 'operated');
 *
 * @details
 * - If `afflictionStatus` is 'all', sets the full list.
 * - If 'operated', filters afflictions where `is_operated` is true.
 * - If 'non-operated', filters afflictions where `is_operated` is false.
 * - Defaults to empty array if `allAfflictions` is undefined or null.
 */

import { IAffliction } from '../../../../../@types/interfaces/modelInterfaces';

export const renderAfflictions = (
  allAfflictions: IAffliction[],
  setRenderedAfflictions: React.Dispatch<React.SetStateAction<IAffliction[]>>,
  afflictionStatus: string
) => {
  if (afflictionStatus === 'all') {
    setRenderedAfflictions(allAfflictions ?? []);
  } else if (afflictionStatus === 'operated') {
    const operatedAfflictions = (allAfflictions ?? []).filter(
      (affliction) => affliction.is_operated === true
    );
    setRenderedAfflictions(operatedAfflictions);
  } else if (afflictionStatus === 'non-operated') {
    const nonOperatedAfflictions = (allAfflictions ?? []).filter(
      (affliction) => affliction.is_operated === false
    );
    setRenderedAfflictions(nonOperatedAfflictions);
  }
};
