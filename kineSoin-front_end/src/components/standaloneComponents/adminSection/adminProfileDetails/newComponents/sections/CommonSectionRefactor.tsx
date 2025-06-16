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
  const isPatientProfile = entityType === 'patient';

  const {
    isProfileEditing,
    entityName,
    setEntityName,
    entitySurname,
    setEntitySurname,
    entityStatus,
    entityId,
  } = useAdminProfileDetailsGlobalContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(e.target.value);
  };

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
