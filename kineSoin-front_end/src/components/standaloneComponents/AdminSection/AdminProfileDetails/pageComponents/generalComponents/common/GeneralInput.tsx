// Purpose: Provide the GeneralInput component which displays the input fields for the medic's and insurance's address, phone number, licence code, and AMC code.

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
