import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileNameProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
}

export default function ProfileName({
  therapist,
  patient,
  affliction,
}: ProfileNameProps) {
  return (
    <h4 className="font-semibold mb-2">
      Nom :{' '}
      <span className="italic font-normal">
        {therapist && therapist.fullName}
        {patient && patient.fullName}
        {affliction && affliction.name}
      </span>
    </h4>
  );
}
