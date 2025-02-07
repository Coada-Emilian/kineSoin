interface StandardTelephoneInputProps {
  isPatientTelephoneInput?: boolean;
  isAdminMedicAddTelephoneInput?: boolean;
}

export default function StandardTelephoneInput({
  isPatientTelephoneInput,
  isAdminMedicAddTelephoneInput,
}: StandardTelephoneInputProps) {
  return (
    <div className={`flex flex-col gap-2 mb-4 italic w-2/3`}>
      <label
        htmlFor={
          isPatientTelephoneInput
            ? 'patient-register-telephone_input'
            : isAdminMedicAddTelephoneInput
              ? 'admin-medic-add-telephone_input'
              : ''
        }
        className="text-xs text-primaryBlue font-medium"
      >
        Numero Téléphone
      </label>

      <input
        type="tel"
        name={
          isPatientTelephoneInput
            ? 'phone_number'
            : isAdminMedicAddTelephoneInput
              ? 'phone_number'
              : ''
        }
        id={
          isPatientTelephoneInput
            ? 'patient-register-telephone_input'
            : isAdminMedicAddTelephoneInput
              ? 'admin-medic-add-telephone_input'
              : ''
        }
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
        placeholder="Numéro de téléphone"
        required
      />
    </div>
  );
}
