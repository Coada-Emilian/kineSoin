import { IPatient } from '../../../../../../../@types/IPatient';

interface ProfileEmailProps {
  patient?: IPatient | null;
}

export default function ProfileEmail({ patient }: ProfileEmailProps) {
  return (
    <h4 className="font-semibold mb-2">
      Email : <span className="italic font-normal">{}</span>
      <span className="italic font-normal">{patient ? patient.email : ''}</span>
    </h4>
  );
}
