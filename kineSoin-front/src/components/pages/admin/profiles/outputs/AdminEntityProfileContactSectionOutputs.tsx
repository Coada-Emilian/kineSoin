import { useAdminEntityProfileContext } from '../../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import AdminEntityAgeAndGenderOutput from './AdminEntityAgeAndGenderOutput';
import EmailOutputRefactor from './AdminEntityEmailOutput';

export default function AdminEntityProfileContactSectionOutputs() {
  // Destructure the necessary data from the global context
  const { editedEntity } = useAdminEntityProfileContext();

  return (
    <>
      {editedEntity.age && editedEntity.gender && (
        <AdminEntityAgeAndGenderOutput
          age={editedEntity.age}
          gender={editedEntity.gender}
        />
      )}

      {editedEntity.email && <EmailOutputRefactor email={editedEntity.email} />}

      {/* {entityPhoneNumber && entityPrefix && (
        <PhoneNumberOutputRefactor
          prefix={entityPrefix}
          phone_number={entityPhoneNumber}
        />
      )} */}

      {/* {entityStreetName &&
        entityStreetNumber &&
        entityPostalCode &&
        entityCity && (
          <AddressOutputRefactor
            city={entityCity}
            postal_code={entityPostalCode}
            street_number={entityStreetNumber}
            street_name={entityStreetName}
          />
        )} */}

      {/* {entityAMCCode && <AMCCodeOutputRefactor amc_code={entityAMCCode} />} */}

      {/* {entityInsuranceCode && (
        <InsuranceCodeOutputRefactor insurance_code={entityInsuranceCode} />
      )} */}

      {/* {entityLicenceCode && (
        <LicenceCodeOutputRefactor licence_code={entityLicenceCode} />
      )} */}

      {/* {entityOperatedStatus && entityBodyRegion && (
        <BodyRegionAndOperatedStatusOutputRefactor
          body_region={entityBodyRegion}
          is_operated={entityOperatedStatus}
        />
      )} */}

      {/* {entityDiploma && <DiplomaOutputRefactor diploma={entityDiploma} />} */}

      {/* {entitySpecialty && (
        <SpecialtyOutputRefactor specialty={entitySpecialty} />
      )} */}

      {/* {entityExperience && (
        <ExperienceOutputRefactor experience={entityExperience} />
      )} */}

      {/* {entityDescription && (
        <DescriptionOutputRefactor description={entityDescription} />
      )} */}
    </>
  );
}
