import type { IMedic } from '../../../../../@types/interfaces/modelInterfaces';

export const renderMedics = (
  allMedics: IMedic[],
  setRenderedMedics: React.Dispatch<React.SetStateAction<IMedic[]>>
) => {
  setRenderedMedics(allMedics);
};
