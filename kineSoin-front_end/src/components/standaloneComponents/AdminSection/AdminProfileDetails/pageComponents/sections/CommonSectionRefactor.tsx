import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardInterfaces';
import NameInputRefactor from '../generalComponents/common/Inputs/NameInputRefactor';
import IdOutputRefactor from '../generalComponents/common/Outputs/IdOutputRefactor';
import NameOutputRefactor from '../generalComponents/common/Outputs/NameOutputRefactor';
import StatusOutputRefactor from '../generalComponents/common/Outputs/StatusOutputRefactor';
import { ICommonEntityDetails } from '../../../../../../@types/customInterfaces';

interface CommonSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  isProfileEditing: boolean;
  entityType: string;
  setUpdateEntityForm: React.Dispatch<
    React.SetStateAction<FormData | null | undefined>
  >;
}

export default function CommonSectionRefactor({
  entity,
  isProfileEditing,
  entityType,
  setUpdateEntityForm,
}: CommonSectionRefactorProps) {
  const entityDetails: ICommonEntityDetails = entity
    ? {
        status: 'status' in entity ? entity.status || undefined : undefined,
        id: entity ? entity.id : 0,
        name: 'name' in entity ? entity.name || undefined : undefined,
        surname: 'surname' in entity ? entity.surname || undefined : undefined,
        fullName:
          'fullName' in entity ? entity.fullName || undefined : undefined,
      }
    : {};

  useEffect(() => {
    setEntityName(entityDetails.name);
    setEntitySurname(entityDetails.surname);
  }, [entity]);

  const [entityName, setEntityName] = useState(entityDetails.name);
  const [entitySurname, setEntitySurname] = useState(entityDetails.surname);

  return (
    <section className="md:text-2xl">
      <StatusOutputRefactor status={entityDetails.status} />

      <IdOutputRefactor id={entityDetails.id} />

      {isProfileEditing ? (
        <>
          <div className="w-full flex gap-4 mb-2 ">
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
