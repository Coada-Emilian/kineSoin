import { hasValues } from '../../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import { useAdminEntityProfileContext } from '../../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import AdminEntityAddressOutput from './AdminEntityAddressOutput';
import AdminEntityAgeAndGenderOutput from './AdminEntityAgeAndGenderOutput';
import AdminEntityCodeOutput from './AdminEntityCodeOutput';
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

      {hasValues(editedEntity.amc_code) && (
        <AdminEntityCodeOutput amc_code={editedEntity.amc_code} />
      )}

      {hasValues(editedEntity.licence_code) && (
        <AdminEntityCodeOutput licence_code={editedEntity.licence_code} />
      )}

      {hasValues(editedEntity.insurance_code) && (
        <AdminEntityCodeOutput insurance_code={editedEntity.insurance_code} />
      )}

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
