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
                        : ''
        }`}
        className={`${isStreetNameInput || isCityInput || isStreetNumberInput || isPostalCodeInput ? 'text-xs' : 'text-sm'} text-primaryBlue font-medium`}
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
                        : ''
        }`}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
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
                        : ''
        }`}
        required={!isStreetNumberInput}
      />
    </div>
  );
}
