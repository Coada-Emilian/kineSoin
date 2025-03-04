// Purpose: Provide the ImageSection component which displays the therapist's profile image.

import { IPatient, ITherapist } from '../../../../../../@types/types';
import ProfileImage from '../generalComponents/common/ProfileImage';
import EditTherapistImage from '../generalComponents/therapist/EditTherapistImage';

interface ImageSectionProps {
  therapist?: ITherapist;
  patient?: IPatient;
  isProfileEditing: boolean;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageSection({
  therapist,
  patient,
  isProfileEditing,
  setIsEditPhotoModalOpen,
}: ImageSectionProps) {
  return (
    <div className="mb-4">
      {isProfileEditing ? (
        therapist && (
          <EditTherapistImage
            therapist={therapist}
            setIsEditPhotoModalOpen={setIsEditPhotoModalOpen}
          />
        )
      ) : (
        <ProfileImage therapist={therapist} patient={patient} />
      )}
    </div>
  );
}
