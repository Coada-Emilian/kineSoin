// Purpose: Provide the EditTherapistImage component which displays the therapist's profile image with an edit icon.

import { Link } from 'react-router-dom';
import editIcon from '/icons/edit.svg';
import { ITherapist } from '../../../../../../../@types/types';

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
