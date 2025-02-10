import { useState } from 'react';
import { IAffliction } from '../../../../@types/IAffliction';
import { IInsurance } from '../../../../@types/IInsurance';
import { IMedic } from '../../../../@types/IMedic';
import { ITherapist } from '../../../../@types/ITherapist';

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
  isAdminTherapistEditSurnameInput?: boolean;
  isAdminMedicEditSurnameInput?: boolean;
  therapist?: ITherapist | null;
  medic?: IMedic | null;
  affliction?: IAffliction | null;
  insurance?: IInsurance | null;
  isAdminTherapistEditNameInput?: boolean;
  isAdminAfflictionEditNameInput?: boolean;
  isAdminMedicEditNameInput?: boolean;
  isAdminInsuranceEditNameInput?: boolean;
  isAdminTherapistEditLicenceCodeInput?: boolean;
  isAdminTherapistEditDiplomaInput?: boolean;
  isAdminTherapistEditExperienceInput?: boolean;
  isAdminTherapistEditSpecialtyInput?: boolean;
  isAdminTherapistEditDescriptionInput?: boolean;
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
  isAdminTherapistEditSurnameInput,
  isAdminMedicEditSurnameInput,
  therapist,
  medic,
  affliction,
  insurance,
  isAdminTherapistEditNameInput,
  isAdminAfflictionEditNameInput,
  isAdminMedicEditNameInput,
  isAdminInsuranceEditNameInput,
  isAdminTherapistEditLicenceCodeInput,
  isAdminTherapistEditDiplomaInput,
  isAdminTherapistEditExperienceInput,
  isAdminTherapistEditSpecialtyInput,
  isAdminTherapistEditDescriptionInput,
}: StandardTextInputProps) {
  const [therapistName, setTherapistName] = useState<string>(
    therapist?.name || ''
  );
  const [therapistSurname, setTherapistSurname] = useState<string>(
    therapist?.surname || ''
  );
  const [therapistLicenceCode, setTherapistLicenceCode] = useState<string>(
    therapist?.licence_code || ''
  );
  const [therapistDiploma, setTherapistDiploma] = useState<string>(
    therapist?.diploma || ''
  );
  const [therapistExperience, setTherapistExperience] = useState<string>(
    therapist?.experience || ''
  );
  const [therapistSpecialty, setTherapistSpecialty] = useState<string>(
    therapist?.specialty || ''
  );
  const [therapistDescription, setTherapistDescription] = useState<string>(
    therapist?.description || ''
  );

  return (
    <div
      className={`${
        isStreetNumberInput ||
        isPostalCodeInput ||
        isAdminMedicAddStreetNumberInput ||
        isAdminMedicAddPostalCodeInput ||
        isAdminInsuranceAddStreetNumberInput ||
        isAdminInsuranceAddPostalCodeInput
          ? 'w-4/12 flex flex-col mb-4'
          : isAdminTherapistEditSurnameInput ||
              isAdminMedicEditSurnameInput ||
              isAdminTherapistEditNameInput ||
              isAdminAfflictionEditNameInput ||
              isAdminMedicEditNameInput ||
              isAdminInsuranceEditNameInput ||
              isAdminTherapistEditLicenceCodeInput ||
              isAdminTherapistEditDiplomaInput ||
              isAdminTherapistEditExperienceInput ||
              isAdminTherapistEditSpecialtyInput
            ? 'flex flex-row items-center gap-2 mb-2 w-full'
            : 'w-full flex flex-col mb-4 '
      } gap-2 italic`}
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
                            : isAdminTherapistAddNameInput ||
                                isAdminTherapistEditNameInput
                              ? 'therapist-name_input'
                              : isAdminTherapistAddSurnameInput ||
                                  isAdminTherapistEditSurnameInput
                                ? 'therapist-surname_input'
                                : isAdminTherapistAddLicenceCodeInput ||
                                    isAdminTherapistEditLicenceCodeInput
                                  ? 'therapist-licence-code_input'
                                  : isAdminTherapistAddDiplomaInput ||
                                      isAdminTherapistEditDiplomaInput
                                    ? 'therapist-diploma_input'
                                    : isAdminTherapistAddExperienceInput ||
                                        isAdminTherapistEditExperienceInput
                                      ? 'therapist-experience_input'
                                      : isAdminTherapistAddSpecialtyInput ||
                                          isAdminTherapistEditSpecialtyInput
                                        ? 'therapist-specialty_input'
                                        : isAdminTherapistAddDescriptionInput ||
                                            isAdminTherapistEditDescriptionInput
                                          ? 'therapist-description_input'
                                          : isAdminAfflictionAddNameInput ||
                                              isAdminAfflictionEditNameInput
                                            ? 'affliction-name_input'
                                            : isAdminAfflictionAddLicenceCodeInput
                                              ? 'affliction-insurance-code_input'
                                              : isAdminAfflictionAddDescriptionInput
                                                ? 'affliction-description_input'
                                                : isAdminRegionAddNameInput
                                                  ? 'region-name_input'
                                                  : isAdminMedicAddNameInput ||
                                                      isAdminMedicEditNameInput
                                                    ? 'medic-name_input'
                                                    : isAdminMedicAddSurnameInput ||
                                                        isAdminMedicEditSurnameInput
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
                                                                : isAdminInsuranceAddNameInput ||
                                                                    isAdminInsuranceEditNameInput
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
            : isAdminTherapistEditSurnameInput ||
                isAdminMedicEditSurnameInput ||
                isAdminTherapistEditNameInput ||
                isAdminAfflictionEditNameInput ||
                isAdminMedicEditNameInput ||
                isAdminInsuranceEditNameInput ||
                isAdminTherapistEditLicenceCodeInput ||
                isAdminTherapistEditDiplomaInput ||
                isAdminTherapistEditExperienceInput ||
                isAdminTherapistEditSpecialtyInput ||
                isAdminTherapistEditDescriptionInput
              ? 'text-base md:text-lg xl:text-xl 2xl:text-2xl '
              : 'text-sm'
        } text-primaryBlue font-medium`}
      >
        {isNameInput ||
        isAdminRegionAddNameInput ||
        isAdminTherapistAddNameInput ||
        isAdminMedicAddNameInput ||
        isAdminInsuranceAddNameInput ||
        isAdminInsuranceEditNameInput ||
        isAdminAfflictionEditNameInput ||
        isAdminMedicEditNameInput ||
        isAdminTherapistEditNameInput
          ? 'Nom'
          : isSurnameInput ||
              isAdminTherapistAddSurnameInput ||
              isAdminMedicAddSurnameInput ||
              isAdminTherapistEditSurnameInput ||
              isAdminMedicEditSurnameInput
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
                            isAdminMedicAddLicenceCodeInput ||
                            isAdminTherapistEditLicenceCodeInput
                          ? 'Code ADELI'
                          : isAdminTherapistAddDiplomaInput ||
                              isAdminTherapistEditDiplomaInput
                            ? 'Diplôme'
                            : isAdminTherapistAddExperienceInput ||
                                isAdminTherapistEditExperienceInput
                              ? 'Expérience'
                              : isAdminTherapistAddSpecialtyInput ||
                                  isAdminTherapistEditSpecialtyInput
                                ? 'Spécialité'
                                : isAdminTherapistAddDescriptionInput ||
                                    isAdminTherapistEditDescriptionInput
                                  ? 'Description'
                                  : isAdminAfflictionAddNameInput
                                    ? "Nom de l'affliction"
                                    : isAdminAfflictionAddLicenceCodeInput
                                      ? 'Cotation'
                                      : isAdminAfflictionAddDescriptionInput ||
                                          isAdminTherapistEditDescriptionInput
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
            isAdminInsuranceAddNameInput ||
            isAdminInsuranceEditNameInput ||
            isAdminAfflictionEditNameInput ||
            isAdminMedicEditNameInput ||
            isAdminTherapistEditNameInput
              ? 'name'
              : isSurnameInput ||
                  isAdminTherapistAddSurnameInput ||
                  isAdminMedicAddSurnameInput ||
                  isAdminTherapistEditSurnameInput ||
                  isAdminMedicEditSurnameInput
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
                                  isAdminMedicAddLicenceCodeInput ||
                                  isAdminTherapistEditLicenceCodeInput
                                ? 'licence_code'
                                : isAdminTherapistAddDiplomaInput ||
                                    isAdminTherapistEditDiplomaInput
                                  ? 'diploma'
                                  : isAdminTherapistAddExperienceInput ||
                                      isAdminTherapistEditExperienceInput
                                    ? 'experience'
                                    : isAdminTherapistAddSpecialtyInput ||
                                        isAdminTherapistEditSpecialtyInput
                                      ? 'specialty'
                                      : // : isAdminTherapistAddDescriptionInput ||
                                        //     isAdminTherapistEditDescriptionInput
                                        //   ? 'description'
                                        isAdminAfflictionAddLicenceCodeInput
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
                            : isAdminTherapistAddNameInput ||
                                isAdminTherapistEditNameInput
                              ? 'therapist-name_input'
                              : isAdminTherapistAddSurnameInput ||
                                  isAdminTherapistEditSurnameInput
                                ? 'therapist-surname_input'
                                : isAdminTherapistAddLicenceCodeInput ||
                                    isAdminTherapistEditLicenceCodeInput
                                  ? 'therapist-licence-code_input'
                                  : isAdminTherapistAddDiplomaInput ||
                                      isAdminTherapistEditDiplomaInput
                                    ? 'therapist-diploma_input'
                                    : isAdminTherapistAddExperienceInput ||
                                        isAdminTherapistEditExperienceInput
                                      ? 'therapist-experience_input'
                                      : isAdminTherapistAddSpecialtyInput ||
                                          isAdminTherapistEditSpecialtyInput
                                        ? 'therapist-specialty_input'
                                        : // : isAdminTherapistAddDescriptionInput ||
                                          //     isAdminTherapistEditDescriptionInput
                                          //   ? 'therapist-description_input'
                                          isAdminAfflictionAddNameInput ||
                                            isAdminAfflictionEditNameInput
                                          ? 'affliction-name_input'
                                          : isAdminAfflictionAddLicenceCodeInput
                                            ? 'affliction-insurance-code_input'
                                            : isAdminRegionAddNameInput
                                              ? 'region-name_input'
                                              : isAdminMedicAddNameInput ||
                                                  isAdminMedicEditNameInput
                                                ? 'medic-name_input'
                                                : isAdminMedicAddSurnameInput ||
                                                    isAdminMedicEditSurnameInput
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
                                                            : isAdminInsuranceAddNameInput ||
                                                                isAdminInsuranceEditNameInput
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
                                                                    : isAdminMedicEditSurnameInput &&
                                                                        medic
                                                                      ? medic.surname
                                                                      : isAdminAfflictionEditNameInput &&
                                                                          affliction
                                                                        ? affliction.name
                                                                        : isAdminMedicEditNameInput &&
                                                                            medic
                                                                          ? medic.name
                                                                          : isAdminInsuranceEditNameInput &&
                                                                              insurance
                                                                            ? insurance.name
                                                                            : ''
          }`}
          required={!isStreetNumberInput}
          value={
            isAdminTherapistEditNameInput
              ? therapistName
              : isAdminTherapistEditSurnameInput
                ? therapistSurname
                : isAdminTherapistEditLicenceCodeInput
                  ? therapistLicenceCode
                  : isAdminTherapistEditDiplomaInput
                    ? therapistDiploma
                    : isAdminTherapistEditExperienceInput
                      ? therapistExperience
                      : isAdminTherapistEditSpecialtyInput
                        ? therapistSpecialty
                        : ''
          }
          onChange={(e) => {
            if (therapist) {
              if (isAdminTherapistEditNameInput) {
                setTherapistName(e.target.value);
              } else if (isAdminTherapistEditSurnameInput) {
                setTherapistSurname(e.target.value);
              } else if (isAdminTherapistEditLicenceCodeInput) {
                setTherapistLicenceCode(e.target.value);
              } else if (isAdminTherapistEditDiplomaInput) {
                setTherapistDiploma(e.target.value);
              } else if (isAdminTherapistEditExperienceInput) {
                setTherapistExperience(e.target.value);
              } else if (isAdminTherapistEditSpecialtyInput) {
                setTherapistSpecialty(e.target.value);
              }
            }
          }}
        />
      ) : (
        <textarea
          name="description"
          id={`${
            isAdminTherapistAddDescriptionInput ||
            isAdminTherapistEditDescriptionInput
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
                : isAdminTherapistEditDescriptionInput && therapist
                  ? therapist.description
                  : ''
          }`}
          value={therapistDescription}
          onChange={(e) => setTherapistDescription(e.target.value)}
          className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal sm:text-xs"
          required
          rows={5}
          cols={32}
        ></textarea>
      )}
    </div>
  );
}
