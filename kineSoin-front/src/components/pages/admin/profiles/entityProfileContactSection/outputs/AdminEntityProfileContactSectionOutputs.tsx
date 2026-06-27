import { useAdminEntityProfileContext } from '../../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import AdminEntityAgeAndGenderOutput from './AdminEntityAgeAndGenderOutput';
import AdminEntityEmailOutput from './AdminEntityEmailOutput';
import AdminEntityTelephoneNumberOutput from './AdminEntityTelephoneNumberOutput';

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

      {editedEntity.email && (
        <AdminEntityEmailOutput email={editedEntity.email} />
      )}

      {editedEntity.prefix && editedEntity.phone_number && (
        <AdminEntityTelephoneNumberOutput
          prefix={editedEntity.prefix}
          phone_number={editedEntity.phone_number}
        />
      )}

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
