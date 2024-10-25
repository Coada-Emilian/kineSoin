import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

interface EditLicenceCodeProps {
  medic?: IMedic;
  insurance?: IInsurance;
}

export default function EditLicenceCode({
  medic,
  insurance,
}: EditLicenceCodeProps) {
  return (
    <div className="flex gap-2 items-center mb-2 ">
      <label htmlFor="medic-licence_code" className="font-semibold">
        {medic ? 'Code ADELI' : 'Code AMC'}
      </label>
      <input
        type="text"
        name="licence_code"
        id="medic-licence_code"
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={medic?.licence_code || insurance?.amc_code || ''}
      />
    </div>
  );
}
