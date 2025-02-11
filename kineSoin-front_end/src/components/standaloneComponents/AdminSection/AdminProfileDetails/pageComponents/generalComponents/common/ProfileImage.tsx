// Purpose: Provide the ProfileImage component which displays the therapist's or patient's profile image.

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
    <div className="w-48 h-48 md:w-80 md:h-80 object-cover mx-auto mb-6 flex justify-center items-center">
      {therapist && (
        <img
          src={therapist.picture_url}
          alt={therapist.fullName}
          className="rounded-xl shadow-xl w-full h-full object-cover"
        />
      )}

      {patient && (
        <img
          src={patient.picture_url}
          alt={patient.fullName}
          className="rounded-xl shadow-xl w-full h-full object-cover"
        />
      )}
    </div>
  );
}
