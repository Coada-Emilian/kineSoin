import { IPatient } from '../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../@types/ITherapist';
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
    <>
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
    </>
  );
}
