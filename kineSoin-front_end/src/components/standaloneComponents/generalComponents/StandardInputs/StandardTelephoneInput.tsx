import { useState } from 'react';

interface StandardTelephoneInputProps {
  isPatientTelephoneInput?: boolean;
  isAdminMedicAddTelephoneInput?: boolean;
  isAdminInsuranceAddTelephoneInput?: boolean;
  isAdminTherapistEditTelephoneInput?: boolean;
  therapist_phone_number?: string;
  isAdminTherapistAddTelephoneInput?: boolean;
  isAdminMedicEditTelephoneInput?: boolean;
  medic_phone_number?: string;
  isAdminInsuranceEditTelephoneInput?: boolean;
  insurance_phone_number?: string;
  setTherapistPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  setMedicPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  setInsurancePhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  isPatientProfileTelephoneModification?: boolean;
  patient_phone_number?: string;
}

export default function StandardTelephoneInput({
  isPatientTelephoneInput,
  isAdminMedicAddTelephoneInput,
  isAdminInsuranceAddTelephoneInput,
  isAdminTherapistEditTelephoneInput,
  therapist_phone_number,
  isAdminTherapistAddTelephoneInput,
  isAdminMedicEditTelephoneInput,
  medic_phone_number,
  isAdminInsuranceEditTelephoneInput,
  insurance_phone_number,
  setTherapistPhoneNumber,
  setMedicPhoneNumber,
  setInsurancePhoneNumber,
  isPatientProfileTelephoneModification,
  patient_phone_number,
}: StandardTelephoneInputProps) {
  const [patientPhoneNumber, setPatientPhoneNumber] = useState<
    string | undefined
  >(patient_phone_number);

  const getInputId = () =>
    isPatientTelephoneInput
      ? 'patient-register-telephone_input'
      : isAdminMedicAddTelephoneInput
        ? 'admin-medic-add-telephone_input'
        : isAdminInsuranceAddTelephoneInput
          ? 'admin-insurance-add-telephone_input'
          : isAdminTherapistEditTelephoneInput
            ? 'admin-therapist-edit-telephone_input'
            : isAdminTherapistAddTelephoneInput
              ? 'admin-therapist-add-telephone_input'
              : isAdminMedicEditTelephoneInput
                ? 'admin-medic-edit-telephone_input'
                : isAdminInsuranceEditTelephoneInput
                  ? 'admin-insurance-edit-telephone_input'
                  : isPatientProfileTelephoneModification
                    ? 'patient-profile-telephone_input'
                    : '';

  const getLabelClassName = () => {
    return `${
      isAdminTherapistEditTelephoneInput ||
      isAdminMedicEditTelephoneInput ||
      isAdminInsuranceEditTelephoneInput
        ? 'text-base md:text-lg xl:text-xl 2xl:text-2xl text-primaryBlue font-medium'
        : isPatientProfileTelephoneModification
          ? 'text-xs md:text-base xl:text-xl w-1/4 text-start text-primaryBlue font-medium md:w-2/3'
          : 'text-xs text-primaryBlue font-medium'
    }`;
  };

  const inputId = getInputId();
  const labelClassName = getLabelClassName();

  return (
    <div
      className={`flex gap-2 items-center mb-4 italic w-full ${isPatientProfileTelephoneModification ? 'flex-row' : 'flex-col'}`}
    >
      <label htmlFor={inputId} className={labelClassName}>
        {isPatientProfileTelephoneModification
          ? 'N° de téléphone'
          : '   Numero téléphone'}
      </label>

      <input
        type="tel"
        name="phone_number"
        id={inputId}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
        placeholder="Numéro de téléphone"
        value={
          isAdminTherapistEditTelephoneInput
            ? therapist_phone_number
            : isAdminMedicEditTelephoneInput
              ? medic_phone_number
              : isAdminInsuranceEditTelephoneInput
                ? insurance_phone_number
                : isPatientProfileTelephoneModification
                  ? patientPhoneNumber
                  : undefined
        }
        onChange={(e) => {
          if (setTherapistPhoneNumber) {
            setTherapistPhoneNumber(e.target.value);
          }
          if (setMedicPhoneNumber) {
            setMedicPhoneNumber(e.target.value);
          }
          if (setInsurancePhoneNumber) {
            setInsurancePhoneNumber(e.target.value);
          }
          if (isPatientProfileTelephoneModification) {
            setPatientPhoneNumber(e.target.value);
          }
        }}
        required
      />
    </div>
  );
}
