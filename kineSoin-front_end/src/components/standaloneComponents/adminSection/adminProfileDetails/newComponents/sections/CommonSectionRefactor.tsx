/**
 * @component CommonSectionRefactor
 *
 * Renders the common section of an entity profile, displaying status, ID, and name fields.
 * Allows editing of name and surname if profile editing is enabled and entity is not a patient.
 *
 * @param {Object} props
 * @param {string} props.entityType - The type of entity (e.g., 'therapist', 'patient') to customize behavior.
 *
 * @returns {JSX.Element} The common profile section component with conditional rendering based on editing state.
 *
 * @description
 * - Displays status and ID using output components.
 * - Shows name and surname either as read-only outputs or editable inputs depending on editing mode and entity type.
 * - Uses global context for profile state management including editing status, entity name, surname, and ID.
 *
 * @example
 * <CommonSectionRefactor entityType="therapist" />
 */

import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import { StandardTextInputRefactor } from '../../../../generalComponents/standardInputs/newInputs';
import {
  IdOutputRefactor,
  NameOutputRefactor,
  StatusOutputRefactor,
} from '../outputs';

interface CommonSectionRefactorProps {
  entityType: string;
}

export default function CommonSectionRefactor({
  entityType,
}: CommonSectionRefactorProps) {
  // Check if the entity type is 'patient' to determine if it's a patient profile
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
  } = useAdminProfileDetailsGlobalContext();

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
      <StatusOutputRefactor status={entityStatus} />

      <IdOutputRefactor id={entityId} />

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
