// Purpose: Provide the GeneralSection component which displays the general details of a profile.

import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/types';
import GeneralInput from '../generalComponents/common/GeneralInput';
import GeneralOutput from '../generalComponents/common/GeneralOutput';

interface CommonSectionProps {
  patient?: IPatient | null;
  therapist?: ITherapist | null;
  affliction?: IAffliction;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
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
