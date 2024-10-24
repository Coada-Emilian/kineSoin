import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IMedic } from '../../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileNameProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
}

export default function ProfileName({
  therapist,
  patient,
  affliction,
  medic,
}: ProfileNameProps) {
  return (
    <h4 className="font-semibold mb-2">
      Nom :{' '}
      <span className="italic font-normal">
        {therapist
          ? therapist.fullName
          : patient
            ? patient.fullName
            : medic
              ? medic.fullName
              : affliction
                ? affliction.name
                : ''}
      </span>
    </h4>
  );
}
