import type { BaseAdminEntityProfileProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../hooks/context/admin/useAdminEntityProfileContext';
import TextInput from '../../../../ui/inputs/TextInput';
import EntityIdOutput from '../../../../ui/outputs/EntityIdOutput';
import EntityNameOutput from '../../../../ui/outputs/EntityNameOutput';
import EntityStatusOutput from '../../../../ui/outputs/EntityStatusOutput';

export default function AdminEntityProfileIdentitySection({
  entityType,
}: BaseAdminEntityProfileProps) {
  // Get the necessary state and functions from the global context
  const { isProfileEditing, editedEntity, setEditedEntity } =
    useAdminEntityProfileContext();

  // Handlers for name change
  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedEntity((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  // Handler for surname change
  const handleSurnameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedEntity((prev) => ({
      ...prev,
      surname: e.target.value,
    }));
  };

  return (
    <section>
      <div className="flex w-full justify-between text-sm md:text-md lg:text-lg xl:text-xl">
        <EntityStatusOutput status={editedEntity.status} />

        <EntityIdOutput id={editedEntity.id} />
      </div>

      {isProfileEditing && entityType !== 'patient' ? (
        <>
          <div className="w-full flex gap-4 mb-2 ">
            <TextInput
              input={{
                id: `admin-${entityType}-edit-name_input`,
                labelName: 'Nom',
                name: 'name',
                value: editedEntity.name,
                isRequired: true,
                autoComplete: 'name',
                onChange: handleNameChange,
                isFlexRow: true,
                additionalLabelClassName: 'text-sm',
              }}
            />

            {editedEntity.surname && (
              <TextInput
                input={{
                  id: `admin-${entityType}-edit-surname_input`,
                  labelName: 'Prénom',
                  name: 'surname',
                  value: editedEntity.surname,
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
      ) : (
        <div className="text-sm md:text-md lg:text-lg xl:text-xl">
          <EntityNameOutput
            name={editedEntity.name}
            surname={editedEntity.surname ?? ''}
          />
        </div>
      )}
    </section>
  );
}
