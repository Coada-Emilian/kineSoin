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
  isAdminTherapistAddDiplomaInput?: boolean;
  isAdminTherapistAddExperienceInput?: boolean;
  isAdminTherapistAddSpecialtyInput?: boolean;
  isAdminTherapistAddDescriptionInput?: boolean;
  isTextAreaInput?: boolean;
  isAdminAfflictionAddNameInput?: boolean;
  isAdminAfflictionAddLicenceCodeInput?: boolean;
  isAdminAfflictionAddDescriptionInput?: boolean;
  isAdminRegionAddNameInput?: boolean;
  isAdminMedicAddNameInput?: boolean;
  isAdminMedicAddSurnameInput?: boolean;
  isAdminMedicAddLicenceCodeInput?: boolean;
  isAdminMedicAddStreetNumberInput?: boolean;
  isAdminMedicAddStreetNameInput?: boolean;
  isAdminMedicAddPostalCodeInput?: boolean;
  isAdminMedicAddCityInput?: boolean;
  isAdminInsuranceAddNameInput?: boolean;
  isAdminInsuranceAddLicenceCodeInput?: boolean;
  isAdminInsuranceAddStreetNumberInput?: boolean;
  isAdminInsuranceAddStreetNameInput?: boolean;
  isAdminInsuranceAddPostalCodeInput?: boolean;
  isAdminInsuranceAddCityInput?: boolean;
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
  isAdminTherapistAddDiplomaInput,
  isAdminTherapistAddExperienceInput,
  isAdminTherapistAddSpecialtyInput,
  isAdminTherapistAddDescriptionInput,
  isTextAreaInput,
  isAdminAfflictionAddNameInput,
  isAdminAfflictionAddLicenceCodeInput,
  isAdminAfflictionAddDescriptionInput,
  isAdminRegionAddNameInput,
  isAdminMedicAddNameInput,
  isAdminMedicAddSurnameInput,
  isAdminMedicAddLicenceCodeInput,
  isAdminMedicAddStreetNumberInput,
  isAdminMedicAddStreetNameInput,
  isAdminMedicAddPostalCodeInput,
  isAdminMedicAddCityInput,
  isAdminInsuranceAddCityInput,
  isAdminInsuranceAddLicenceCodeInput,
  isAdminInsuranceAddNameInput,
  isAdminInsuranceAddPostalCodeInput,
  isAdminInsuranceAddStreetNameInput,
  isAdminInsuranceAddStreetNumberInput,
}: StandardTextInputProps) {
  return (
    <div
      className={`${
        isStreetNumberInput ||
        isPostalCodeInput ||
        isAdminMedicAddStreetNumberInput ||
        isAdminMedicAddPostalCodeInput ||
        isAdminInsuranceAddStreetNumberInput ||
        isAdminInsuranceAddPostalCodeInput
          ? 'w-4/12'
          : 'w-full'
      } flex flex-col gap-2 mb-4 italic`}
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
                                  : isAdminTherapistAddDiplomaInput
                                    ? 'therapist-diploma_input'
                                    : isAdminTherapistAddExperienceInput
                                      ? 'therapist-experience_input'
                                      : isAdminTherapistAddSpecialtyInput
                                        ? 'therapist-specialty_input'
                                        : isAdminTherapistAddDescriptionInput
                                          ? 'therapist-description_input'
                                          : isAdminAfflictionAddNameInput
                                            ? 'affliction-name_input'
                                            : isAdminAfflictionAddLicenceCodeInput
                                              ? 'affliction-insurance-code_input'
                                              : isAdminAfflictionAddDescriptionInput
                                                ? 'affliction-description_input'
                                                : isAdminRegionAddNameInput
                                                  ? 'region-name_input'
                                                  : isAdminMedicAddNameInput
                                                    ? 'medic-name_input'
                                                    : isAdminMedicAddSurnameInput
                                                      ? 'medic-surname_input'
                                                      : isAdminMedicAddLicenceCodeInput
                                                        ? 'medic-licence-code_input'
                                                        : isAdminMedicAddStreetNumberInput
                                                          ? 'medic-street_number_input'
                                                          : isAdminMedicAddStreetNameInput
                                                            ? 'medic-street_name_input'
                                                            : isAdminMedicAddPostalCodeInput
                                                              ? 'medic-postal_code_input'
                                                              : isAdminMedicAddCityInput
                                                                ? 'medic-city_input'
                                                                : isAdminInsuranceAddNameInput
                                                                  ? 'insurance-name_input'
                                                                  : isAdminInsuranceAddLicenceCodeInput
                                                                    ? 'insurance-licence-code_input'
                                                                    : isAdminInsuranceAddStreetNumberInput
                                                                      ? 'insurance-street_number_input'
                                                                      : isAdminInsuranceAddStreetNameInput
                                                                        ? 'insurance-street_name_input'
                                                                        : isAdminInsuranceAddPostalCodeInput
                                                                          ? 'insurance-postal_code_input'
                                                                          : isAdminInsuranceAddCityInput
                                                                            ? 'insurance-city_input'
                                                                            : ''
        }`}
        className={`${
          isStreetNameInput ||
          isCityInput ||
          isStreetNumberInput ||
          isPostalCodeInput ||
          isAdminMedicAddCityInput ||
          isAdminMedicAddStreetNameInput ||
          isAdminMedicAddStreetNumberInput ||
          isAdminMedicAddPostalCodeInput ||
          isAdminInsuranceAddCityInput ||
          isAdminInsuranceAddStreetNameInput ||
          isAdminInsuranceAddStreetNumberInput ||
          isAdminInsuranceAddPostalCodeInput
            ? 'text-xs'
            : 'text-sm'
        } text-primaryBlue font-medium`}
      >
        {isNameInput ||
        isAdminRegionAddNameInput ||
        isAdminTherapistAddNameInput ||
        isAdminMedicAddNameInput ||
        isAdminInsuranceAddNameInput
          ? 'Nom'
          : isSurnameInput ||
              isAdminTherapistAddSurnameInput ||
              isAdminMedicAddSurnameInput
            ? 'Prénom'
            : isBirthNameInput
              ? 'Nom de naissance'
              : isStreetNumberInput ||
                  isAdminMedicAddStreetNumberInput ||
                  isAdminInsuranceAddStreetNumberInput
                ? 'N° de rue'
                : isStreetNameInput ||
                    isAdminMedicAddStreetNameInput ||
                    isAdminInsuranceAddStreetNameInput
                  ? 'Nom de rue'
                  : isPostalCodeInput ||
                      isAdminMedicAddPostalCodeInput ||
                      isAdminInsuranceAddPostalCodeInput
                    ? 'Code postal'
                    : isCityInput ||
                        isAdminMedicAddCityInput ||
                        isAdminInsuranceAddCityInput
                      ? 'Ville'
                      : isAppointmentNumberInput
                        ? 'Quantité seances prescrites :'
                        : isAdminTherapistAddLicenceCodeInput ||
                            isAdminMedicAddLicenceCodeInput
                          ? 'Code ADELI'
                          : isAdminTherapistAddDiplomaInput
                            ? 'Diplôme'
                            : isAdminTherapistAddExperienceInput
                              ? 'Expérience'
                              : isAdminTherapistAddSpecialtyInput
                                ? 'Spécialité'
                                : isAdminTherapistAddDescriptionInput
                                  ? 'Description'
                                  : isAdminAfflictionAddNameInput
                                    ? "Nom de l'affliction"
                                    : isAdminAfflictionAddLicenceCodeInput
                                      ? 'Cotation'
                                      : isAdminAfflictionAddDescriptionInput
                                        ? 'Description'
                                        : isAdminInsuranceAddLicenceCodeInput
                                          ? 'Code AMC'
                                          : ''}
      </label>
      {!isTextAreaInput ? (
        <input
          type="text"
          name={`${
            isNameInput ||
            isAdminTherapistAddNameInput ||
            isAdminAfflictionAddNameInput ||
            isAdminRegionAddNameInput ||
            isAdminMedicAddNameInput ||
            isAdminInsuranceAddNameInput
              ? 'name'
              : isSurnameInput ||
                  isAdminTherapistAddSurnameInput ||
                  isAdminMedicAddSurnameInput
                ? 'surname'
                : isBirthNameInput
                  ? 'birth_name'
                  : isStreetNumberInput ||
                      isAdminMedicAddStreetNumberInput ||
                      isAdminInsuranceAddStreetNumberInput
                    ? 'street_number'
                    : isStreetNameInput ||
                        isAdminMedicAddStreetNameInput ||
                        isAdminInsuranceAddStreetNameInput
                      ? 'street_name'
                      : isPostalCodeInput ||
                          isAdminMedicAddPostalCodeInput ||
                          isAdminInsuranceAddPostalCodeInput
                        ? 'postal_code'
                        : isCityInput ||
                            isAdminMedicAddCityInput ||
                            isAdminInsuranceAddCityInput
                          ? 'city'
                          : isAppointmentNumberInput
                            ? 'appointment_quantity'
                            : isPatientMessageInput
                              ? 'content'
                              : isAdminTherapistAddLicenceCodeInput ||
                                  isAdminMedicAddLicenceCodeInput
                                ? 'licence_code'
                                : isAdminTherapistAddDiplomaInput
                                  ? 'diploma'
                                  : isAdminTherapistAddExperienceInput
                                    ? 'experience'
                                    : isAdminTherapistAddSpecialtyInput
                                      ? 'specialty'
                                      : isAdminTherapistAddDescriptionInput
                                        ? 'description'
                                        : isAdminAfflictionAddLicenceCodeInput
                                          ? 'insurance_code'
                                          : isAdminInsuranceAddLicenceCodeInput
                                            ? 'amc_code'
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
                                  : isAdminTherapistAddDiplomaInput
                                    ? 'therapist-diploma_input'
                                    : isAdminTherapistAddExperienceInput
                                      ? 'therapist-experience_input'
                                      : isAdminTherapistAddSpecialtyInput
                                        ? 'therapist-specialty_input'
                                        : isAdminTherapistAddDescriptionInput
                                          ? 'therapist-description_input'
                                          : isAdminAfflictionAddNameInput
                                            ? 'affliction-name_input'
                                            : isAdminAfflictionAddLicenceCodeInput
                                              ? 'affliction-insurance-code_input'
                                              : isAdminRegionAddNameInput
                                                ? 'region-name_input'
                                                : isAdminMedicAddNameInput
                                                  ? 'medic-name_input'
                                                  : isAdminMedicAddSurnameInput
                                                    ? 'medic-surname_input'
                                                    : isAdminMedicAddLicenceCodeInput
                                                      ? 'medic-licence-code_input'
                                                      : isAdminMedicAddStreetNumberInput
                                                        ? 'medic-street_number_input'
                                                        : isAdminMedicAddStreetNameInput
                                                          ? 'medic-street_name_input'
                                                          : isAdminMedicAddPostalCodeInput
                                                            ? 'medic-postal_code_input'
                                                            : isAdminMedicAddCityInput
                                                              ? 'medic-city_input'
                                                              : isAdminInsuranceAddNameInput
                                                                ? 'insurance-name_input'
                                                                : isAdminInsuranceAddLicenceCodeInput
                                                                  ? 'insurance-licence-code_input'
                                                                  : isAdminInsuranceAddStreetNumberInput
                                                                    ? 'insurance-street_number_input'
                                                                    : isAdminInsuranceAddStreetNameInput
                                                                      ? 'insurance-street_name_input'
                                                                      : isAdminInsuranceAddPostalCodeInput
                                                                        ? 'insurance-postal_code_input'
                                                                        : isAdminInsuranceAddCityInput
                                                                          ? 'insurance-city_input'
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
                  : isStreetNumberInput ||
                      isAdminMedicAddStreetNumberInput ||
                      isAdminInsuranceAddStreetNumberInput
                    ? 'N° de rue'
                    : isStreetNameInput
                      ? 'Nom de rue'
                      : isPostalCodeInput ||
                          isAdminMedicAddPostalCodeInput ||
                          isAdminInsuranceAddPostalCodeInput
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
                                    : isAdminTherapistAddDiplomaInput
                                      ? 'Entrez le diplôme du kiné'
                                      : isAdminTherapistAddExperienceInput
                                        ? "Entrez l'expérience du kiné"
                                        : isAdminTherapistAddSpecialtyInput
                                          ? 'Entrez la spécialité du kiné'
                                          : isAdminTherapistAddDescriptionInput
                                            ? 'Entrez la description du kiné'
                                            : isAdminAfflictionAddNameInput
                                              ? "Entrez le nom de l'affliction"
                                              : isAdminAfflictionAddLicenceCodeInput
                                                ? "Entrez la cotation de l'affliction"
                                                : isAdminRegionAddNameInput
                                                  ? 'Entrez le nom de la région'
                                                  : isAdminMedicAddNameInput
                                                    ? 'Entrez le nom du médecin'
                                                    : isAdminMedicAddSurnameInput
                                                      ? 'Entrez le prénom du médecin'
                                                      : isAdminMedicAddLicenceCodeInput
                                                        ? 'Entrez le code ADELI du médecin'
                                                        : isAdminMedicAddStreetNameInput
                                                          ? 'Entrez le nom de rue du médecin'
                                                          : isAdminMedicAddCityInput
                                                            ? 'Entrez la ville du médecin'
                                                            : isAdminInsuranceAddNameInput
                                                              ? "Entrez le nom de l'assurance"
                                                              : isAdminInsuranceAddLicenceCodeInput
                                                                ? "Entrez le code AMC de l'assurance"
                                                                : isAdminInsuranceAddStreetNameInput
                                                                  ? "Entrez le nom de rue de l'assurance"
                                                                  : isAdminInsuranceAddCityInput
                                                                    ? "Entrez la ville de l'assurance"
                                                                    : ''
          }`}
          required={!isStreetNumberInput}
        />
      ) : (
        <textarea
          name="description"
          id={`${
            isAdminTherapistAddDescriptionInput
              ? 'therapist-description_input'
              : isAdminAfflictionAddDescriptionInput
                ? 'affliction-description_input'
                : isAdminAfflictionAddDescriptionInput
                  ? 'affliction-description_input'
                  : ''
          }`}
          placeholder={`${
            isAdminTherapistAddDescriptionInput
              ? 'Description du kinésithérapeute'
              : isAdminAfflictionAddDescriptionInput
                ? "Description de l'affliction"
                : ''
          }`}
          className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal sm:text-xs"
          required
          rows={5}
          cols={32}
        ></textarea>
      )}
    </div>
  );
}
