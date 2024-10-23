import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ExperienceProps {
  therapist: ITherapist;
}

export default function Experience({ therapist }: ExperienceProps) {
  return (
    <div>
      <h4 className="font-bold">Experience :</h4>
      <span className="italic font-normal">{therapist.experience}</span>
    </div>
  );
}
