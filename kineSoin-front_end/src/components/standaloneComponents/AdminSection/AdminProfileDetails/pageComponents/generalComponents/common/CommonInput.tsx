import { useState } from 'react';
import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { ITherapist } from '../../../../../../../@types/ITherapist';
import StandardChoiceDropdown from '../../../../../generalComponents/StandardInputs/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../generalComponents/StandardInputs/StandardTextInput';

interface CommonInputProps {
  therapist?: ITherapist | null;
  affliction?: IAffliction;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
  isProfileNameInput?: boolean;
  isProfileSurnameInput?: boolean;
  isTherapistLicenceCodeInput?: boolean;
  isTherapistDiplomaInput?: boolean;
  isTherapistExperienceInput?: boolean;
  isTherapistSpecialtyInput?: boolean;
  isTherapistDescriptionInput?: boolean;
  isAfflictionRegionInput?: boolean;
  isAfflictionInsuranceCodeInput?: boolean;
  isAfflictionOperatedInput?: boolean;
  isAfflictionDescriptionInput?: boolean;
  isMedicAddressInput?: boolean;
  isMedicPhoneNumberInput?: boolean;
  isMedicLicenceCodeInput?: boolean;
  isTherapistPhoneNumberInput?: boolean;
  isInsuranceAddressInput?: boolean;
  isInsurancePhoneNumberInput?: boolean;
  isInsuranceAMCCodeInput?: boolean;
}

export default function CommonInput({
  therapist,
  affliction,
  medic,
  insurance,
  isProfileNameInput,
  isProfileSurnameInput,
  isTherapistLicenceCodeInput,
  isTherapistDiplomaInput,
  isTherapistExperienceInput,
  isTherapistSpecialtyInput,
  isTherapistDescriptionInput,
  isAfflictionRegionInput,
  isAfflictionInsuranceCodeInput,
  isAfflictionOperatedInput,
  isAfflictionDescriptionInput,
  isMedicAddressInput,
  isMedicPhoneNumberInput,
  isMedicLicenceCodeInput,
  isTherapistPhoneNumberInput,
  isInsuranceAddressInput,
  isInsurancePhoneNumberInput,
  isInsuranceAMCCodeInput,
}: CommonInputProps) {
  const [insurancePrefix, setInsurancePrefix] = useState<string>(
    insurance?.prefix || ''
  );
  const [medicPrefix, setMedicPrefix] = useState<string>(medic?.prefix || '');
  const [therapistPrefix, setTherapistPrefix] = useState<string>(
    therapist?.prefix || ''
  );

  const [insurancePhoneNumber, setInsurancePhoneNumber] = useState<string>(
    insurance?.phone_number || ''
  );
  const [medicPhoneNumber, setMedicPhoneNumber] = useState<string>(
    medic?.phone_number || ''
  );
  const [therapistPhoneNumber, setTherapistPhoneNumber] = useState<string>(
    therapist?.phone_number || ''
  );
  return (
    <div className="flex gap-2 items-center w-full ">
      {isProfileNameInput && (
        <StandardTextInput
          isAdminTherapistEditNameInput
          isAdminAfflictionEditNameInput
          isAdminMedicEditNameInput
          isAdminInsuranceEditNameInput
          therapist={therapist}
          affliction={affliction}
          medic={medic}
          insurance={insurance}
        />
      )}
      {isProfileSurnameInput && (
        <>
          <StandardTextInput
            isAdminTherapistEditSurnameInput
            isAdminMedicEditSurnameInput
            therapist={therapist}
            medic={medic}
          />
        </>
      )}
      {isTherapistLicenceCodeInput && (
        <StandardTextInput
          isAdminTherapistEditLicenceCodeInput
          therapist={therapist}
        />
      )}
      {isTherapistDiplomaInput && (
        <StandardTextInput
          isAdminTherapistEditDiplomaInput
          therapist={therapist}
        />
      )}
      {isTherapistExperienceInput && (
        <StandardTextInput
          isAdminTherapistEditExperienceInput
          therapist={therapist}
        />
      )}
      {isTherapistSpecialtyInput && (
        <StandardTextInput
          isAdminTherapistEditSpecialtyInput
          therapist={therapist}
        />
      )}
      {isTherapistPhoneNumberInput && (
        <div className="flex flex-row gap-2">
          <StandardChoiceDropdown
            isCountryDropdownInput
            isAdminTherapistEditPrefixDropdown
            therapist_prefix={therapistPrefix}
            setTherapistPrefix={setTherapistPrefix}
          />
          <StandardTelephoneInput
            isAdminTherapistEditTelephoneInput
            therapist_phone_number={therapistPhoneNumber}
            setTherapistPhoneNumber={setTherapistPhoneNumber}
          />
        </div>
      )}
      {isTherapistDescriptionInput && (
        <StandardTextInput
          isAdminTherapistEditDescriptionInput
          isTextAreaInput
          therapist={therapist}
        />
      )}
      {isAfflictionRegionInput && (
        <StandardChoiceDropdown
          isAdminAfflictionEditRegionInput
          affliction={affliction}
        />
      )}
      {isAfflictionInsuranceCodeInput && (
        <StandardTextInput
          isAdminAfflictionEditInsuranceCodeInput
          affliction={affliction}
        />
      )}
      {isAfflictionOperatedInput && (
        <StandardChoiceDropdown
          isAdminAfflictionEditOperatedStatusInput
          affliction={affliction}
        />
      )}
      {isAfflictionDescriptionInput && (
        <StandardTextInput
          isAdminAfflictionEditDescriptionInput
          affliction={affliction}
          isTextAreaInput
        />
      )}
      {isMedicAddressInput && (
        <div className="flex flex-col gap-2 w-full">
          <StandardTextInput isAdminMedicEditStreetNumberInput medic={medic} />
          <StandardTextInput isAdminMedicEditStreetNameInput medic={medic} />
          <StandardTextInput isAdminMedicEditPostalCodeInput medic={medic} />
          <StandardTextInput isAdminMedicEditCityInput medic={medic} />
        </div>
      )}
      {isMedicPhoneNumberInput && (
        <div className="flex gap-2 w-full">
          <StandardChoiceDropdown
            isAdminMedicEditPrefixDropdown
            isCountryDropdownInput
            medic_prefix={medicPrefix}
            setMedicPrefix={setMedicPrefix}
          />
          <StandardTelephoneInput
            isAdminMedicEditTelephoneInput
            medic_phone_number={medicPhoneNumber}
            setMedicPhoneNumber={setMedicPhoneNumber}
          />
        </div>
      )}
      {isMedicLicenceCodeInput && (
        <StandardTextInput isAdminMedicEditLicenceCodeInput medic={medic} />
      )}

      {isInsuranceAddressInput && (
        <div className="flex flex-col gap-2 w-full">
          <StandardTextInput
            isAdminInsuranceEditStreetNumberInput
            insurance={insurance}
          />
          <StandardTextInput
            isAdminInsuranceEditStreetNameInput
            insurance={insurance}
          />
          <StandardTextInput
            isAdminInsuranceEditPostalCodeInput
            insurance={insurance}
          />
          <StandardTextInput
            isAdminInsuranceEditCityInput
            insurance={insurance}
          />
        </div>
      )}
      {isInsurancePhoneNumberInput && (
        <div className="flex gap-2 w-full">
          <StandardChoiceDropdown
            isAdminInsuranceEditPrefixDropdown
            isCountryDropdownInput
            insurance_prefix={insurancePrefix}
            setInsurancePrefix={setInsurancePrefix}
          />
          <StandardTelephoneInput
            isAdminInsuranceEditTelephoneInput
            insurance_phone_number={insurancePhoneNumber}
            setInsurancePhoneNumber={setInsurancePhoneNumber}
          />
        </div>
      )}
      {isInsuranceAMCCodeInput && (
        <StandardTextInput
          isAdminInsuranceEditAMCCodeInput
          insurance={insurance}
        />
      )}
    </div>
  );
}
