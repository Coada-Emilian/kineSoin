import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../@types/types';
import { standardTextFields } from './standardTextField';

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

interface TherapistMessageProps {
  isTherapistSendMessageInput?: boolean;
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
  therapistMessage?: TherapistMessageProps;
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
  therapistMessage,
}: StandardTextInputProps) {
  const textFields = standardTextFields({
    patientRegister,
    adminTherapist,
    adminAffliction,
    adminMedic,
    adminInsurance,
    dataInput,
    adminRegion,
    patientSection,
    therapistMessage,
  });

  return (
    <>
      {textFields.map(
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
                  className="text-xxs md:text-xs xl:text-sm 2xl:text-md w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
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
                  className="mt-1 block text-xs md:text-md xl:text-xl 2xl:text-2xl w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal sm:text-xs lg:text-base font-normal placeholder:text-xs md:placeholder:text-md xl:placeholder:text-lg "
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
