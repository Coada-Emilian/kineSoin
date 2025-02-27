import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import IdOutputRefactor from '../generalComponents/common/IdOutputRefactor';
import NameOutputRefactor from '../generalComponents/common/NameOutputRefactor';
import StatusOutputRefactor from '../generalComponents/common/StatusOutputRefactor';

interface CommonSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  isProfileEditing: boolean;
}

export default function CommonSectionRefactor({
  entity,
  isProfileEditing,
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
  };

  return (
    <section className="md:text-2xl">
      <StatusOutputRefactor status={entityDetails.status} />

      <IdOutputRefactor id={entityDetails.id} />

      <NameOutputRefactor
        name={entityDetails.name}
        surname={entityDetails.surname}

      />

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
