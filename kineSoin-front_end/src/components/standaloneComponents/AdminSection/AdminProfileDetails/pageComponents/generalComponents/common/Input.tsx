// Purpose: Provide the Input component which displays the input fields for the medic's and insurance's address, phone number, licence code, and AMC code.

import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import GeneralInput from './GeneralInput';

interface InputProps {
  medic?: IMedic;
  insurance?: IInsurance;
  isMedicAddressInput?: boolean;
  isInsuranceAddressInput?: boolean;
  isMedicPhoneNumberInput?: boolean;
  isInsurancePhoneNumberInput?: boolean;
  isMedicLicenceCodeInput?: boolean;
  isInsuranceAMCCodeInput?: boolean;
}

export default function Input({
  medic,
  insurance,
  isMedicAddressInput,
  isInsuranceAddressInput,
  isMedicPhoneNumberInput,
  isInsurancePhoneNumberInput,
  isMedicLicenceCodeInput,
  isInsuranceAMCCodeInput,
}: InputProps) {
  return (
    <>
      <>
        {isMedicAddressInput && (
          <>
            <GeneralInput medic={medic} isMedicStreetNumberInput />
            <GeneralInput medic={medic} isMedicStreetNameInput />
            <GeneralInput medic={medic} isMedicPostalCodeInput />
            <GeneralInput medic={medic} isMedicCityInput />
          </>
        )}
        {isInsuranceAddressInput && (
          <>
            <GeneralInput insurance={insurance} isInsuranceStreetNumberInput />
            <GeneralInput insurance={insurance} isInsuranceStreetNameInput />
            <GeneralInput insurance={insurance} isInsurancePostalCodeInput />
            <GeneralInput insurance={insurance} isInsuranceCityInput />
          </>
        )}
        {isMedicPhoneNumberInput && (
          <GeneralInput medic={medic} isMedicPhoneNumberInput />
        )}
        {isInsurancePhoneNumberInput && (
          <GeneralInput insurance={insurance} isInsurancePhoneNumberInput />
        )}
        {isMedicLicenceCodeInput && (
          <GeneralInput medic={medic} isMedicLicenceCodeInput />
        )}
        {isInsuranceAMCCodeInput && (
          <GeneralInput insurance={insurance} isInsuranceAMCCodeInput />
        )}
      </>
    </>
  );
}
