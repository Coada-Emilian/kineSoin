import { Link } from 'react-router-dom';
import { ITherapist } from '../../../../../../../@types/ITherapist';
import editIcon from '/icons/edit.svg';

interface EditTherapistImageProps {
  therapist: ITherapist;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTherapistImage({
  therapist,
  setIsEditPhotoModalOpen,
}: EditTherapistImageProps) {
  return (
    <div className="relative w-fit mx-auto mb-6 items-center flex justify-center">
      <Link to="#" onClick={() => setIsEditPhotoModalOpen(true)}>
        <img
          src={editIcon}
          alt="edit profile"
          className="absolute bg-white rounded-full p-1 top-2 left-2 w-10 h-10 shadow-md"
        />
      </Link>
      <img
        src={therapist && therapist.picture_url}
        alt={therapist && therapist.fullName}
        className="rounded-xl shadow-xl w-48 md:w-72"
      />
    </div>
  );
}
