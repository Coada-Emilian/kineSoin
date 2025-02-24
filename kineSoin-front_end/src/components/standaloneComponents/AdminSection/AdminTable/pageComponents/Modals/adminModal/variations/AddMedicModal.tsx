import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';

export default function AddMedicModal() {
  return (
    <>
      <StandardTextInput adminMedic={{ isAdminMedicAddNameInput: true }} />

      <StandardTextInput adminMedic={{ isAdminMedicAddSurnameInput: true }} />

      <StandardTextInput
        adminMedic={{ isAdminMedicAddLicenceCodeInput: true }}
      />

      <div className="flex gap-2 items-center justify-between">
        <StandardTextInput
          adminMedic={{ isAdminMedicAddStreetNumberInput: true }}
        />

        <StandardTextInput
          adminMedic={{ isAdminMedicAddStreetNameInput: true }}
        />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <StandardTextInput
          adminMedic={{ isAdminMedicAddPostalCodeInput: true }}
        />

        <StandardTextInput adminMedic={{ isAdminMedicAddCityInput: true }} />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <StandardChoiceDropdown isCountryDropdownInput />

        <StandardTelephoneInput isAdminMedicAddTelephoneInput />
      </div>
    </>
  );
}
