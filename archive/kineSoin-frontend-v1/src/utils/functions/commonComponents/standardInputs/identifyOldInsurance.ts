import { IInsurance } from '../../../../@types/interfaces/modelInterfaces';

interface FunctionProps {
  setActualInsurance: React.Dispatch<React.SetStateAction<IInsurance | null>>;
  setOtherInsurances: React.Dispatch<React.SetStateAction<IInsurance[]>>;
}

// Function to identify the old insurance
export const identifyOldInsurance = (
  insuranceList: IInsurance[],
  oldInsuranceName: string,
  { setActualInsurance, setOtherInsurances }: FunctionProps
) => {
  const oldInsurance = insuranceList.find(
    (insurance) => insurance.name === oldInsuranceName
  );
  if (oldInsurance) {
    setActualInsurance(oldInsurance);
  }
  const otherInsurances = insuranceList.filter(
    (insurance) => insurance.name !== oldInsuranceName
  );
  if (otherInsurances.length > 0) {
    setOtherInsurances(otherInsurances);
  }
};
