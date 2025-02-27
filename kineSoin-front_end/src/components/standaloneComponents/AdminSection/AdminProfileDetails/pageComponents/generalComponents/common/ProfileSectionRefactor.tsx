import { Description } from '@headlessui/react';
import { IParticularEntityDetails } from '../../../../../../../@types/customTypes';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardTypes';
import GeneralInput from './GeneralInput';
import GeneralOutput from './GeneralOutput';
import DiplomaOutputRefactor from './Outputs/DiplomaOutputRefactor';
import ExperienceOutputRefactor from './Outputs/ExperienceOutputRefactor';
import LicenceCodeOutputRefactor from './Outputs/LicenceCodeOutputRefactor';
import SpecialtyOutputRefactor from './Outputs/SpecialtyOutputRefactor';
import DescriptionOutputRefactor from './Outputs/DescriptionOutputRefactor';
import PhoneNumberOutputRefactor from './Outputs/PhoneNumberOutputRefactor';
import AMCCodeOutputRefactor from './Outputs/AMCCodeOutputRefactor';
import InsuranceCodeOutputRefactor from './Outputs/InsuranceCodeOutputRefactor';
import AddressOutputRefactor from './Outputs/AddressOutputRefactor';
import AgeAndGenderOutputRefactor from './Outputs/AgeAndGenderOutputRefactor';

interface ProfileSectionRefactorProps {
  isProfileEditing?: boolean;
  entityType: string | undefined;
  entity:
    | ITherapist
    | IPatient
    | IAffliction
    | IMedic
    | IInsurance
    | null
    | undefined;
}

export default function ProfileSectionRefactor({
  isProfileEditing,
  entityType,
  entity,
}: ProfileSectionRefactorProps) {
  const entityDetails: IParticularEntityDetails = entity
    ? {
        licence_code:
          'licence_code' in entity
            ? entity.licence_code || undefined
            : undefined,
        amc_code:
          'amc_code' in entity ? entity.amc_code || undefined : undefined,
        diploma: 'diploma' in entity ? entity.diploma || undefined : undefined,
        experience:
          'experience' in entity ? entity.experience || undefined : undefined,
        specialty:
          'specialty' in entity ? entity.specialty || undefined : undefined,
        prefix: 'prefix' in entity ? entity.prefix || undefined : undefined,
        phone_number:
          'phone_number' in entity
            ? typeof entity.phone_number === 'string'
              ? entity.phone_number
              : undefined
            : undefined,
        description:
          'description' in entity ? entity.description || undefined : undefined,

        insurance_code:
          'insurance_code' in entity
            ? entity.insurance_code || undefined
            : undefined,
        birth_date:
          'birth_date' in entity ? entity.birth_date || undefined : undefined,
        age: 'age' in entity ? entity.age || undefined : undefined,
        gender: 'gender' in entity ? entity.gender || undefined : undefined,
        city: 'city' in entity ? entity.city || undefined : undefined,
        postal_code:
          'postal_code' in entity ? entity.postal_code || undefined : undefined,
        street_number:
          'street_number' in entity
            ? entity.street_number || undefined
            : undefined,
        street_name:
          'street_name' in entity ? entity.street_name || undefined : undefined,
        body_region:
          'body_region' in entity ? entity.body_region || undefined : undefined,
        is_operated:
          'is_operated' in entity ? entity.is_operated || undefined : undefined,
      }
    : {};

  return (
    <section className="mb-2 md:text-2xl">
      <LicenceCodeOutputRefactor licence_code={entityDetails.licence_code} />
      <DiplomaOutputRefactor diploma={entityDetails.diploma} />
      <ExperienceOutputRefactor experience={entityDetails.experience} />
      <SpecialtyOutputRefactor specialty={entityDetails.specialty} />
      <DescriptionOutputRefactor description={entityDetails.description} />
      <PhoneNumberOutputRefactor
        prefix={entityDetails.prefix}
        phone_number={entityDetails.phone_number}
      />
      <AMCCodeOutputRefactor amc_code={entityDetails.amc_code} />
      <InsuranceCodeOutputRefactor
        insurance_code={entityDetails.insurance_code}
      />
      <AddressOutputRefactor
        city={entityDetails.city}
        postal_code={entityDetails.postal_code}
        street_number={entityDetails.street_number}
        street_name={entityDetails.street_name}
      />
      <AgeAndGenderOutputRefactor
        age={entityDetails.age}
        gender={entityDetails.gender}
      />

      {/* {isTherapistProfileSection &&
        (isProfileEditing ? (
          <>
            <GeneralInput therapist={therapist} isTherapistLicenceCodeInput />
            <GeneralInput therapist={therapist} isTherapistDiplomaInput />
            <GeneralInput therapist={therapist} isTherapistExperienceInput />
            <GeneralInput therapist={therapist} isTherapistSpecialtyInput />
            <GeneralInput therapist={therapist} isTherapistPhoneNumberInput />
            <GeneralInput therapist={therapist} isTherapistDescriptionInput />
          </>
        ) : (
          <>
            <GeneralOutput therapist={therapist} isProfileLicenceCodeOutput />
            <GeneralOutput therapist={therapist} isTherapistDiplomaOutput />
            <GeneralOutput therapist={therapist} isTherapistExperienceOutput />
            <GeneralOutput therapist={therapist} isTherapistSpecialtyOutput />
            <GeneralOutput therapist={therapist} isTherapistPhoneNumberOutput />
            <GeneralOutput therapist={therapist} isTherapistDescriptionOutput />
          </>
        ))}

      {isPatientProfileSection && (
        <>
          <GeneralOutput patient={patient} isPatientAgeGenderOutput />
          <GeneralOutput patient={patient} isPatientAddressOutput />
          <GeneralOutput patient={patient} isPatientPhoneNumberOutput />
          <GeneralOutput patient={patient} isPatientTherapistOutput />
        </>
      )}

      {isAfflictionProfileSection &&
        (isProfileEditing ? (
          <>
            <GeneralInput affliction={affliction} isAfflictionRegionInput />
            <GeneralInput
              affliction={affliction}
              isAfflictionInsuranceCodeInput
            />
            <GeneralInput affliction={affliction} isAfflictionOperatedInput />
            <GeneralInput
              affliction={affliction}
              isAfflictionDescriptionInput
            />
          </>
        ) : (
          <>
            <GeneralOutput affliction={affliction} isAfflictionRegionOutput />
            <GeneralOutput
              affliction={affliction}
              isAfflictionInsuranceCodeOutput
            />
            <GeneralOutput affliction={affliction} isAfflictionOperatedOutput />
            <GeneralOutput
              affliction={affliction}
              isAfflictionDescriptionOutput
            />
          </>
        ))}

      {isMedicProfileSection &&
        (isProfileEditing ? (
          <>
            <GeneralInput medic={medic} isMedicAddressInput />
            <GeneralInput medic={medic} isMedicPhoneNumberInput />
            <GeneralInput medic={medic} isMedicLicenceCodeInput />
          </>
        ) : (
          <>
            <GeneralOutput medic={medic} isMedicAddressOutput />
            <GeneralOutput medic={medic} isMedicPhoneNumberOutput />
            <GeneralOutput medic={medic} isMedicLicenceCodeOutput />
          </>
        ))}

      {isInsuranceProfileSection && (
        <>
          {isProfileEditing ? (
            <>
              <GeneralInput insurance={insurance} isInsuranceAddressInput />
              <GeneralInput insurance={insurance} isInsurancePhoneNumberInput />
              <GeneralInput insurance={insurance} isInsuranceAMCCodeInput />
            </>
          ) : (
            <>
              <GeneralOutput insurance={insurance} isInsuranceAddressOutput />
              <GeneralOutput
                insurance={insurance}
                isInsurancePhoneNumberOutput
              />
              <GeneralOutput insurance={insurance} isInsuranceAMCCodeOutput />
            </>
          )}
        </>
      )} */}
    </section>
  );
}
