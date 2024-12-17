interface StandardTelephoneInputProps {
  isPatientTelephoneInput?: boolean;
}

export default function StandardTelephoneInput({
  isPatientTelephoneInput,
}: StandardTelephoneInputProps) {
  return (
    <div className={`flex flex-col gap-2 mb-4`}>
      <label
        htmlFor={
          isPatientTelephoneInput ? 'patient-register-telephone_input' : ''
        }
        className="text-sm text-primaryBlue font-medium"
      >
        Numero Téléphone
      </label>

      <input
        type="tel"
        name={isPatientTelephoneInput ? 'phone_number' : ''}
        id={isPatientTelephoneInput ? 'patient-register-telephone_input' : ''}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-secondaryTeal"
        placeholder="Numéro de téléphone"
        required
      />
    </div>
  );
}
