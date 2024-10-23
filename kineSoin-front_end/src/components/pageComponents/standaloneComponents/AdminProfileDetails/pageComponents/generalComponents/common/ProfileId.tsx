import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileIdProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
}

export default function ProfileId({
  therapist,
  patient,
  affliction,
}: ProfileIdProps) {
  return (
    <h4 className="font-semibold mb-2">
      #ID :{' '}
      <span className="italic font-normal">
        {therapist ? therapist.id : ''}
        {patient ? patient.id : ''}
        {affliction ? affliction.id : ''}
      </span>
    </h4>
  );
}
