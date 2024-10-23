import { ITherapist } from '../../../../../../@types/ITherapist';

interface EditDiplomaProps {
  therapist: ITherapist;
}

export default function EditDiploma({ therapist }: EditDiplomaProps) {
  return (
    <div className="flex gap-2 items-center mb-2 ">
      <label htmlFor="diploma" className="font-semibold">
        Diplôme :
      </label>
      <input
        type="text"
        name="diploma"
        id="therapist_diploma"
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={therapist.diploma || ''}
      />
    </div>
  );
}
