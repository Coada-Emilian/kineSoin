// Purpose: Provide the Output component which displays the medic's or insurance's address, licence code, AMC code, or phone number.

import { IInsurance, IMedic } from '../../../../../../../@types/types';

interface OutputProps {
  medic?: IMedic;
  insurance?: IInsurance;
  isMedicAddressOutput?: boolean;
  isInsuranceAddressOutput?: boolean;
  isMedicLicenceCodeOutput?: boolean;
  isInsuranceAMCCodeOutput?: boolean;
  isMedicPhoneNumberOutput?: boolean;
  isInsurancePhoneNumberOutput?: boolean;
}

export default function Output({
  medic,
  insurance,
  isMedicAddressOutput,
  isInsuranceAddressOutput,
  isMedicLicenceCodeOutput,
  isInsuranceAMCCodeOutput,
  isMedicPhoneNumberOutput,
  isInsurancePhoneNumberOutput,
}: OutputProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">
        {isMedicAddressOutput || isInsuranceAddressOutput
          ? 'Adresse :'
          : isMedicLicenceCodeOutput
            ? 'Code ADELI :'
            : isInsuranceAMCCodeOutput
              ? 'Code AMC :'
              : isMedicPhoneNumberOutput || isInsurancePhoneNumberOutput
                ? 'Numero telephone :'
                : ''}
      </h4>
      <span className="italic font-normal">
        {isMedicAddressOutput
          ? medic?.address
          : isInsuranceAddressOutput
            ? insurance?.address
            : isMedicLicenceCodeOutput
              ? medic?.licence_code
              : isInsuranceAMCCodeOutput
                ? insurance?.amc_code
                : isMedicPhoneNumberOutput
                  ? medic?.phone_number
                  : isInsurancePhoneNumberOutput
                    ? insurance?.phone_number
                    : ''}
      </span>
    </div>
  );
}
