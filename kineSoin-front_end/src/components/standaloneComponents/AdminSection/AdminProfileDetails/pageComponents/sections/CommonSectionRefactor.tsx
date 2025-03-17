import { useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';
import IdOutputRefactor from '../generalComponents/common/Outputs/new_conponents/IdOutputRefactor';
import NameOutputRefactor from '../generalComponents/common/Outputs/new_conponents/NameOutputRefactor';
import StatusOutputRefactor from '../generalComponents/common/Outputs/new_conponents/StatusOutputRefactor';
import { getCommonSectionEntityDetails } from './getCommonSectionEntityDetails';
import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import StandardTextInput from '../../../../generalComponents/StandardInputs/old_inputs/StandardTextInput';
import StandardTextInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';

interface CommonSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  entityType: string;
}

export default function CommonSectionRefactor({
  entity,
  entityType,
}: CommonSectionRefactorProps) {
  const entityDetails = getCommonSectionEntityDetails(entity);

  // State variables
  const [entityName, setEntityName] = useState(entityDetails.name);
  const [entitySurname, setEntitySurname] = useState(entityDetails.surname);

  const { isProfileEditing } = useAdminProfileDetailsGlobalContext();

  return (
    <section className="md:text-2xl">
      <StatusOutputRefactor status={entityDetails.status} />

      <IdOutputRefactor id={entityDetails.id} />

      {isProfileEditing ? (
        <>
          <div className="w-full flex gap-4 mb-2 ">
            <StandardTextInputRefactor
              textInput={{
                id: `admin-${entityType}-edit-name_input`,
                labelName: 'Nom:',
                name: 'name',
                value: entityName,
                isRequired: true,
                autoComplete: 'name',
                onChange: (e) => {
                  setEntityName(e.target.value);
                },
                isFlexRow: true,
                additionalLabelClassName: 'text-sm',
              }}
            />
            {entitySurname && (
              <StandardTextInputRefactor
                textInput={{
                  id: `admin-${entityType}-edit-surname_input`,
                  labelName: 'Prénom:',
                  name: 'surname',
                  value: entitySurname,
                  isRequired: true,
                  autoComplete: 'surname',
                  onChange: (e) => {
                    setEntitySurname(e.target.value);
                  },
                  isFlexRow: true,
                  additionalLabelClassName: 'text-sm',
                }}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <NameOutputRefactor
            name={entityDetails.name}
            surname={entityDetails.surname}
          />
        </>
      )}
    </section>
  );
}
