import { IAffliction } from '../../../../../@types/interfaces/modelInterfaces';

// Function to render afflictions
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
