interface StandardTextInputProps {
  isNameInput?: boolean;
  isSurnameInput?: boolean;
  isBirthNameInput?: boolean;
  patientRegisterName?: string;
  patientRegisterSurname?: string;
  patientRegisterBirthName?: string;
  isStreetNumberInput?: boolean;
  isStreetNameInput?: boolean;
  isPostalCodeInput?: boolean;
  isCityInput?: boolean;
  isTelephoneInput?: boolean;
  patientRegisterStreetNumber?: string;
  patientRegisterStreetName?: string;
  patientRegisterPostalCode?: string;
  patientRegisterCity?: string;
  patientRegisterTelephone?: string;
}

export default function StandardTextInput({
  isNameInput,
  isSurnameInput,
  isBirthNameInput,
  isStreetNumberInput,
  isStreetNameInput,
  isPostalCodeInput,
  isCityInput,
  isTelephoneInput,
}: StandardTextInputProps) {
  return (
    <div
      className={`${isStreetNumberInput || isPostalCodeInput ? 'w-4/12' : 'w-full'} flex flex-col gap-2 mb-4`}
    >
      <label
        htmlFor={`${
          isNameInput
            ? 'patient-register-name_input'
            : isSurnameInput
              ? 'patient-register-surname_input'
              : isBirthNameInput
                ? 'patient-register-birth_name_input'
                : isStreetNumberInput
                  ? 'patient-register-street_number_input'
                  : isStreetNameInput
                    ? 'patient-register-street_name_input'
                    : isPostalCodeInput
                      ? 'patient-register-postal_code_input'
                      : isCityInput
                        ? 'patient-register-city_input'
                        : isTelephoneInput
                          ? 'patient-register-telephone_input'
                          : ''
        }`}
        className={`${isStreetNameInput || isCityInput || isStreetNumberInput || isPostalCodeInput ? 'text-xs' : 'text-sm'} text-gray-600 font-medium`}
      >
        {isNameInput
          ? 'Nom'
          : isSurnameInput
            ? 'Prénom'
            : isBirthNameInput
              ? 'Nom de naissance'
              : isStreetNumberInput
                ? 'N° de rue'
                : isStreetNameInput
                  ? 'Nom de rue'
                  : isPostalCodeInput
                    ? 'Code postal'
                    : isCityInput
                      ? 'Ville'
                      : isTelephoneInput
                        ? 'Téléphone'
                        : ''}
      </label>

      <input
        type="text"
        name={`${
          isNameInput
            ? 'name'
            : isSurnameInput
              ? 'surname'
              : isBirthNameInput
                ? 'birth_name'
                : isStreetNumberInput
                  ? 'street_number'
                  : isStreetNameInput
                    ? 'street_name'
                    : isPostalCodeInput
                      ? 'postal_code'
                      : isCityInput
                        ? 'city'
                        : isTelephoneInput
                          ? 'phone_number'
                          : ''
        }`}
        id={`${
          isNameInput
            ? 'patient-register-name_input'
            : isSurnameInput
              ? 'patient-register-surname_input'
              : isBirthNameInput
                ? 'patient-register-birth_name_input'
                : isStreetNumberInput
                  ? 'patient-register-street_number_input'
                  : isStreetNameInput
                    ? 'patient-register-street_name_input'
                    : isPostalCodeInput
                      ? 'patient-register-postal_code_input'
                      : isCityInput
                        ? 'patient-register-city_input'
                        : isTelephoneInput
                          ? 'patient-register-telephone_input'
                          : ''
        }`}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`${
          isNameInput
            ? 'Entrez votre nom'
            : isSurnameInput
              ? 'Entrez votre prénom'
              : isBirthNameInput
                ? 'Entrez votre nom de naissance'
                : isStreetNumberInput
                  ? 'N° de rue'
                  : isStreetNameInput
                    ? 'Nom de rue'
                    : isPostalCodeInput
                      ? 'Code postal'
                      : isCityInput
                        ? 'Ville'
                        : isTelephoneInput
                          ? 'Numéro de téléphone'
                          : ''
        }`}
        required={!isStreetNumberInput}
      />
    </div>
  );
}
