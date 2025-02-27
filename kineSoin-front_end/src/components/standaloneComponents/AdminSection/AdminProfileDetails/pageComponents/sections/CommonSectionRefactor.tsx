import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import NameInputRefactor from '../generalComponents/common/Inputs/NameInputRefactor';
import EmailOutputRefactor from '../generalComponents/common/Outputs/EmailOutputRefactor';
import IdOutputRefactor from '../generalComponents/common/Outputs/IdOutputRefactor';
import NameOutputRefactor from '../generalComponents/common/Outputs/NameOutputRefactor';
import StatusOutputRefactor from '../generalComponents/common/Outputs/StatusOutputRefactor';
import EmailInputRefactor from '../generalComponents/common/Inputs/EmailInputRefactor';

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
  const entityDetails = {
    status:
      entity && 'status' in entity ? entity.status || undefined : undefined,
    id: entity && entity.id,
    name: entity && 'name' in entity ? entity.name || undefined : undefined,
    surname:
      entity && 'surname' in entity ? entity.surname || undefined : undefined,
    fullName:
      entity && 'fullName' in entity ? entity.fullName || undefined : undefined,
    email: entity && 'email' in entity ? entity.email || undefined : undefined,
  };

  useEffect(() => {
    setEntityName(entityDetails.name);
    setEntitySurname(entityDetails.surname);
  }, [entity]);

  const [entityName, setEntityName] = useState(entityDetails.name);
  const [entitySurname, setEntitySurname] = useState(entityDetails.surname);
  const [entityEmail, setEntityEmail] = useState(entityDetails.email);

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
          {entityDetails.email && (
            <EmailInputRefactor
              entityType={entityType}
              setFunction={setEntityEmail}
              value={entityEmail}
              type="email"
            />
          )}
        </>
      ) : (
        <>
          <NameOutputRefactor
            name={entityDetails.name}
            surname={entityDetails.surname}
          />

          <EmailOutputRefactor email={entityDetails.email} />
        </>
      )}

      {/* {isProfileEditing ? (
        <div className="flex flex-col gap-2 mb-2 ">
          {(therapist || affliction || medic || insurance) && (
            <GeneralInput
              isProfileNameInput
              therapist={therapist}
              affliction={affliction}
              medic={medic}
              insurance={insurance}
            />
          )}

          {(therapist || medic) && (
            <GeneralInput
              isProfileSurnameInput
              therapist={therapist}
              medic={medic}
            />
          )}
        </div>
      ) : (
        <>
          {(therapist || affliction || medic || insurance || patient) && (
            <GeneralOutput
              isProfileNameOutput
              therapist={therapist}
              patient={patient}
              affliction={affliction}
              medic={medic}
              insurance={insurance}
            />
          )}

          {(patient || therapist) && (
            <GeneralOutput
              isProfileEmailOutput
              patient={patient}
              therapist={therapist}
            />
          )}
        </>
      )}  */}
    </section>
  );
}
