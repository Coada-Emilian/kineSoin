import { useAdminEntityProfileContext } from '../../../../../hooks/context/admin/useAdminEntityProfileContext';
import { hasValues } from '../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import EntityAddressOutput from '../../../../ui/outputs/EntityAddressOutput';
import EntityAgeAndGenderOutput from '../../../../ui/outputs/EntityAgeAndGenderOutput';
import EntityBodyRegionAndOperatedStatusOutput from '../../../../ui/outputs/EntityBodyRegionAndOperatedStatusOutput';
import AdminEntityCodeOutput from '../../../../ui/outputs/EntityCodeOutput';
import AdminEntityDescriptionOutput from '../../../../ui/outputs/EntityDescriptionOutput';
import EntityEmailOutput from '../../../../ui/outputs/EntityEmailOutput';
import EntityStudiesOutput from '../../../../ui/outputs/EntityStudiesOutput';
import EntityTelephoneNumberOutput from '../../../../ui/outputs/EntityTelephoneNumberOutput';

export default function AdminEntityProfileContactSectionOutputs() {
  // Destructure the necessary data from the global context
  const { editedEntity } = useAdminEntityProfileContext();

  return (
    <>
      {hasValues(editedEntity.age, editedEntity.gender) && (
        <EntityAgeAndGenderOutput
          age={editedEntity.age}
          gender={editedEntity.gender}
        />
      )}

      {hasValues(editedEntity.email) && (
        <EntityEmailOutput email={editedEntity.email} />
      )}

      {hasValues(editedEntity.prefix, editedEntity.phone_number) && (
        <EntityTelephoneNumberOutput
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
        <EntityAddressOutput
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

      {hasValues(editedEntity.is_operated, editedEntity.body_region) && (
        <EntityBodyRegionAndOperatedStatusOutput
          body_region={editedEntity.body_region}
          is_operated={editedEntity.is_operated as string}
        />
      )}

      {hasValues(editedEntity.diploma) && (
        <EntityStudiesOutput diploma={editedEntity.diploma} />
      )}

      {hasValues(editedEntity.specialty) && (
        <EntityStudiesOutput specialty={editedEntity.specialty} />
      )}

      {hasValues(editedEntity.experience) && (
        <EntityStudiesOutput experience={editedEntity.experience} />
      )}

      {hasValues(editedEntity.description) && (
        <AdminEntityDescriptionOutput description={editedEntity.description} />
      )}
    </>
  );
}
