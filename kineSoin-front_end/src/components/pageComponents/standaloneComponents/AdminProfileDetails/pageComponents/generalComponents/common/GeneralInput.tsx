/**
 * @file GeneralInput.tsx
 * @description A React functional component that renders an input field with a dynamic label and placeholder. This component is designed to display and edit various fields for both medic and insurance profiles, such as address details, contact information, and unique codes.
 *
 * @param {Object} props - The props for the GeneralInput component.
 * @param {IMedic} [props.medic] - Optional medic object containing profile details, including street number, street name, postal code, city, phone number, and licence code.
 * @param {IInsurance} [props.insurance] - Optional insurance object containing profile details, including street number, street name, postal code, city, phone number, and AMC code.
 * @param {boolean} [props.isMedicStreetNumberInput] - Flag indicating whether the input field is for the medic's street number.
 * @param {boolean} [props.isInsuranceStreetNumberInput] - Flag indicating whether the input field is for the insurance's street number.
 * @param {boolean} [props.isMedicStreetNameInput] - Flag indicating whether the input field is for the medic's street name.
 * @param {boolean} [props.isInsuranceStreetNameInput] - Flag indicating whether the input field is for the insurance's street name.
 * @param {boolean} [props.isMedicPostalCodeInput] - Flag indicating whether the input field is for the medic's postal code.
 * @param {boolean} [props.isInsurancePostalCodeInput] - Flag indicating whether the input field is for the insurance's postal code.
 * @param {boolean} [props.isMedicCityInput] - Flag indicating whether the input field is for the medic's city.
 * @param {boolean} [props.isInsuranceCityInput] - Flag indicating whether the input field is for the insurance's city.
 * @param {boolean} [props.isMedicPhoneNumberInput] - Flag indicating whether the input field is for the medic's phone number.
 * @param {boolean} [props.isInsurancePhoneNumberInput] - Flag indicating whether the input field is for the insurance's phone number.
 * @param {boolean} [props.isMedicLicenceCodeInput] - Flag indicating whether the input field is for the medic's licence code.
 * @param {boolean} [props.isInsuranceAMCCodeInput] - Flag indicating whether the input field is for the insurance's AMC code.
 *
 * @returns {JSX.Element} The rendered GeneralInput component, displaying an input field with a label and placeholder dynamically set based on the selected medic or insurance attribute.
 */

import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

interface GeneralInputProps {
  medic?: IMedic;
  insurance?: IInsurance;
  isMedicStreetNumberInput?: boolean;
  isInsuranceStreetNumberInput?: boolean;
  isMedicStreetNameInput?: boolean;
  isInsuranceStreetNameInput?: boolean;
  isMedicPostalCodeInput?: boolean;
  isInsurancePostalCodeInput?: boolean;
  isMedicCityInput?: boolean;
  isInsuranceCityInput?: boolean;
  isMedicPhoneNumberInput?: boolean;
  isInsurancePhoneNumberInput?: boolean;
  isMedicLicenceCodeInput?: boolean;
  isInsuranceAMCCodeInput?: boolean;
}

export default function GeneralInput({
  medic,
  insurance,
  isMedicStreetNumberInput,
  isInsuranceStreetNumberInput,
  isMedicStreetNameInput,
  isInsuranceStreetNameInput,
  isMedicPostalCodeInput,
  isInsurancePostalCodeInput,
  isMedicCityInput,
  isInsuranceCityInput,
  isMedicPhoneNumberInput,
  isInsurancePhoneNumberInput,
  isMedicLicenceCodeInput,
  isInsuranceAMCCodeInput,
}: GeneralInputProps) {
  return (
    <div className="flex gap-2 items-center mb-2">
      <label
        htmlFor={
          isMedicStreetNumberInput
            ? 'medic-street-number_input'
            : isInsuranceStreetNumberInput
              ? 'insurance-street-number_input'
              : isMedicStreetNameInput
                ? 'medic-street-name_input'
                : isInsuranceStreetNameInput
                  ? 'insurance-street-name_input'
                  : isMedicPostalCodeInput
                    ? 'medic-postal-code_input'
                    : isInsurancePostalCodeInput
                      ? 'insurance-postal-code_input'
                      : isMedicCityInput
                        ? 'medic-city_input'
                        : isInsuranceCityInput
                          ? 'insurance-city_input'
                          : isMedicPhoneNumberInput
                            ? 'medic-phone_number'
                            : isInsurancePhoneNumberInput
                              ? 'insurance-phone_number'
                              : isMedicLicenceCodeInput
                                ? 'medic-licence_code_input'
                                : isInsuranceAMCCodeInput
                                  ? 'insurance-amc_code_input'
                                  : ''
        }
        className="font-semibold"
      >
        {isMedicStreetNumberInput || isInsuranceStreetNumberInput
          ? 'Numéro de rue :'
          : isMedicStreetNameInput || isInsuranceStreetNameInput
            ? 'Nom de rue :'
            : isMedicPostalCodeInput || isInsurancePostalCodeInput
              ? 'Code postal :'
              : isMedicCityInput || isInsuranceCityInput
                ? 'Ville :'
                : isMedicPhoneNumberInput || isInsurancePhoneNumberInput
                  ? 'Numéro de téléphone :'
                  : isMedicLicenceCodeInput
                    ? 'Code ADELI :'
                    : 'Code AMC :'}
      </label>

      <input
        type="text"
        name={
          isMedicStreetNumberInput || isInsuranceStreetNumberInput
            ? 'street_number'
            : isMedicStreetNameInput || isInsuranceStreetNameInput
              ? 'street_name'
              : isMedicPostalCodeInput || isInsurancePostalCodeInput
                ? 'postal_code'
                : isMedicCityInput || isInsuranceCityInput
                  ? 'city'
                  : isMedicPhoneNumberInput || isInsurancePhoneNumberInput
                    ? 'phone_number'
                    : isMedicLicenceCodeInput
                      ? 'licence_code'
                      : 'amc_code'
        }
        id={
          isMedicStreetNumberInput
            ? 'medic-street-number_input'
            : isInsuranceStreetNumberInput
              ? 'insurance-street-number_input'
              : isMedicStreetNameInput
                ? 'medic-street-name_input'
                : isInsuranceStreetNameInput
                  ? 'insurance-street-name_input'
                  : isMedicPostalCodeInput
                    ? 'medic-postal-code_input'
                    : isInsurancePostalCodeInput
                      ? 'insurance-postal-code_input'
                      : isMedicCityInput
                        ? 'medic-city_input'
                        : isInsuranceCityInput
                          ? 'insurance-city_input'
                          : isMedicPhoneNumberInput
                            ? 'medic-phone_number'
                            : isInsurancePhoneNumberInput
                              ? 'insurance-phone_number'
                              : isMedicLicenceCodeInput
                                ? 'medic-licence_code_input'
                                : isInsuranceAMCCodeInput
                                  ? 'insurance-amc_code_input'
                                  : ''
        }
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={
          isMedicStreetNumberInput
            ? medic?.street_number
            : isInsuranceStreetNumberInput
              ? insurance?.street_number
              : isMedicStreetNameInput
                ? medic?.street_name
                : isInsuranceStreetNameInput
                  ? insurance?.street_name
                  : isMedicPostalCodeInput
                    ? medic?.postal_code
                    : isInsurancePostalCodeInput
                      ? insurance?.postal_code
                      : isMedicCityInput
                        ? medic?.city
                        : isInsuranceCityInput
                          ? insurance?.city
                          : isMedicPhoneNumberInput
                            ? medic?.phone_number
                            : isInsurancePhoneNumberInput
                              ? insurance?.phone_number
                              : isMedicLicenceCodeInput
                                ? medic?.licence_code
                                : insurance?.amc_code
        }
      />
    </div>
  );
}
