import { ITherapist } from '../../../../../../@types/ITherapist';

interface SpecialtyProps {
  therapist: ITherapist;
}

export default function Specialty({ therapist }: SpecialtyProps) {
  return (
    <div>
      <h4 className="font-bold">Spécialité :</h4>
      <span className="italic font-normal">{therapist.specialty}</span>
    </div>
  );
}
