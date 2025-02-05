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
  isAppointmentNumberInput?: boolean;
  isPatientMessageInput?: boolean;
  isAdminTherapistAddNameInput?: boolean;
  isAdminTherapistAddSurnameInput?: boolean;
  isAdminTherapistAddLicenceCodeInput?: boolean;
}

export default function StandardTextInput({
  isNameInput,
  isSurnameInput,
  isBirthNameInput,
  isStreetNumberInput,
  isStreetNameInput,
  isPostalCodeInput,
  isCityInput,
  isAppointmentNumberInput,
  isPatientMessageInput,
  isAdminTherapistAddNameInput,
  isAdminTherapistAddSurnameInput,
  isAdminTherapistAddLicenceCodeInput,
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
                        : isAppointmentNumberInput
                          ? 'appointment-number_input'
                          : isPatientMessageInput
                            ? 'patient-message-input'
                            : isAdminTherapistAddNameInput
                              ? 'therapist-name_input'
                              : isAdminTherapistAddSurnameInput
                                ? 'therapist-surname_input'
                                : isAdminTherapistAddLicenceCodeInput
                                  ? 'therapist-licence-code_input'
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
                      : isAppointmentNumberInput
                        ? 'Quantité seances prescrites :'
                        : isAdminTherapistAddNameInput
                          ? 'Nom'
                          : isAdminTherapistAddSurnameInput
                            ? 'Prénom'
                            : isAdminTherapistAddLicenceCodeInput
                              ? 'Code ADELI'
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
                        : isAppointmentNumberInput
                          ? 'appointment_quantity'
                          : isPatientMessageInput
                            ? 'content'
                            : isAdminTherapistAddNameInput
                              ? 'name'
                              : isAdminTherapistAddSurnameInput
                                ? 'surname'
                                : isAdminTherapistAddLicenceCodeInput
                                  ? 'licence_code'
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
                        : isAppointmentNumberInput
                          ? 'appointment-number_input'
                          : isAdminTherapistAddNameInput
                            ? 'therapist-name_input'
                            : isAdminTherapistAddSurnameInput
                              ? 'therapist-surname_input'
                              : isAdminTherapistAddLicenceCodeInput
                                ? 'therapist-licence-code_input'
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
                        : isAppointmentNumberInput
                          ? 'Seances prescrites'
                          : isPatientMessageInput
                            ? 'Tapez votre message...'
                            : isAdminTherapistAddNameInput
                              ? 'Entrez le nom du kiné'
                              : isAdminTherapistAddSurnameInput
                                ? 'Entrez le prénom du kiné'
                                : isAdminTherapistAddLicenceCodeInput
                                  ? 'Entrez le code ADELI du kiné'
                                  : ''
        }`}
        required={!isStreetNumberInput}
      />
    </div>
  );
}
