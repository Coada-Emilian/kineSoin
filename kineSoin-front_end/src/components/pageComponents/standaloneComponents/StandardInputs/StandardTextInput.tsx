interface StandardTextInputProps {
  isNameInput?: boolean;
  isSurnameInput?: boolean;
  isBirthNameInput?: boolean;
  patientRegisterName?: string;
  setPatientRegisterName?: React.Dispatch<React.SetStateAction<string>>;
  patientRegisterSurname?: string;
  setPatientRegisterSurname?: React.Dispatch<React.SetStateAction<string>>;
  patientRegisterBirthName?: string;
  setPatientRegisterBirthName?: React.Dispatch<React.SetStateAction<string>>;
  isStreetNumberInput?: boolean;
  isStreetNameInput?: boolean;
  isPostalCodeInput?: boolean;
  isCityInput?: boolean;
  isTelephoneInput?: boolean;
  patientRegisterStreetNumber?: string;
  setPatientRegisterStreetNumber?: React.Dispatch<React.SetStateAction<string>>;
  patientRegisterStreetName?: string;
  setPatientRegisterStreetName?: React.Dispatch<React.SetStateAction<string>>;
  patientRegisterPostalCode?: string;
  setPatientRegisterPostalCode?: React.Dispatch<React.SetStateAction<string>>;
  patientRegisterCity?: string;
  setPatientRegisterCity?: React.Dispatch<React.SetStateAction<string>>;
  patientRegisterTelephone?: string;
  setPatientRegisterTelephone?: React.Dispatch<React.SetStateAction<string>>;
}

export default function StandardTextInput({
  isNameInput,
  isSurnameInput,
  isBirthNameInput,
  patientRegisterName,
  setPatientRegisterName,
  patientRegisterSurname,
  setPatientRegisterSurname,
  patientRegisterBirthName,
  setPatientRegisterBirthName,
  isStreetNumberInput,
  isStreetNameInput,
  isPostalCodeInput,
  isCityInput,
  isTelephoneInput,
  patientRegisterStreetNumber,
  setPatientRegisterStreetNumber,
  patientRegisterStreetName,
  setPatientRegisterStreetName,
  patientRegisterPostalCode,
  setPatientRegisterPostalCode,
  patientRegisterCity,
  setPatientRegisterCity,
  patientRegisterTelephone,
  setPatientRegisterTelephone,
}: StandardTextInputProps) {
  return (
    <div className="mb-4">
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
        className="text-gray-600 text-sm font-medium"
      >
        {isNameInput
          ? 'Nom'
          : isSurnameInput
            ? 'Prénom'
            : isBirthNameInput
              ? 'Nom de naissance'
              : isStreetNumberInput
                ? 'Numéro de rue'
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
                  ? 'Numéro de rue'
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
        value={`${
          isNameInput
            ? patientRegisterName
            : isSurnameInput
              ? patientRegisterSurname
              : isBirthNameInput
                ? patientRegisterBirthName
                : isStreetNumberInput
                  ? patientRegisterStreetNumber
                  : isStreetNameInput
                    ? patientRegisterStreetName
                    : isPostalCodeInput
                      ? patientRegisterPostalCode
                      : isCityInput
                        ? patientRegisterCity
                        : isTelephoneInput
                          ? patientRegisterTelephone
                          : ''
        }`}
        onChange={(e) => {
          `${
            setPatientRegisterName
              ? setPatientRegisterName(e.target.value)
              : setPatientRegisterSurname
                ? setPatientRegisterSurname(e.target.value)
                : setPatientRegisterBirthName
                  ? setPatientRegisterBirthName(e.target.value)
                  : setPatientRegisterStreetNumber
                    ? setPatientRegisterStreetNumber(e.target.value)
                    : setPatientRegisterStreetName
                      ? setPatientRegisterStreetName(e.target.value)
                      : setPatientRegisterPostalCode
                        ? setPatientRegisterPostalCode(e.target.value)
                        : setPatientRegisterCity
                          ? setPatientRegisterCity(e.target.value)
                          : setPatientRegisterTelephone
                            ? setPatientRegisterTelephone(e.target.value)
                            : ''
          }`;
        }}
      />
    </div>
  );
}
