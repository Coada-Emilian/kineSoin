import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';

export default function AddInsuranceModal() {
  return (
    <>
      <StandardTextInput
        adminInsurance={{ isAdminInsuranceAddNameInput: true }}
      />

      <StandardTextInput
        adminInsurance={{ isAdminInsuranceAddLicenceCodeInput: true }}
      />

      <div className="flex gap-2 items-center justify-between">
        <StandardTextInput
          adminInsurance={{
            isAdminInsuranceAddStreetNumberInput: true,
          }}
        />

        <StandardTextInput
          adminInsurance={{ isAdminInsuranceAddStreetNameInput: true }}
        />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <StandardTextInput
          adminInsurance={{ isAdminInsuranceAddPostalCodeInput: true }}
        />

        <StandardTextInput
          adminInsurance={{ isAdminInsuranceAddCityInput: true }}
        />
      </div>

      <div className="flex gap-2 items-center justify-between">
        <StandardChoiceDropdown isCountryDropdownInput />

        <StandardTelephoneInput isAdminInsuranceAddTelephoneInput />
      </div>
    </>
  );
}
