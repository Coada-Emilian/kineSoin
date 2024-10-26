/**
 * @file EditTherapistImage.tsx
 * @description A React functional component that displays the therapist's profile image with an edit icon overlay. Clicking the edit icon opens a modal for photo editing.
 *
 * @param {Object} props - The props for the EditTherapistImage component.
 * @param {ITherapist} props.therapist - The therapist object containing information about the therapist, including their profile picture and full name.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsEditPhotoModalOpen - A state setter function to control the visibility of the edit photo modal.
 *
 * @returns {JSX.Element} The rendered EditTherapistImage component, including the therapist's image and an edit icon for photo editing.
 */

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
