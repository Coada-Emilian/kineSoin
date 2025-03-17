import { IParticularEntityDetails } from '../../../../../../@types/customInterfaces';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';
import DiplomaOutputRefactor from '../generalComponents/common/Outputs/new_conponents/DiplomaOutputRefactor';
import ExperienceOutputRefactor from '../generalComponents/common/Outputs/new_conponents/ExperienceOutputRefactor';
import LicenceCodeOutputRefactor from '../generalComponents/common/Outputs/new_conponents/LicenceCodeOutputRefactor';
import SpecialtyOutputRefactor from '../generalComponents/common/Outputs/new_conponents/SpecialtyOutputRefactor';
import DescriptionOutputRefactor from '../generalComponents/common/Outputs/new_conponents/DescriptionOutputRefactor';
import PhoneNumberOutputRefactor from '../generalComponents/common/Outputs/new_conponents/PhoneNumberOutputRefactor';
import AMCCodeOutputRefactor from '../generalComponents/common/Outputs/new_conponents/AMCCodeOutputRefactor';
import InsuranceCodeOutputRefactor from '../generalComponents/common/Outputs/new_conponents/InsuranceCodeOutputRefactor';
import AddressOutputRefactor from '../generalComponents/common/Outputs/new_conponents/AddressOutputRefactor';
import AgeAndGenderOutputRefactor from '../generalComponents/common/Outputs/new_conponents/AgeAndGenderOutputRefactor';
import EmailOutputRefactor from '../generalComponents/common/Outputs/new_conponents/EmailOutputRefactor';
import BodyRegionAndOperatedStatusOutputRefactor from '../generalComponents/common/Outputs/new_conponents/BodyRegionAndOperatedStatusOutputRefactor';
import { getProfileSectionEntityDetails } from './getProfileSectionEntityDetails';
import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';

interface ProfileSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | undefined;
}

export default function ProfileSectionRefactor({
  entity,
}: ProfileSectionRefactorProps) {
  const entityDetails = getProfileSectionEntityDetails(entity);

  const { isProfileEditing } = useAdminProfileDetailsGlobalContext();

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
    </section>
  );
}
