import { ITherapist } from '../../../../../../@types/ITherapist';

interface TherapistDescriptionProps {
  therapist: ITherapist;
}

export default function TherapistDescription({
  therapist,
}: TherapistDescriptionProps) {
  return (
    <div>
      <h4 className="font-bold ">Description :</h4>
      <p className="font-normal italic">{therapist.description}</p>
    </div>
  );
}
