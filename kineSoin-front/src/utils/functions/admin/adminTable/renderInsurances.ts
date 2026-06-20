import type { IInsurance } from '../../../../@types/interfaces/modelInterfaces';

export const renderInsurances = (
  allInsurances: IInsurance[],
  setRenderedInsurances: React.Dispatch<React.SetStateAction<IInsurance[]>>
) => {
  setRenderedInsurances(allInsurances);
};
