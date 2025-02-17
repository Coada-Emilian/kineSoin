import { useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
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
}

interface PatientSectionProps {
  isAppointmentNumberInput?: boolean;
  isPatientMessageInput?: boolean;
  isPatientProfileNameModification?: boolean;
  isPatientProfileSurnameModification?: boolean;
  isPatientProfileStreetNumberModification?: boolean;
  isPatientProfileStreetNameModification?: boolean;
  isPatientProfilePostalCodeModification?: boolean;
  isPatientProfileCityModification?: boolean;
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
  patient?: IPatient | null;
}

interface AdminRegionProps {
  isAdminRegionAddNameInput?: boolean;
}

interface StandardTextInputProps {
  patientRegister?: GeneralInputProps;
  adminTherapist?: AdminTherapistProps;
  adminAffliction?: AdminAfflictionProps;
  adminMedic?: AdminMedicProps;
  adminInsurance?: AdminInsuranceProps;
  dataInput?: DataInputProps;
  adminRegion?: AdminRegionProps;
  patientSection?: PatientSectionProps;
}

export default function StandardTextInput({
  patientRegister,
  adminTherapist,
  adminAffliction,
  adminMedic,
  adminInsurance,
  dataInput,
  adminRegion,
  patientSection,
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

  const [patientState, setPatientState] = useState({
    name: dataInput?.patient?.name || '',
    surname: dataInput?.patient?.surname || '',
    birthName: dataInput?.patient?.birth_name || '',
    streetName: dataInput?.patient?.street_name || '',
    streetNumber: dataInput?.patient?.street_number || '',
    postalCode: dataInput?.patient?.postal_code || '',
    city: dataInput?.patient?.city || '',
    email: dataInput?.patient?.email || '',
  });

  const handleTherapistChange = (
    field: keyof typeof therapistState,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTherapistState((prev) => ({ ...prev, [field]: value }));
  };

  const handleAfflictionChange = (
    field: keyof typeof afflictionState,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAfflictionState((prev) => ({ ...prev, [field]: value }));
  };

  const handleMedicChange = (
    field: keyof typeof medicState,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicState((prev) => ({ ...prev, [field]: value }));
  };

  const handleInsuranceChange = (
    field: keyof typeof insuranceState,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsuranceState((prev) => ({ ...prev, [field]: value }));
  };

  const handlePatientChange = (
    field: keyof typeof patientState,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPatientState((prev) => ({ ...prev, [field]: value }));
  };

  const standardTextFields = [
    {
      boolean: patientRegister?.isNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'patient-register-name_input',
      labelClassName: 'text-sm',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: 'Entrez votre nom',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: patientRegister?.isSurnameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'patient-register-surname_input',
      labelClassName: 'text-sm',
      labelName: 'Prénom',
      inputName: 'surname',
      inputPlaceholder: 'Entrez votre prénom',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'surname',
    },
    {
      boolean: patientRegister?.isBirthNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'patient-register-birthname_input',
      labelClassName: 'text-sm',
      labelName: 'Nom de naissance',
      inputName: 'birth_name',
      inputPlaceholder: 'Entrez votre nom de naissance',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'birth-name',
    },
    {
      boolean: patientRegister?.isStreetNumberInput,
      divClassName: 'w-4/12 flex flex-col mb-4',
      inputId: 'patient-register-street_number_input',
      labelClassName: 'text-xs',
      labelName: 'N° de rue',
      inputName: 'street_number',
      inputPlaceholder: 'N° de rue',
      required: false,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-number',
    },
    {
      boolean: patientRegister?.isStreetNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'patient-register-street_name_input',
      labelClassName: 'text-xs',
      labelName: 'Nom de rue',
      inputName: 'street_name',
      inputPlaceholder: 'Nom de rue',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-name',
    },
    {
      boolean: patientRegister?.isPostalCodeInput,
      divClassName: 'w-1/2 flex flex-col mb-4',
      inputId: 'patient-register-postal_code_input',
      labelClassName: 'text-xs',
      labelName: 'Code postal',
      inputName: 'postal_code',
      inputPlaceholder: 'Code postal',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'postal-code',
    },
    {
      boolean: patientRegister?.isCityInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'patient-register-city_input',
      labelClassName: 'text-xs',
      labelName: 'Ville',
      inputName: 'city',
      inputPlaceholder: 'Ville',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'city',
    },
    {
      boolean: patientSection?.isAppointmentNumberInput,
      divClassName: 'w-full flex flex-col items-center md:items-start',
      inputId: 'appointment-number_input',
      labelClassName: 'text-sm',
      labelName: 'Quantité séances prescrites',
      inputName: 'appointment_quantity',
      inputPlaceholder: 'Laissez vide si non précisé',
      required: false,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'appointment-quantity',
    },
    {
      boolean: patientSection?.isPatientMessageInput,
      divClassName: 'w-10/12 mx-auto mb-5 ',
      inputId: 'patient-message-input',
      labelClassName: 'text-sm',
      labelName: '',
      inputName: 'content',
      inputPlaceholder: 'Tapez votre message...',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: false,
      generalLabelClassName: true,
      autoComplete: 'content',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-name_input',
      labelClassName: 'text-sm',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: 'Entrez le nom du kiné',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddSurnameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-surname_input',
      labelClassName: 'text-sm',
      labelName: 'Prénom',
      inputName: 'surname',
      inputPlaceholder: 'Entrez le prénom du kiné',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'surname',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddLicenceCodeInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-licence-code_input',
      labelClassName: 'text-sm',
      labelName: 'Code ADELI',
      inputName: 'licence_code',
      inputPlaceholder: 'Entrez le code ADELI du kiné',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'licence-code',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddDiplomaInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-diploma_input',
      labelClassName: 'text-sm',
      labelName: 'Diplôme',
      inputName: 'diploma',
      inputPlaceholder: 'Entrez le diplôme du kiné',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'diploma',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddExperienceInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-experience_input',
      labelClassName: 'text-sm',
      labelName: 'Expérience',
      inputName: 'experience',
      inputPlaceholder: "Entrez l'expérience du kiné",
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'experience',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddSpecialtyInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-specialty_input',
      labelClassName: 'text-sm',
      labelName: 'Spécialité',
      inputName: 'specialty',
      inputPlaceholder: 'Entrez la spécialité du kiné',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'specialty',
    },
    {
      boolean: adminTherapist?.isAdminTherapistAddDescriptionInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-description_input',
      labelClassName: 'text-sm',
      labelName: 'Description du kiné',
      inputName: 'description',
      inputPlaceholder: 'Description du kinésithérapeute',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: true,
      generalDivClassName: false,
      generalLabelClassName: true,
      autoComplete: 'description',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditSurnameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'therapist-surname_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Prénom',
      inputName: 'surname',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.surname,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('surname', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'surname',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditNameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'therapist-name_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.name,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('name', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditLicenceCodeInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'therapist-licence_code_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Code ADELI',
      inputName: 'licence_code',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.licenceCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('licenceCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'licence-code',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditDiplomaInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'therapist-diploma_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Diplôme',
      inputName: 'diploma',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.diploma,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('diploma', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'diploma',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditExperienceInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'therapist-experience_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Expérience',
      inputName: 'experience',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.experience,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('experience', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'experience',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditSpecialtyInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'therapist-specialty_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Spécialité',
      inputName: 'specialty',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.specialty,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('specialty', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'specialty',
    },
    {
      boolean: adminTherapist?.isAdminTherapistEditDescriptionInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'therapist-description_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Description',
      inputName: 'description',
      inputPlaceholder: '',
      required: true,
      inputValue: therapistState.description,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleTherapistChange('description', e.target.value, e),
      textArea: true,
      generalDivClassName: false,
      generalLabelClassName: true,
      autoComplete: 'description',
    },
    {
      boolean: adminAffliction?.isAdminAfflictionAddNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'affliction-name_input',
      labelClassName: 'text-sm',
      labelName: "Nom de l'affliction",
      inputName: 'name',
      inputPlaceholder: "Entrez le nom de l'affliction",
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminAffliction?.isAdminAfflictionAddLicenceCodeInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'affliction-insurance-code_input',
      labelClassName: 'text-sm',
      labelName: 'Cotation',
      inputName: 'insurance_code',
      inputPlaceholder: "Entrez la cotation de l'affliction",
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'insurance-code',
    },
    {
      boolean: adminAffliction?.isAdminAfflictionAddDescriptionInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'affliction-description_input',
      labelClassName: 'text-sm',
      labelName: 'Description',
      inputName: 'description',
      inputPlaceholder: "Description de l'affliction",
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: true,
      generalDivClassName: false,
      generalLabelClassName: true,
      autoComplete: 'description',
    },
    {
      boolean: adminAffliction?.isAdminAfflictionEditNameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'affliction-name_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: '',
      required: true,
      inputValue: afflictionState.name,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleAfflictionChange('name', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminAffliction?.isAdminAfflictionEditInsuranceCodeInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'affliction-insurance-code_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Cotation',
      inputName: 'insurance_code',
      inputPlaceholder: '',
      required: true,
      inputValue: afflictionState.insuranceCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleAfflictionChange('insuranceCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'insurance-code',
    },
    {
      boolean: adminAffliction?.isAdminAfflictionEditDescriptionInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'affliction-description_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit ',
      labelName: 'Description',
      inputName: 'description',
      inputPlaceholder: '',
      required: true,
      inputValue: afflictionState.description,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleAfflictionChange('description', e.target.value, e),
      textArea: true,
      generalDivClassName: false,
      generalLabelClassName: true,
      autoComplete: 'description',
    },
    {
      boolean: adminMedic?.isAdminMedicAddNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'medic-name_input',
      labelClassName: 'text-sm',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: 'Entrez le nom du médecin',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminMedic?.isAdminMedicAddSurnameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'medic-surname_input',
      labelClassName: 'text-sm',
      labelName: 'Prénom',
      inputName: 'surname',
      inputPlaceholder: 'Entrez le prénom du médecin',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'surname',
    },
    {
      boolean: adminMedic?.isAdminMedicAddLicenceCodeInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'medic-licence-code_input',
      labelClassName: 'text-sm',
      labelName: 'Code ADELI',
      inputName: 'licence_code',
      inputPlaceholder: 'Entrez le code ADELI du médecin',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'licence-code',
    },
    {
      boolean: adminMedic?.isAdminMedicAddStreetNumberInput,
      divClassName: 'w-4/12 flex flex-col mb-4',
      inputId: 'medic-street_number_input',
      labelClassName: 'text-xs',
      labelName: 'N° de rue',
      inputName: 'street_number',
      inputPlaceholder: 'N° de rue',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-number',
    },
    {
      boolean: adminMedic?.isAdminMedicAddStreetNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'medic-street_name_input',
      labelClassName: 'text-xs',
      labelName: 'Nom de rue',
      inputName: 'street_name',
      inputPlaceholder: 'Nom de rue',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-name',
    },
    {
      boolean: adminMedic?.isAdminMedicAddPostalCodeInput,
      divClassName: 'w-1/3 flex flex-col mb-4',
      inputId: 'medic-postal_code_input',
      labelClassName: 'text-xs',
      labelName: 'Code postal',
      inputName: 'postal_code',
      inputPlaceholder: 'Code postal',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'postal-code',
    },
    {
      boolean: adminMedic?.isAdminMedicAddCityInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'medic-city_input',
      labelClassName: 'text-xs',
      labelName: 'Ville',
      inputName: 'city',
      inputPlaceholder: 'Ville',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'city',
    },
    {
      boolean: adminMedic?.isAdminMedicEditNameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-name_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.name,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('name', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminMedic?.isAdminMedicEditSurnameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-surname_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Prénom',
      inputName: 'surname',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.surname,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('surname', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'surname',
    },
    {
      boolean: adminMedic?.isAdminMedicEditLicenceCodeInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-licence_code_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Code ADELI',
      inputName: 'licence_code',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.licenceCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('licenceCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'licence-code',
    },
    {
      boolean: adminMedic?.isAdminMedicEditStreetNumberInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-street_number_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'N° de rue',
      inputName: 'street_number',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.streetNumber,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('streetNumber', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-number',
    },
    {
      boolean: adminMedic?.isAdminMedicEditStreetNameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-street_name_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Nom de rue',
      inputName: 'street_name',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.streetName,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('streetName', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-name',
    },
    {
      boolean: adminMedic?.isAdminMedicEditPostalCodeInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-postal_code_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Code postal',
      inputName: 'postal_code',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.postalCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('postalCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'postal-code',
    },
    {
      boolean: adminMedic?.isAdminMedicEditCityInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'medic-city_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Ville',
      inputName: 'city',
      inputPlaceholder: '',
      required: true,
      inputValue: medicState.city,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleMedicChange('city', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'city',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceAddNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'insurance-name_input',
      labelClassName: 'text-sm',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: "Entrez le nom de l'assurance",
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceAddLicenceCodeInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'insurance-licence-code_input',
      labelClassName: 'text-sm',
      labelName: 'Code AMC',
      inputName: 'amc_code',
      inputPlaceholder: "Entrez le code AMC de l'assurance",
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'amc-code',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceAddStreetNumberInput,
      divClassName: 'w-1/3 flex flex-col mb-4',
      inputId: 'insurance-street_number_input',
      labelClassName: 'text-xs',
      labelName: 'N° de rue',
      inputName: 'street_number',
      inputPlaceholder: 'N° de rue',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-number',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceAddStreetNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'insurance-street_name_input',
      labelClassName: 'text-xs',
      labelName: 'Nom de rue',
      inputName: 'street_name',
      inputPlaceholder: 'Nom de rue',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-name',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceAddPostalCodeInput,
      divClassName: 'w-1/3 flex flex-col mb-4',
      inputId: 'insurance-postal_code_input',
      labelClassName: 'text-xs',
      labelName: 'Code postal',
      inputName: 'postal_code',
      inputPlaceholder: 'Code postal',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'postal-code',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceAddCityInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'insurance-city_input',
      labelClassName: 'text-xs',
      labelName: 'Ville',
      inputName: 'city',
      inputPlaceholder: 'Ville',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'city',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceEditNameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'insurance-name_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: '',
      required: true,
      inputValue: insuranceState.name,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInsuranceChange('name', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceEditAMCCodeInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'insurance-licence-code_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-1/3',
      labelName: 'Code AMC',
      inputName: 'amc_code',
      inputPlaceholder: '',
      required: true,
      inputValue: insuranceState.amcCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInsuranceChange('amcCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'amc-code',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceEditStreetNumberInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'insurance-street_number_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'N° de rue',
      inputName: 'street_number',
      inputPlaceholder: '',
      required: true,
      inputValue: insuranceState.streetNumber,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInsuranceChange('streetNumber', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-number',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceEditStreetNameInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'insurance-street_name_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Nom de rue',
      inputName: 'street_name',
      inputPlaceholder: '',
      required: true,
      inputValue: insuranceState.streetName,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInsuranceChange('streetName', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-name',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceEditPostalCodeInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'insurance-postal_code_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Code postal',
      inputName: 'postal_code',
      inputPlaceholder: '',
      required: true,
      inputValue: insuranceState.postalCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInsuranceChange('postalCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'postal-code',
    },
    {
      boolean: adminInsurance?.isAdminInsuranceEditCityInput,
      divClassName: 'flex flex-row items-center gap-2 mb-2 w-full',
      inputId: 'insurance-city_input',
      labelClassName: 'text-base md:text-lg xl:text-xl 2xl:text-2xl w-fit',
      labelName: 'Ville',
      inputName: 'city',
      inputPlaceholder: '',
      required: true,
      inputValue: insuranceState.city,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInsuranceChange('city', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'city',
    },
    {
      boolean: adminRegion?.isAdminRegionAddNameInput,
      divClassName: 'w-full flex flex-col mb-4',
      inputId: 'region-name_input',
      labelClassName: 'text-sm',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: 'Entrez le nom de la région',
      required: true,
      inputValue: undefined,
      inputOnChange: undefined,
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: patientSection?.isPatientProfileNameModification,
      divClassName: 'w-full flex flex-row items-center mb-4',
      inputId: 'patient-profile-name_input',
      labelClassName: 'text-xs md:text-base xl:text-xl',
      labelName: 'Nom',
      inputName: 'name',
      inputPlaceholder: 'Entrez votre nom',
      required: true,
      inputValue: patientState.name,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handlePatientChange('name', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'name',
    },
    {
      boolean: patientSection?.isPatientProfileSurnameModification,
      divClassName: 'w-full flex flex-row items-center mb-4',
      inputId: 'patient-profile-surname_input',
      labelClassName: 'text-xs md:text-base xl:text-xl',
      labelName: 'Prénom',
      inputName: 'surname',
      inputPlaceholder: 'Entrez votre prénom',
      required: true,
      inputValue: patientState.surname,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handlePatientChange('surname', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'surname',
    },
    {
      boolean: patientSection?.isPatientProfileStreetNumberModification,
      divClassName: 'w-full md:w-1/3 flex flex-row items-center mb-4',
      inputId: 'patient-profile-street_number_input',
      labelClassName: 'text-xs md:text-base xl:text-xl w-4/6 text-start ',
      labelName: 'No rue',
      inputName: 'street_number',
      inputPlaceholder: '',
      required: true,
      inputValue: patientState.streetNumber,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handlePatientChange('streetNumber', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-number',
    },
    {
      boolean: patientSection?.isPatientProfileStreetNameModification,
      divClassName: 'w-full flex flex-row items-center mb-4',
      inputId: 'patient-profile-street_name_input',
      labelClassName:
        'text-xs md:text-base xl:text-xl w-4/6 md:w-1/3 text-start',
      labelName: 'Nom de rue',
      inputName: 'street_name',
      inputPlaceholder: '',
      required: true,
      inputValue: patientState.streetName,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handlePatientChange('streetName', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'street-name',
    },
    {
      boolean: patientSection?.isPatientProfilePostalCodeModification,
      divClassName: 'w-full md:w-1/3 flex flex-row items-center mb-4',
      inputId: 'patient-profile-postal_code_input',
      labelClassName: 'text-xs md:text-base xl:text-xl w-4/6 text-start ',
      labelName: 'Code postal',
      inputName: 'postal_code',
      inputPlaceholder: '',
      required: true,
      inputValue: patientState.postalCode,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handlePatientChange('postalCode', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'postal-code',
    },
    {
      boolean: patientSection?.isPatientProfileCityModification,
      divClassName: 'w-full flex flex-row items-center mb-4',
      inputId: 'patient-profile-city_input',
      labelClassName:
        'text-xs md:text-base xl:text-xl w-4/6 md:w-1/3 text-start',
      labelName: 'Ville',
      inputName: 'city',
      inputPlaceholder: '',
      required: true,
      inputValue: patientState.city,
      inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handlePatientChange('city', e.target.value, e),
      textArea: false,
      generalDivClassName: true,
      generalLabelClassName: true,
      autoComplete: 'city',
    },
  ];

  return (
    <>
      {standardTextFields.map(
        (field) =>
          field.boolean && (
            <div
              key={field.inputId}
              className={`${field.generalDivClassName ? 'gap-2 italic' : ''} ${field.divClassName}`}
            >
              <label
                htmlFor={field.inputId}
                className={`${field.generalLabelClassName ? 'text-primaryBlue font-medium' : ''} ${field.labelClassName}`}
              >
                {field.labelName}
              </label>
              {!field.textArea ? (
                <input
                  type="text"
                  id={field.inputId}
                  name={field.inputName}
                  placeholder={field.inputPlaceholder}
                  className="text-xs md:text-sm xl:text-base 2xl:text-lg w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
                  required={field.required}
                  value={field.inputValue}
                  onChange={
                    field.inputOnChange as React.ChangeEventHandler<HTMLInputElement>
                  }
                  autoComplete={field.autoComplete}
                />
              ) : (
                <textarea
                  name={field.inputName}
                  id={`${field.inputId}-textarea`}
                  placeholder={field.inputPlaceholder}
                  value={field.inputValue}
                  onChange={
                    field.inputOnChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
                  }
                  className="mt-1 block text-xs md:text-md xl:text-xl 2xl:text-2xl w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal sm:text-xs lg:text-base font-normal "
                  cols={32}
                  rows={5}
                ></textarea>
              )}
            </div>
          )
      )}
    </>
  );
}
