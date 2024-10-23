import { ITherapist } from '../../../../../../@types/ITherapist';

interface DiplomaProps {
  therapist: ITherapist;
}

export default function Diploma({ therapist }: DiplomaProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">Diplôme :</h4>
      <span className="italic font-normal">{therapist.diploma}</span>
    </div>
  );
}
