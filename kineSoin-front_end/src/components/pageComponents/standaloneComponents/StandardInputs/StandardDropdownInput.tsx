import { IAffliction } from '../../../../@types/IAffliction';
import { IMedic } from '../../../../@types/IMedic';

interface StandardChoiceDropdownProps {
  isGenderDropdownInput?: boolean;
  registeredPatientGender?: string;
  setRegisteredPatientGender?: React.Dispatch<React.SetStateAction<string>>;
  isMedicDropdownInput?: boolean;
  setNewPrescriptionMedicId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  medics?: IMedic[];
  isAtHomeCareDropdownInput?: boolean;
  setAtHomeCare?: React.Dispatch<React.SetStateAction<boolean>>;
  isAfflictionDropdownInput?: boolean;
  setNewPrescriptionAfflictionId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  afflictions?: IAffliction[];
}

export default function StandardChoiceDropdown({
  isGenderDropdownInput,
  registeredPatientGender,
  setRegisteredPatientGender,
  isMedicDropdownInput,
  setNewPrescriptionMedicId,
  medics,
  isAtHomeCareDropdownInput,
  setAtHomeCare,
  isAfflictionDropdownInput,
  setNewPrescriptionAfflictionId,
  afflictions,
}: StandardChoiceDropdownProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={
          isGenderDropdownInput
            ? 'patient-register-gender_dropdown'
            : isMedicDropdownInput
              ? 'new-prescription-medic_dropdown'
              : isAtHomeCareDropdownInput
                ? 'patient-register-at_home_care_dropdown'
                : isAfflictionDropdownInput
                  ? 'new-prescription-affliction_dropdown'
                  : ''
        }
        className="text-primaryBlue text-sm font-medium block mb-2"
      >
        {isGenderDropdownInput && 'Genre'}{' '}
        {isMedicDropdownInput && 'Médecin prescripteur :'}
        {isAtHomeCareDropdownInput && 'A domicile ?'}
        {isAfflictionDropdownInput && 'Affection concernée :'}
      </label>

      <select
        id={
          isGenderDropdownInput
            ? 'patient-register-gender_dropdown'
            : isMedicDropdownInput
              ? 'new-prescription-medic_dropdown'
              : isAtHomeCareDropdownInput
                ? 'patient-register-at_home_care_dropdown'
                : isAfflictionDropdownInput
                  ? 'new-prescription-affliction_dropdown'
                  : ''
        }
        value={
          isGenderDropdownInput && registeredPatientGender
            ? registeredPatientGender
            : undefined
        }
        onChange={(e) => {
          isGenderDropdownInput &&
            setRegisteredPatientGender &&
            setRegisteredPatientGender(e.target.value);

          isMedicDropdownInput &&
            setNewPrescriptionMedicId &&
            setNewPrescriptionMedicId(Number(e.target.value));

          isAtHomeCareDropdownInput &&
            setAtHomeCare &&
            setAtHomeCare(e.target.value === 'true');

          isAfflictionDropdownInput &&
            setNewPrescriptionAfflictionId &&
            setNewPrescriptionAfflictionId(Number(e.target.value));
        }}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        {isGenderDropdownInput && (
          <>
            {' '}
            <option value="">Sélectionnez votre genre</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </>
        )}

        {isMedicDropdownInput && (
          <>
            <option value="">Sélectionnez un médecin prescripteur</option>
            {medics &&
              medics.map((medic) => (
                <option key={medic.id} value={medic.id}>
                  {medic.fullName}
                </option>
              ))}
            <option value="other">Autre</option>
            {/* ToDO - add a new medic modal */}
          </>
        )}

        {isAtHomeCareDropdownInput && (
          <>
            <option value="">Choisissez une option</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </>
        )}

        {isAfflictionDropdownInput && (
          <>
            <option value="">Sélectionnez une affection</option>
            {afflictions &&
              afflictions.map((affliction) => (
                <option key={affliction.id} value={affliction.id}>
                  {affliction.name}
                </option>
              ))}
            <option value="other">Autre</option>
            {/* ToDO - add a new medic modal */}
          </>
        )}
      </select>
    </div>
  );
}
