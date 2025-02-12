import { useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  ITherapist,
} from '../../../../@types/types';

interface GeneralInputProps {
  isNameInput?: boolean;
  isSurnameInput?: boolean;
  isBirthNameInput?: boolean;
  isStreetNumberInput?: boolean;
  isStreetNameInput?: boolean;
  isPostalCodeInput?: boolean;
  isCityInput?: boolean;
  isAppointmentNumberInput?: boolean;
  isPatientMessageInput?: boolean;
  isTextAreaInput?: boolean;
}

interface PatientRegisterProps {
  patientRegisterName?: string;
  patientRegisterSurname?: string;
  patientRegisterBirthName?: string;
  patientRegisterStreetNumber?: string;
  patientRegisterStreetName?: string;
  patientRegisterPostalCode?: string;
  patientRegisterCity?: string;
  patientRegisterTelephone?: string;
}

interface AdminTherapistProps {
  isAdminTherapistAddNameInput?: boolean;
  isAdminTherapistAddSurnameInput?: boolean;
  isAdminTherapistAddLicenceCodeInput?: boolean;
  isAdminTherapistAddDiplomaInput?: boolean;
  isAdminTherapistAddExperienceInput?: boolean;
  isAdminTherapistAddSpecialtyInput?: boolean;
  isAdminTherapistAddDescriptionInput?: boolean;
  isAdminTherapistEditSurnameInput?: boolean;
  isAdminTherapistEditNameInput?: boolean;
  isAdminTherapistEditLicenceCodeInput?: boolean;
  isAdminTherapistEditDiplomaInput?: boolean;
  isAdminTherapistEditExperienceInput?: boolean;
  isAdminTherapistEditSpecialtyInput?: boolean;
  isAdminTherapistEditDescriptionInput?: boolean;
}

interface AdminAfflictionProps {
  isAdminAfflictionAddNameInput?: boolean;
  isAdminAfflictionAddLicenceCodeInput?: boolean;
  isAdminAfflictionAddDescriptionInput?: boolean;
  isAdminAfflictionEditNameInput?: boolean;
  isAdminAfflictionEditInsuranceCodeInput?: boolean;
  isAdminAfflictionEditDescriptionInput?: boolean;
}

interface AdminMedicProps {
  isAdminMedicAddNameInput?: boolean;
  isAdminMedicAddSurnameInput?: boolean;
  isAdminMedicAddLicenceCodeInput?: boolean;
  isAdminMedicAddStreetNumberInput?: boolean;
  isAdminMedicAddStreetNameInput?: boolean;
  isAdminMedicAddPostalCodeInput?: boolean;
  isAdminMedicAddCityInput?: boolean;
  isAdminMedicEditSurnameInput?: boolean;
  isAdminMedicEditNameInput?: boolean;
  isAdminMedicEditStreetNumberInput?: boolean;
  isAdminMedicEditStreetNameInput?: boolean;
  isAdminMedicEditPostalCodeInput?: boolean;
  isAdminMedicEditCityInput?: boolean;
  isAdminMedicEditLicenceCodeInput?: boolean;
}

interface AdminInsuranceProps {
  isAdminInsuranceAddNameInput?: boolean;
  isAdminInsuranceAddLicenceCodeInput?: boolean;
  isAdminInsuranceAddStreetNumberInput?: boolean;
  isAdminInsuranceAddStreetNameInput?: boolean;
  isAdminInsuranceAddPostalCodeInput?: boolean;
  isAdminInsuranceAddCityInput?: boolean;
  isAdminInsuranceEditNameInput?: boolean;
  isAdminInsuranceEditStreetNumberInput?: boolean;
  isAdminInsuranceEditStreetNameInput?: boolean;
  isAdminInsuranceEditPostalCodeInput?: boolean;
  isAdminInsuranceEditCityInput?: boolean;
  isAdminInsuranceEditAMCCodeInput?: boolean;
}

interface DataInputProps {
  therapist?: ITherapist | null;
  medic?: IMedic | null;
  affliction?: IAffliction | null;
  insurance?: IInsurance | null;
}

interface AdminRegionProps {
  isAdminRegionAddNameInput?: boolean;
}

interface StandardTextInputProps {
  generalInput?: GeneralInputProps;
  patientRegister?: PatientRegisterProps;
  adminTherapist?: AdminTherapistProps;
  adminAffliction?: AdminAfflictionProps;
  adminMedic?: AdminMedicProps;
  adminInsurance?: AdminInsuranceProps;
  dataInput?: DataInputProps;
  adminRegion?: AdminRegionProps;
}

export default function StandardTextInput({
  generalInput,
  patientRegister,
  adminTherapist,
  adminAffliction,
  adminMedic,
  adminInsurance,
  dataInput,
  adminRegion,
}: StandardTextInputProps) {
  const [therapistState, setTherapistState] = useState({
    name: dataInput?.therapist?.name || '',
    surname: dataInput?.therapist?.surname || '',
    licenceCode: dataInput?.therapist?.licence_code || '',
    diploma: dataInput?.therapist?.diploma || '',
    experience: dataInput?.therapist?.experience || '',
    specialty: dataInput?.therapist?.specialty || '',
    description: dataInput?.therapist?.description || '',
  });

  const [afflictionState, setAfflictionState] = useState({
    name: dataInput?.affliction?.name || '',
    insuranceCode: dataInput?.affliction?.insurance_code || '',
    description: dataInput?.affliction?.description || '',
  });

  const [medicState, setMedicState] = useState({
    name: dataInput?.medic?.name || '',
    surname: dataInput?.medic?.surname || '',
    licenceCode: dataInput?.medic?.licence_code || '',
    streetName: dataInput?.medic?.street_name || '',
    streetNumber: dataInput?.medic?.street_number || '',
    postalCode: dataInput?.medic?.postal_code || '',
    city: dataInput?.medic?.city || '',
  });

  const [insuranceState, setInsuranceState] = useState({
    name: dataInput?.insurance?.name || '',
    streetName: dataInput?.insurance?.street_name || '',
    streetNumber: dataInput?.insurance?.street_number || '',
    postalCode: dataInput?.insurance?.postal_code || '',
    city: dataInput?.insurance?.city || '',
    amcCode: dataInput?.insurance?.amc_code || '',
  });

  const handleTherapistChange = (
    field: keyof typeof therapistState,
    value: string
  ) => {
    setTherapistState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAfflictionChange = (
    field: keyof typeof afflictionState,
    value: string
  ) => {
    setAfflictionState((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicChange = (field: keyof typeof medicState, value: string) => {
    setMedicState((prev) => ({ ...prev, [field]: value }));
  };

  const handleInsuranceChange = (
    field: keyof typeof insuranceState,
    value: string
  ) => {
    setInsuranceState((prev) => ({ ...prev, [field]: value }));
  };

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
              isAdminTherapistEditSpecialtyInput ||
              isAdminAfflictionEditInsuranceCodeInput ||
              isAdminMedicEditCityInput ||
              isAdminMedicEditStreetNameInput ||
              isAdminMedicEditStreetNumberInput ||
              isAdminMedicEditPostalCodeInput ||
              isAdminMedicEditLicenceCodeInput ||
              isAdminInsuranceEditCityInput ||
              isAdminInsuranceEditPostalCodeInput ||
              isAdminInsuranceEditStreetNameInput ||
              isAdminInsuranceEditStreetNumberInput ||
              isAdminInsuranceEditAMCCodeInput
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
                                            : isAdminAfflictionAddLicenceCodeInput ||
                                                isAdminAfflictionEditInsuranceCodeInput
                                              ? 'affliction-insurance-code_input'
                                              : isAdminAfflictionAddDescriptionInput ||
                                                  isAdminAfflictionEditDescriptionInput
                                                ? 'affliction-description_input'
                                                : isAdminRegionAddNameInput
                                                  ? 'region-name_input'
                                                  : isAdminMedicAddNameInput ||
                                                      isAdminMedicEditNameInput
                                                    ? 'medic-name_input'
                                                    : isAdminMedicAddSurnameInput ||
                                                        isAdminMedicEditSurnameInput
                                                      ? 'medic-surname_input'
                                                      : isAdminMedicAddLicenceCodeInput ||
                                                          isAdminMedicEditLicenceCodeInput
                                                        ? 'medic-licence-code_input'
                                                        : isAdminMedicAddStreetNumberInput ||
                                                            isAdminMedicEditStreetNumberInput
                                                          ? 'medic-street_number_input'
                                                          : isAdminMedicAddStreetNameInput ||
                                                              isAdminMedicEditStreetNameInput
                                                            ? 'medic-street_name_input'
                                                            : isAdminMedicAddPostalCodeInput ||
                                                                isAdminMedicEditPostalCodeInput
                                                              ? 'medic-postal_code_input'
                                                              : isAdminMedicAddCityInput ||
                                                                  isAdminMedicEditCityInput
                                                                ? 'medic-city_input'
                                                                : isAdminInsuranceAddNameInput ||
                                                                    isAdminInsuranceEditNameInput
                                                                  ? 'insurance-name_input'
                                                                  : isAdminInsuranceAddLicenceCodeInput ||
                                                                      isAdminInsuranceEditAMCCodeInput
                                                                    ? 'insurance-licence-code_input'
                                                                    : isAdminInsuranceAddStreetNumberInput ||
                                                                        isAdminInsuranceEditStreetNumberInput
                                                                      ? 'insurance-street_number_input'
                                                                      : isAdminInsuranceAddStreetNameInput ||
                                                                          isAdminInsuranceEditStreetNameInput
                                                                        ? 'insurance-street_name_input'
                                                                        : isAdminInsuranceAddPostalCodeInput ||
                                                                            isAdminInsuranceEditPostalCodeInput
                                                                          ? 'insurance-postal_code_input'
                                                                          : isAdminInsuranceAddCityInput ||
                                                                              isAdminInsuranceEditCityInput
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
                isAdminTherapistEditDescriptionInput ||
                isAdminAfflictionEditDescriptionInput ||
                isAdminAfflictionEditInsuranceCodeInput ||
                isAdminMedicEditCityInput ||
                isAdminMedicEditStreetNameInput ||
                isAdminMedicEditStreetNumberInput ||
                isAdminMedicEditPostalCodeInput ||
                isAdminMedicEditLicenceCodeInput ||
                isAdminInsuranceEditCityInput ||
                isAdminInsuranceEditPostalCodeInput ||
                isAdminInsuranceEditStreetNameInput ||
                isAdminInsuranceEditStreetNumberInput ||
                isAdminInsuranceEditAMCCodeInput
              ? 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-1/6'
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
                  isAdminInsuranceAddStreetNumberInput ||
                  isAdminMedicEditStreetNumberInput ||
                  isAdminInsuranceEditStreetNumberInput
                ? 'N° de rue'
                : isStreetNameInput ||
                    isAdminMedicAddStreetNameInput ||
                    isAdminInsuranceAddStreetNameInput ||
                    isAdminMedicEditStreetNameInput ||
                    isAdminInsuranceEditStreetNameInput
                  ? 'Nom de rue'
                  : isPostalCodeInput ||
                      isAdminMedicAddPostalCodeInput ||
                      isAdminInsuranceAddPostalCodeInput ||
                      isAdminMedicEditPostalCodeInput ||
                      isAdminInsuranceEditPostalCodeInput
                    ? 'Code postal'
                    : isCityInput ||
                        isAdminMedicAddCityInput ||
                        isAdminInsuranceAddCityInput ||
                        isAdminMedicEditCityInput ||
                        isAdminInsuranceEditCityInput
                      ? 'Ville'
                      : isAppointmentNumberInput
                        ? 'Quantité seances prescrites :'
                        : isAdminTherapistAddLicenceCodeInput ||
                            isAdminMedicAddLicenceCodeInput ||
                            isAdminTherapistEditLicenceCodeInput ||
                            isAdminMedicEditLicenceCodeInput
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
                                    : isAdminAfflictionAddLicenceCodeInput ||
                                        isAdminAfflictionEditInsuranceCodeInput
                                      ? 'Cotation'
                                      : isAdminAfflictionAddDescriptionInput ||
                                          isAdminTherapistEditDescriptionInput ||
                                          isAdminAfflictionEditDescriptionInput
                                        ? 'Description'
                                        : isAdminInsuranceAddLicenceCodeInput ||
                                            isAdminInsuranceEditAMCCodeInput
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
                      isAdminInsuranceAddStreetNumberInput ||
                      isAdminMedicEditStreetNumberInput ||
                      isAdminInsuranceEditStreetNumberInput
                    ? 'street_number'
                    : isStreetNameInput ||
                        isAdminMedicAddStreetNameInput ||
                        isAdminInsuranceAddStreetNameInput ||
                        isAdminMedicEditStreetNameInput ||
                        isAdminInsuranceEditStreetNameInput
                      ? 'street_name'
                      : isPostalCodeInput ||
                          isAdminMedicAddPostalCodeInput ||
                          isAdminInsuranceAddPostalCodeInput ||
                          isAdminMedicEditPostalCodeInput ||
                          isAdminInsuranceEditPostalCodeInput
                        ? 'postal_code'
                        : isCityInput ||
                            isAdminMedicAddCityInput ||
                            isAdminInsuranceAddCityInput ||
                            isAdminMedicEditCityInput ||
                            isAdminInsuranceEditCityInput
                          ? 'city'
                          : isAppointmentNumberInput
                            ? 'appointment_quantity'
                            : isPatientMessageInput
                              ? 'content'
                              : isAdminTherapistAddLicenceCodeInput ||
                                  isAdminMedicAddLicenceCodeInput ||
                                  isAdminTherapistEditLicenceCodeInput ||
                                  isAdminMedicEditLicenceCodeInput
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
                                      : isAdminAfflictionAddLicenceCodeInput ||
                                          isAdminAfflictionEditInsuranceCodeInput
                                        ? 'insurance_code'
                                        : isAdminInsuranceAddLicenceCodeInput ||
                                            isAdminInsuranceEditAMCCodeInput
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
                                        : isAdminAfflictionAddNameInput ||
                                            isAdminAfflictionEditNameInput
                                          ? 'affliction-name_input'
                                          : isAdminAfflictionAddLicenceCodeInput ||
                                              isAdminAfflictionEditInsuranceCodeInput
                                            ? 'affliction-insurance-code_input'
                                            : isAdminRegionAddNameInput
                                              ? 'region-name_input'
                                              : isAdminMedicAddNameInput ||
                                                  isAdminMedicEditNameInput
                                                ? 'medic-name_input'
                                                : isAdminMedicAddSurnameInput ||
                                                    isAdminMedicEditSurnameInput
                                                  ? 'medic-surname_input'
                                                  : isAdminMedicAddLicenceCodeInput ||
                                                      isAdminMedicEditLicenceCodeInput
                                                    ? 'medic-licence-code_input'
                                                    : isAdminMedicAddStreetNumberInput ||
                                                        isAdminMedicEditStreetNumberInput
                                                      ? 'medic-street_number_input'
                                                      : isAdminMedicAddStreetNameInput ||
                                                          isAdminMedicEditStreetNameInput
                                                        ? 'medic-street_name_input'
                                                        : isAdminMedicAddPostalCodeInput ||
                                                            isAdminMedicEditPostalCodeInput
                                                          ? 'medic-postal_code_input'
                                                          : isAdminMedicAddCityInput ||
                                                              isAdminMedicEditCityInput
                                                            ? 'medic-city_input'
                                                            : isAdminInsuranceAddNameInput ||
                                                                isAdminInsuranceEditNameInput
                                                              ? 'insurance-name_input'
                                                              : isAdminInsuranceAddLicenceCodeInput ||
                                                                  isAdminInsuranceEditAMCCodeInput
                                                                ? 'insurance-licence-code_input'
                                                                : isAdminInsuranceAddStreetNumberInput ||
                                                                    isAdminInsuranceEditStreetNumberInput
                                                                  ? 'insurance-street_number_input'
                                                                  : isAdminInsuranceAddStreetNameInput ||
                                                                      isAdminInsuranceEditStreetNameInput
                                                                    ? 'insurance-street_name_input'
                                                                    : isAdminInsuranceAddPostalCodeInput ||
                                                                        isAdminInsuranceEditPostalCodeInput
                                                                      ? 'insurance-postal_code_input'
                                                                      : isAdminInsuranceAddCityInput ||
                                                                          isAdminInsuranceEditCityInput
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
          value={
            isAdminTherapistEditNameInput && therapist
              ? therapistName
              : isAdminTherapistEditSurnameInput && therapist
                ? therapistSurname
                : isAdminTherapistEditLicenceCodeInput
                  ? therapistLicenceCode
                  : isAdminTherapistEditDiplomaInput
                    ? therapistDiploma
                    : isAdminTherapistEditExperienceInput
                      ? therapistExperience
                      : isAdminTherapistEditSpecialtyInput
                        ? therapistSpecialty
                        : isAdminAfflictionEditNameInput && affliction
                          ? afflictionName
                          : isAdminAfflictionEditInsuranceCodeInput
                            ? afflictionInsuranceCode
                            : isAdminMedicEditNameInput && medic
                              ? medicName
                              : isAdminMedicEditSurnameInput && medic
                                ? medicSurname
                                : isAdminMedicEditCityInput
                                  ? medicCity
                                  : isAdminMedicEditStreetNameInput
                                    ? medicStreetName
                                    : isAdminMedicEditStreetNumberInput
                                      ? medicStreetNumber
                                      : isAdminMedicEditPostalCodeInput
                                        ? medicPostalCode
                                        : isAdminMedicEditLicenceCodeInput
                                          ? medicLicenceCode
                                          : isAdminInsuranceEditNameInput
                                            ? insuranceName
                                            : isAdminInsuranceEditAMCCodeInput
                                              ? insuranceAmcCode
                                              : isAdminInsuranceEditStreetNumberInput
                                                ? insuranceStreetNumber
                                                : isAdminInsuranceEditStreetNameInput
                                                  ? insuranceStreetName
                                                  : isAdminInsuranceEditPostalCodeInput
                                                    ? insurancePostalCode
                                                    : isAdminInsuranceEditCityInput
                                                      ? insuranceCity
                                                      : undefined
          }
          onChange={(e) => {
            if (therapist) {
              if (isAdminTherapistEditNameInput) {
                handleTherapistChange('name', e.target.value);
              } else if (isAdminTherapistEditSurnameInput) {
                handleTherapistChange(e.target.value);
              } else if (isAdminTherapistEditLicenceCodeInput) {
                handleTherapistChange(e.target.value);
              } else if (isAdminTherapistEditDiplomaInput) {
                handleTherapistChange(e.target.value);
              } else if (isAdminTherapistEditExperienceInput) {
                handleTherapistChange(e.target.value);
              } else if (isAdminTherapistEditSpecialtyInput) {
                handleTherapistChange(e.target.value);
              }
            } else if (affliction) {
              if (isAdminAfflictionEditNameInput) {
                handleAfflictionChange(e.target.value);
              } else if (isAdminAfflictionEditInsuranceCodeInput) {
                handleAfflictionChange(e.target.value);
              } else if (isAdminAfflictionEditDescriptionInput) {
                handleAfflictionChange(e.target.value);
              }
            } else if (medic) {
              if (isAdminMedicEditNameInput) {
                handleMedicChange(e.target.value);
              } else if (isAdminMedicEditSurnameInput) {
                handleMedicChange(e.target.value);
              } else if (isAdminMedicEditCityInput) {
                handleMedicChange(e.target.value);
              } else if (isAdminMedicEditStreetNameInput) {
                handleMedicChange(e.target.value);
              } else if (isAdminMedicEditStreetNumberInput) {
                handleMedicChange(e.target.value);
              } else if (isAdminMedicEditPostalCodeInput) {
                handleMedicChange(e.target.value);
              } else if (isAdminMedicEditLicenceCodeInput) {
                handleMedicChange(e.target.value);
              }
            } else if (insurance) {
              if (isAdminInsuranceEditNameInput) {
                setInsuranceName(e.target.value);
              } else if (isAdminInsuranceEditAMCCodeInput) {
                setInsuranceAmcCode(e.target.value);
              } else if (isAdminInsuranceEditStreetNumberInput) {
                setInsuranceStreetNumber(e.target.value);
              } else if (isAdminInsuranceEditStreetNameInput) {
                setInsuranceStreetName(e.target.value);
              } else if (isAdminInsuranceEditPostalCodeInput) {
                setInsurancePostalCode(e.target.value);
              } else if (isAdminInsuranceEditCityInput) {
                setInsuranceCity(e.target.value);
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
                  : isAdminAfflictionEditDescriptionInput && affliction
                    ? affliction.description
                    : ''
          }`}
          value={
            isAdminTherapistEditDescriptionInput
              ? therapistDescription
              : isAdminAfflictionEditDescriptionInput
                ? afflictionDescription
                : undefined
          }
          onChange={(e) =>
            isAdminTherapistEditDescriptionInput
              ? setTherapistDescription(e.target.value)
              : isAdminAfflictionEditDescriptionInput
                ? setAfflictionDescription(e.target.value)
                : ''
          }
          className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal sm:text-xs lg:text-base xl:text-lg font-normal "
          required
          rows={5}
          cols={32}
        ></textarea>
      )}
    </div>
  );
}
