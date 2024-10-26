/**
 * @file Output.tsx
 * @description A React functional component that conditionally displays various output details for a medic or insurance profile, such as address, license/AMC code, or phone number.
 *
 * @param {Object} props - The props for the Output component.
 * @param {IMedic} [props.medic] - Optional medic object containing the medic's details.
 * @param {IInsurance} [props.insurance] - Optional insurance object containing the insurance details.
 * @param {boolean} [props.isMedicAddressOutput] - Flag to display the medic's address.
 * @param {boolean} [props.isInsuranceAddressOutput] - Flag to display the insurance's address.
 * @param {boolean} [props.isMedicLicenceCodeOutput] - Flag to display the medic's license code (ADELI).
 * @param {boolean} [props.isInsuranceAMCCodeOutput] - Flag to display the insurance's AMC code.
 * @param {boolean} [props.isMedicPhoneNumberOutput] - Flag to display the medic's phone number.
 * @param {boolean} [props.isInsurancePhoneNumberOutput] - Flag to display the insurance's phone number.
 *
 * @returns {JSX.Element} The rendered Output component displaying the relevant information based on the provided props.
 */

import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

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
