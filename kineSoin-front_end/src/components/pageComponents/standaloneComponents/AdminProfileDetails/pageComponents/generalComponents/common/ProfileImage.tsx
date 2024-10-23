import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileImageProps {
  therapist?: ITherapist;
  patient?: IPatient;
}

export default function ProfileImage({
  therapist,
  patient,
}: ProfileImageProps) {
  return (
    <div className="w-fit mx-auto mb-6 flex justify-center items-center">
      {therapist && (
        <img
          src={therapist.picture_url}
          alt={therapist.fullName}
          className="rounded-xl shadow-xl w-48 md:w-72"
        />
      )}
      {patient && (
        <img
          src={patient.picture_url}
          alt={patient.fullName}
          className="rounded-xl shadow-xl w-48 md:w-72"
        />
      )}
    </div>
  );
}
