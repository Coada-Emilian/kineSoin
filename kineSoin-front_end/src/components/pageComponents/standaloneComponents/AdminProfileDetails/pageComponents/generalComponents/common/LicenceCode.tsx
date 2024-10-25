import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

interface LicenceCodeProps {
  medic?: IMedic;
  insurance?: IInsurance;
}

export default function LicenceCode({ medic, insurance }: LicenceCodeProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">{medic ? 'Code ADELI' : 'Code AMC'}</h4>
      <span className="italic font-normal">
        {medic?.licence_code || insurance?.amc_code || ''}
      </span>
    </div>
  );
}
