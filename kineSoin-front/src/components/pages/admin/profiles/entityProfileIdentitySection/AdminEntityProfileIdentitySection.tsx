import type { BaseAdminEntityProfileProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../utils/functions/contextUtils/useAdminEntityProfileCOntext';
import AdminEntityId from './AdminEntityId';
import AdminEntityStatus from './AdminEntityStatus';

export default function AdminEntityProfileIdentitySection({
  entityType,
}: BaseAdminEntityProfileProps) {
  const isPatientProfile = entityType === 'patient';

  // Get the necessary state and functions from the global context
  const {
    isProfileEditing,
    entityName,
    setEntityName,
    entitySurname,
    setEntitySurname,
    entityStatus,
    entityId,
  } = useAdminEntityProfileContext();

  // Handlers for name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(e.target.value);
  };

  // Handler for surname change
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntitySurname(e.target.value);
  };

  return (
    <section className="md:text-2xl">
      <AdminEntityStatus status={entityStatus} />

      <AdminEntityId id={entityId} />

      {!isProfileEditing || isPatientProfile ? (
        <NameOutputRefactor name={entityName} surname={entitySurname} />
      ) : (
        <>
          <div className="w-full flex gap-4 mb-2 ">
            <StandardTextInputRefactor
              textInput={{
                id: `admin-${entityType}-edit-name_input`,
                labelName: 'Nom',
                name: 'name',
                value: entityName,
                isRequired: true,
                autoComplete: 'name',
                onChange: handleNameChange,
                isFlexRow: true,
                additionalLabelClassName: 'text-sm',
              }}
            />

            {entitySurname && (
              <StandardTextInputRefactor
                textInput={{
                  id: `admin-${entityType}-edit-surname_input`,
                  labelName: 'Prénom',
                  name: 'surname',
                  value: entitySurname,
                  isRequired: true,
                  autoComplete: 'surname',
                  onChange: handleSurnameChange,
                  isFlexRow: true,
                  additionalLabelClassName: 'text-sm ',
                }}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
}
