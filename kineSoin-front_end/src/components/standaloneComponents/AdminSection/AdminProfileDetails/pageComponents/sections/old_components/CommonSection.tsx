// Purpose: Provide the GeneralSection component which displays the general details of a profile.

import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/interfaces/modelInterfaces';
import GeneralInput from '../../generalComponents/common/Inputs/old_components/GeneralInput';
import GeneralOutput from '../../generalComponents/common/Outputs/old_components/GeneralOutput';

interface CommonSectionProps {
  patient?: IPatient;
  therapist?: ITherapist;
  affliction?: IAffliction;
  medic?: IMedic;
  insurance?: IInsurance;
  isProfileEditing: boolean;
}

export default function CommonSection({
  patient,
  therapist,
  affliction,
  medic,
  insurance,
  isProfileEditing,
}: CommonSectionProps) {
  return (
    <section className="md:text-2xl">
      {(therapist || patient) && (
        <GeneralOutput
          isProfileStatusOutput
          therapist={therapist}
          patient={patient}
        />
      )}

      <GeneralOutput
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
      )}
    </section>
  );
}
