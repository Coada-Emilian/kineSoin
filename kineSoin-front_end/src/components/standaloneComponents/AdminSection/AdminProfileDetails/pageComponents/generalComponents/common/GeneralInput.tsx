import { useState } from 'react';
import StandardChoiceDropdown from '../../../../../generalComponents/StandardInputs/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../generalComponents/StandardInputs/StandardTextInput';
import {
  IAffliction,
  IInsurance,
  IMedic,
  ITherapist,
} from '../../../../../../../@types/types';

interface GeneralInputProps {
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
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

export default function GeneralInput({
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
}: GeneralInputProps) {
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
  const fields = {
    therapistName: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditNameInput: true }}
          dataInput={{
            therapist: therapist,
          }}
        />
      ),
      condition: isProfileNameInput && therapist, // Ensure name input appears for the correct entities
    },
    medicName: {
      component: (
        <StandardTextInput
          adminMedic={{ isAdminMedicEditNameInput: true }}
          dataInput={{
            medic: medic,
          }}
        />
      ),
      condition: isProfileNameInput && medic, // Ensure name input appears for the correct entities
    },
    insuranceName: {
      component: (
        <StandardTextInput
          adminInsurance={{ isAdminInsuranceEditNameInput: true }}
          dataInput={{
            insurance: insurance,
          }}
        />
      ),
      condition: isProfileNameInput && insurance, // Ensure name input appears for the correct entities
    },
    afflictionName: {
      component: (
        <StandardTextInput
          adminAffliction={{ isAdminAfflictionEditNameInput: true }}
          dataInput={{
            affliction: affliction,
          }}
        />
      ),
      condition: isProfileNameInput && affliction, // Ensure name input appears for the correct entities
    },
    therapistSurname: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditSurnameInput: true }}
          dataInput={{
            therapist: therapist,
          }}
        />
      ),
      condition: isProfileSurnameInput && therapist, // Ensure surname input appears for the correct entities
    },
    medicSurname: {
      component: (
        <StandardTextInput
          adminMedic={{ isAdminMedicEditSurnameInput: true }}
          dataInput={{
            medic: medic,
          }}
        />
      ),
      condition: isProfileSurnameInput && medic, // Ensure surname input appears for the correct entities
    },

    licenceCode: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditLicenceCodeInput: true }}
          dataInput={{ therapist: therapist }}
        />
      ),
      condition: isTherapistLicenceCodeInput,
    },
    diploma: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditDiplomaInput: true }}
          dataInput={{ therapist: therapist }}
        />
      ),
      condition: isTherapistDiplomaInput,
    },
    experience: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditExperienceInput: true }}
          dataInput={{ therapist: therapist }}
        />
      ),
      condition: isTherapistExperienceInput,
    },
    specialty: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditSpecialtyInput: true }}
          dataInput={{ therapist: therapist }}
        />
      ),
      condition: isTherapistSpecialtyInput,
    },
    therapistPhoneNumber: {
      component: (
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
      ),
      condition: isTherapistPhoneNumberInput,
    },
    description: {
      component: (
        <StandardTextInput
          adminTherapist={{ isAdminTherapistEditDescriptionInput: true }}
          dataInput={{ therapist: therapist }}
        />
      ),
      condition: isTherapistDescriptionInput,
    },
    region: {
      component: (
        <StandardChoiceDropdown
          isAdminAfflictionEditRegionInput
          affliction={affliction}
        />
      ),
      condition: isAfflictionRegionInput,
    },
    insuranceCode: {
      component: (
        <StandardTextInput
          adminAffliction={{ isAdminAfflictionEditInsuranceCodeInput: true }}
          dataInput={{ affliction: affliction }}
        />
      ),
      condition: isAfflictionInsuranceCodeInput,
    },
    operated: {
      component: (
        <StandardChoiceDropdown
          isAdminAfflictionEditOperatedStatusInput
          affliction={affliction}
        />
      ),
      condition: isAfflictionOperatedInput,
    },
    afflictionDescription: {
      component: (
        <StandardTextInput
          adminAffliction={{ isAdminAfflictionEditDescriptionInput: true }}
          dataInput={{ affliction: affliction }}
        />
      ),
      condition: isAfflictionDescriptionInput,
    },
    medicAddress: {
      component: (
        <div className="flex flex-col gap-2 w-full">
          <StandardTextInput
            adminMedic={{ isAdminMedicEditStreetNumberInput: true }}
            dataInput={{ medic: medic }}
          />
          <StandardTextInput
            adminMedic={{ isAdminMedicEditStreetNameInput: true }}
            dataInput={{ medic: medic }}
          />
          <StandardTextInput
            adminMedic={{ isAdminMedicEditPostalCodeInput: true }}
            dataInput={{ medic: medic }}
          />
          <StandardTextInput
            adminMedic={{ isAdminMedicEditCityInput: true }}
            dataInput={{ medic: medic }}
          />
        </div>
      ),
      condition: isMedicAddressInput,
    },
    medicPhoneNumber: {
      component: (
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
      ),
      condition: isMedicPhoneNumberInput,
    },
    medicLicenceCode: {
      component: (
        <StandardTextInput
          adminMedic={{ isAdminMedicEditLicenceCodeInput: true }}
          dataInput={{ medic: medic }}
        />
      ),
      condition: isMedicLicenceCodeInput,
    },
    insuranceAddress: {
      component: (
        <div className="flex flex-col gap-2 w-full">
          <StandardTextInput
            adminInsurance={{ isAdminInsuranceEditStreetNumberInput: true }}
            dataInput={{ insurance: insurance }}
          />
          <StandardTextInput
            adminInsurance={{ isAdminInsuranceEditStreetNameInput: true }}
            dataInput={{ insurance: insurance }}
          />
          <StandardTextInput
            adminInsurance={{ isAdminInsuranceEditPostalCodeInput: true }}
            dataInput={{ insurance: insurance }}
          />
          <StandardTextInput
            adminInsurance={{ isAdminInsuranceEditCityInput: true }}
            dataInput={{ insurance: insurance }}
          />
        </div>
      ),
      condition: isInsuranceAddressInput,
    },
    insurancePhoneNumber: {
      component: (
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
      ),
      condition: isInsurancePhoneNumberInput,
    },
    amcCode: {
      component: (
        <StandardTextInput
          adminInsurance={{ isAdminInsuranceEditAMCCodeInput: true }}
          dataInput={{ insurance: insurance }}
        />
      ),
      condition: isInsuranceAMCCodeInput,
    },
  };

  return (
    <div className="flex gap-2 items-center w-full">
      {Object.entries(fields).map(([key, field]) =>
        field.condition ? field.component : null
      )}
    </div>
  );
}
