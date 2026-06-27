import { Button } from '@headlessui/react';
import type { AdminEntityProfileImageProps } from '../../../../@types/props/adminProps';
import { useAdminEntityProfileContext } from '../../../../utils/functions/contextUtils/useAdminEntityProfileContext';
import editIcon from '/icons/edit.svg';

export default function AdminEntityProfileImage({
  picture_url,
  entityType,
}: AdminEntityProfileImageProps) {
  const { isProfileEditing, setIsEditPhotoModalOpen } =
    useAdminEntityProfileContext();

  if (!picture_url) return null;

  // Function to handle the click event for editing the photo
  const handleClick = () => {
    setIsEditPhotoModalOpen(true);
  };

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto flex justify-center items-center">
      <img
        src={picture_url}
        alt="profile"
        className="rounded-full shadow-xl w-full h-full object-cover border-4 border-white"
      />

      {isProfileEditing && entityType === 'therapist' && (
        <Button
          className="absolute top-0 left-0 md:top-2 bg-white rounded-full p-1 w-8 h-8 shadow-md"
          onClick={handleClick}
        >
          <img src={editIcon} alt="edit profile" className="w-full h-full" />
        </Button>
      )}
    </div>
  );
}
