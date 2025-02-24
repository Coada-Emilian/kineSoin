import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';

export default function SecondAddTherapistModal() {
  return (
    <>
      <StandardTextInput
        adminTherapist={{ isAdminTherapistAddDiplomaInput: true }}
      />

      <StandardTextInput
        adminTherapist={{
          isAdminTherapistAddExperienceInput: true,
        }}
      />

      <StandardTextInput
        adminTherapist={{ isAdminTherapistAddSpecialtyInput: true }}
      />

      <div className="flex gap-2 items-center justify-between">
        <StandardChoiceDropdown isCountryDropdownInput />

        <StandardTelephoneInput isAdminTherapistAddTelephoneInput />
      </div>

      <StandardTextInput
        adminTherapist={{
          isAdminTherapistAddDescriptionInput: true,
        }}
      />
    </>
  );
}
