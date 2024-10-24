import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IMedic } from '../../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileIdProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
}

export default function ProfileId({
  therapist,
  patient,
  affliction,
  medic,
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
                : ''}
      </span>
    </h4>
  );
}
