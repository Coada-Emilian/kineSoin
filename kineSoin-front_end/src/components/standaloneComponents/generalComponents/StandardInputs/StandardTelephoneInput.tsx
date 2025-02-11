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
}: StandardTelephoneInputProps) {
  return (
    <div className={`flex flex-col gap-2 mb-4 italic w-2/3`}>
      <label
        htmlFor={
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
                        : ''
        }
        className={`${isAdminTherapistEditTelephoneInput || isAdminMedicEditTelephoneInput || isAdminInsuranceEditTelephoneInput ? 'text-base md:text-lg xl:text-xl 2xl:text-2xl text-primaryBlue font-medium' : 'text-xs text-primaryBlue font-medium'}`}
      >
        Numero Téléphone
      </label>

      <input
        type="tel"
        name="phone_number"
        id={
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
                        : ''
        }
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
        placeholder="Numéro de téléphone"
        value={
          isAdminTherapistEditTelephoneInput
            ? therapist_phone_number
            : isAdminMedicEditTelephoneInput
              ? medic_phone_number
              : isAdminInsuranceEditTelephoneInput
                ? insurance_phone_number
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
        }}
        required
      />
    </div>
  );
}
