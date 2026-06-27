import type { BaseAdminEntityProfileProps } from '../../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import TextInput from '../../../../ui/inputs/TextInput';
import AdminEntityIdOutput from './outputs/AdminEntityIdOutput';
import AdminEntityNameOutput from './outputs/AdminEntityNameOutput';
import AdminEntityStatusOutput from './outputs/AdminEntityStatusOutput';

export default function AdminEntityProfileIdentitySection({
  entityType,
}: BaseAdminEntityProfileProps) {
  // Get the necessary state and functions from the global context
  const { isProfileEditing, editedEntity, setEditedEntity } =
    useAdminEntityProfileContext();

  // Handlers for name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEntity((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  // Handler for surname change
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEntity((prev) => ({
      ...prev,
      surname: e.target.value,
    }));
  };

  return (
    <section className="md:text-2xl">
      <AdminEntityStatusOutput status={editedEntity.status} />

      <AdminEntityIdOutput id={editedEntity.id} />

      {!isProfileEditing ? (
        <AdminEntityNameOutput
          name={editedEntity.name}
          surname={editedEntity.surname}
        />
      ) : (
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
      )}
    </section>
  );
}
