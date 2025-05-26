import { useAdminProfileDetailsGlobalContext } from '../../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import {
  AddressOutputRefactor,
  AgeAndGenderOutputRefactor,
  AMCCodeOutputRefactor,
  BodyRegionAndOperatedStatusOutputRefactor,
  DescriptionOutputRefactor,
  DiplomaOutputRefactor,
  EmailOutputRefactor,
  ExperienceOutputRefactor,
  InsuranceCodeOutputRefactor,
  LicenceCodeOutputRefactor,
  PhoneNumberOutputRefactor,
  SpecialtyOutputRefactor,
} from '../../generalComponents/common/Outputs/new_components';

export default function ProfileSectionOutputs() {
  const {
    entityAge,
    entityGender,
    entityEmail,
    entityPhoneNumber,
    entityPrefix,
    entityStreetName,
    entityStreetNumber,
    entityCity,
    entityPostalCode,
    entityAMCCode,
    entityInsuranceCode,
    entityLicenceCode,
    entityOperatedStatus,
    entityBodyRegion,
    entityDiploma,
    entitySpecialty,
    entityExperience,
    entityDescription,
  } = useAdminProfileDetailsGlobalContext();

  return (
    <>
      {entityAge && entityGender && (
        <AgeAndGenderOutputRefactor age={entityAge} gender={entityGender} />
      )}

      {entityEmail && <EmailOutputRefactor email={entityEmail} />}

      {entityPhoneNumber && entityPrefix && (
        <PhoneNumberOutputRefactor
          prefix={entityPrefix}
          phone_number={entityPhoneNumber}
        />
      )}

      {entityStreetName &&
        entityStreetNumber &&
        entityPostalCode &&
        entityCity && (
          <AddressOutputRefactor
            city={entityCity}
            postal_code={entityPostalCode}
            street_number={entityStreetNumber}
            street_name={entityStreetName}
          />
        )}

      {entityAMCCode && <AMCCodeOutputRefactor amc_code={entityAMCCode} />}

      {entityInsuranceCode && (
        <InsuranceCodeOutputRefactor insurance_code={entityInsuranceCode} />
      )}

      {entityLicenceCode && (
        <LicenceCodeOutputRefactor licence_code={entityLicenceCode} />
      )}

      {entityOperatedStatus && entityBodyRegion && (
        <BodyRegionAndOperatedStatusOutputRefactor
          body_region={entityBodyRegion}
          is_operated={entityOperatedStatus}
        />
      )}

      {entityDiploma && <DiplomaOutputRefactor diploma={entityDiploma} />}

      {entitySpecialty && (
        <SpecialtyOutputRefactor specialty={entitySpecialty} />
      )}

      {entityExperience && (
        <ExperienceOutputRefactor experience={entityExperience} />
      )}

      {entityDescription && (
        <DescriptionOutputRefactor description={entityDescription} />
      )}
    </>
  );
}
