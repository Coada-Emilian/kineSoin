import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';

export default function AddAfflictionModal() {
  return (
    <>
      <StandardTextInput
        adminAffliction={{ isAdminAfflictionAddNameInput: true }}
      />

      <StandardChoiceDropdown isAdminAfflictionAddRegionInput />

      <div className="flex gap-1">
        <StandardTextInput
          adminAffliction={{
            isAdminAfflictionAddLicenceCodeInput: true,
          }}
        />

        <StandardChoiceDropdown isAdminAfflictionAddOperatedStatusInput />
      </div>

      <StandardTextInput
        adminAffliction={{ isAdminAfflictionAddDescriptionInput: true }}
      />
    </>
  );
}
