// Purpose: Provide a component that displays the ID of the profile being viewed.

import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileIdProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
}

export default function ProfileId({
  therapist,
  patient,
  affliction,
  medic,
  insurance,
}: ProfileIdProps) {
  return (
    <h4 className="font-semibold mb-2">
      #ID :{' '}
      <span className="italic font-normal">
        {therapist
          ? therapist.id
          : patient
            ? patient.id
            : affliction
              ? affliction.id
              : medic
                ? medic.id
                : insurance
                  ? insurance.id
                  : ''}
      </span>
    </h4>
  );
}
