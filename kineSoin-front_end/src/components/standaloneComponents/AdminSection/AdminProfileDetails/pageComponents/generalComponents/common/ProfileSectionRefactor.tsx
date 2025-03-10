import { IParticularEntityDetails } from '../../../../../../../@types/customInterfaces';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardInterfaces';
import DiplomaOutputRefactor from './Outputs/new_conponents/DiplomaOutputRefactor';
import ExperienceOutputRefactor from './Outputs/new_conponents/ExperienceOutputRefactor';
import LicenceCodeOutputRefactor from './Outputs/new_conponents/LicenceCodeOutputRefactor';
import SpecialtyOutputRefactor from './Outputs/new_conponents/SpecialtyOutputRefactor';
import DescriptionOutputRefactor from './Outputs/new_conponents/DescriptionOutputRefactor';
import PhoneNumberOutputRefactor from './Outputs/new_conponents/PhoneNumberOutputRefactor';
import AMCCodeOutputRefactor from './Outputs/new_conponents/AMCCodeOutputRefactor';
import InsuranceCodeOutputRefactor from './Outputs/new_conponents/InsuranceCodeOutputRefactor';
import AddressOutputRefactor from './Outputs/new_conponents/AddressOutputRefactor';
import AgeAndGenderOutputRefactor from './Outputs/new_conponents/AgeAndGenderOutputRefactor';
import EmailInputRefactor from './Inputs/new_components/EmailInputRefactor';
import EmailOutputRefactor from './Outputs/new_conponents/EmailOutputRefactor';
import BodyRegionAndOperatedStatusOutputRefactor from './Outputs/new_conponents/BodyRegionAndOperatedStatusOutputRefactor';
import ImageOutputRefactor from './Outputs/new_conponents/ImageOutputRefactor';

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
        email: 'email' in entity ? entity.email || undefined : undefined,
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
        picture_url:
          'picture_url' in entity ? entity.picture_url || undefined : undefined,
      }
    : {};

  return (
    <section className="mb-2 md:text-2xl w-full">
      <AgeAndGenderOutputRefactor
        age={entityDetails.age}
        gender={entityDetails.gender}
      />
      <EmailOutputRefactor email={entityDetails.email} />
      <PhoneNumberOutputRefactor
        prefix={entityDetails.prefix}
        phone_number={entityDetails.phone_number}
      />
      <AddressOutputRefactor
        city={entityDetails.city}
        postal_code={entityDetails.postal_code}
        street_number={entityDetails.street_number}
        street_name={entityDetails.street_name}
      />

      <AMCCodeOutputRefactor amc_code={entityDetails.amc_code} />
      <InsuranceCodeOutputRefactor
        insurance_code={entityDetails.insurance_code}
      />
      <LicenceCodeOutputRefactor licence_code={entityDetails.licence_code} />
      <BodyRegionAndOperatedStatusOutputRefactor
        body_region={entityDetails.body_region}
        is_operated={entityDetails.is_operated}
      />

      <DiplomaOutputRefactor diploma={entityDetails.diploma} />
      <SpecialtyOutputRefactor specialty={entityDetails.specialty} />
      <ExperienceOutputRefactor experience={entityDetails.experience} />

      <DescriptionOutputRefactor description={entityDetails.description} />

      {/* <ImageOutputRefactor picture_url={entityDetails.picture_url} /> */}
    </section>
  );
}
