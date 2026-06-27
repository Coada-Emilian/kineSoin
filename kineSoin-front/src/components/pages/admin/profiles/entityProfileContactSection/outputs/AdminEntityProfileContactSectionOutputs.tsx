import { hasValues } from '../../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import { useAdminEntityProfileContext } from '../../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import AdminEntityAddressOutput from './AdminEntityAddressOutput';
import AdminEntityAgeAndGenderOutput from './AdminEntityAgeAndGenderOutput';
import AdminEntityEmailOutput from './AdminEntityEmailOutput';
import AdminEntityTelephoneNumberOutput from './AdminEntityTelephoneNumberOutput';

export default function AdminEntityProfileContactSectionOutputs() {
  // Destructure the necessary data from the global context
  const { editedEntity } = useAdminEntityProfileContext();

  return (
    <>
      {hasValues(editedEntity.age, editedEntity.gender) && (
        <AdminEntityAgeAndGenderOutput
          age={editedEntity.age}
          gender={editedEntity.gender}
        />
      )}

      {hasValues(editedEntity.email) && (
        <AdminEntityEmailOutput email={editedEntity.email} />
      )}

      {hasValues(editedEntity.prefix, editedEntity.phone_number) && (
        <AdminEntityTelephoneNumberOutput
          prefix={editedEntity.prefix}
          phone_number={editedEntity.phone_number}
        />
      )}

      {hasValues(
        editedEntity.street_name,
        editedEntity.street_number,
        editedEntity.postal_code,
        editedEntity.city
      ) && (
        <AdminEntityAddressOutput
          city={editedEntity.city}
          postal_code={editedEntity.postal_code}
          street_number={editedEntity.street_number}
          street_name={editedEntity.street_name}
        />
      )}

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
