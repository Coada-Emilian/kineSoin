import type { IAffliction } from '../../../../../@types/interfaces/modelInterfaces';

export const renderAfflictions = (
  allAfflictions: IAffliction[],
  afflictionStatus: string
): IAffliction[] => {
  if (afflictionStatus === 'all') {
    return allAfflictions ?? [];
  }

  if (afflictionStatus === 'operated') {
    return (allAfflictions ?? []).filter(
      (affliction) => affliction.is_operated === true
    );
  }

  if (afflictionStatus === 'non-operated') {
    return (allAfflictions ?? []).filter(
      (affliction) => affliction.is_operated === false
    );
  }

  return [];
};
