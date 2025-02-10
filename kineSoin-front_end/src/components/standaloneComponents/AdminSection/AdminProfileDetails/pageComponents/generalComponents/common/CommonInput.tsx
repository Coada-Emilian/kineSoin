import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { ITherapist } from '../../../../../../../@types/ITherapist';
import StandardChoiceDropdown from '../../../../../generalComponents/StandardInputs/StandardDropdownInput';
import StandardTextInput from '../../../../../generalComponents/StandardInputs/StandardTextInput';
import AdminTextInput from './AdminTextInput';

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
    </div>
  );
}
