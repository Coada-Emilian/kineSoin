import { useEffect } from 'react';
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
}: CommonInputProps) {
  return (
    <div className="flex gap-2 items-center ">
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
            therapist_prefix={therapist?.prefix}
          />
          <StandardTelephoneInput
            isAdminTherapistEditTelephoneInput
            therapist_phone_number={therapist?.phone_number}
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
            medic_prefix={medic?.prefix}
          />
          <StandardTelephoneInput
            isAdminMedicEditTelephoneInput
            medic_phone_number={medic?.phone_number}
          />
        </div>
      )}

      {isMedicLicenceCodeInput && (
        <StandardTextInput isAdminMedicEditLicenceCodeInput medic={medic} />
      )}
    </div>
  );
}
