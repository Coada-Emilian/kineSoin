import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import StatusOutputRefactor from '../generalComponents/common/StatusOutputRefactor';

interface CommonSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
  isProfileEditing: boolean;
}

export default function CommonSectionRefactor({
  entity,
  isProfileEditing,
}: CommonSectionRefactorProps) {
  return (
    <section className="md:text-2xl">
      <StatusOutputRefactor entity={entity} />

      {/* <GeneralOutput
        isProfileIdOutput
        therapist={therapist}
        patient={patient}
        affliction={affliction}
        medic={medic}
        insurance={insurance}
      />

      {isProfileEditing ? (
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
      )} */}
    </section>
  );
}
