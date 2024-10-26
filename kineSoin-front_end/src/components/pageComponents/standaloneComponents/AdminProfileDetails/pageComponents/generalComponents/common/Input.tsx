/**
 * @file Input.tsx
 * @description A React functional component that conditionally renders address, phone number, and unique code input fields for either a medic or insurance profile using the GeneralInput component.
 *
 * @param {Object} props - The props for the Input component.
 * @param {IMedic} [props.medic] - Optional medic object containing profile details for address, phone number, and licence code.
 * @param {IInsurance} [props.insurance] - Optional insurance object containing profile details for address, phone number, and AMC code.
 * @param {boolean} [props.isMedicAddressInput] - Flag indicating whether the medic's address input fields should be rendered.
 * @param {boolean} [props.isInsuranceAddressInput] - Flag indicating whether the insurance's address input fields should be rendered.
 * @param {boolean} [props.isMedicPhoneNumberInput] - Flag indicating whether the input field for the medic's phone number should be rendered.
 * @param {boolean} [props.isInsurancePhoneNumberInput] - Flag indicating whether the input field for the insurance's phone number should be rendered.
 * @param {boolean} [props.isMedicLicenceCodeInput] - Flag indicating whether the input field for the medic's licence code should be rendered.
 * @param {boolean} [props.isInsuranceAMCCodeInput] - Flag indicating whether the input field for the insurance's AMC code should be rendered.
 *
 * @returns {JSX.Element} The rendered Input component, displaying GeneralInput fields based on the medic or insurance profile and selected attributes.
 */

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
