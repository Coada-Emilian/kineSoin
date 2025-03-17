import { useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';
import NameInputRefactor from '../generalComponents/common/Inputs/new_components/NameInputRefactor';
import IdOutputRefactor from '../generalComponents/common/Outputs/new_conponents/IdOutputRefactor';
import NameOutputRefactor from '../generalComponents/common/Outputs/new_conponents/NameOutputRefactor';
import StatusOutputRefactor from '../generalComponents/common/Outputs/new_conponents/StatusOutputRefactor';
import { getCommonSectionEntityDetails } from './getCommonSectionEntityDetails';

interface CommonSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  isProfileEditing: boolean;
}

export default function CommonSectionRefactor({
  entity,
  isProfileEditing,
}: CommonSectionRefactorProps) {
  const entityDetails = getCommonSectionEntityDetails(entity);

  // State variables
  const [entityName, setEntityName] = useState(entityDetails.name);
  const [entitySurname, setEntitySurname] = useState(entityDetails.surname);

  return (
    <section className="md:text-2xl">
      <StatusOutputRefactor status={entityDetails.status} />

      <IdOutputRefactor id={entityDetails.id} />

      {isProfileEditing ? (
        <>
          {/* <div className="w-full flex gap-4 mb-2 ">
            <NameInputRefactor
              entityType={entityType}
              setFunction={setEntityName}
              value={entityName}
              type="name"
            />

            {entityDetails.surname && (
              <NameInputRefactor
                entityType={entityType}
                setFunction={setEntitySurname}
                value={entitySurname}
                type="surname"
              />
            )}
          </div> */}
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
