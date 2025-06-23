/**
 * @component ImageOutputRefactor
 *
 * Displays a rounded profile image for a given entity type, with an optional edit button.
 *
 * @param {Object} props
 * @param {string | undefined} props.picture_url - The URL of the profile picture to display.
 * @param {string} props.entityType - The type of entity (e.g., 'therapist') to determine display logic.
 *
 * @returns {JSX.Element | null} The profile image component; returns null if no picture URL is provided.
 *
 * @description
 * - Shows a profile image with a white border and shadow.
 * - If the entity is a therapist and the profile is in editing mode, displays an edit button overlay.
 * - Clicking the edit button opens the photo editing modal via global context.
 *
 * @example
 * <ImageOutputRefactor picture_url="https://example.com/pic.jpg" entityType="therapist" />
 */

import { Button } from '@headlessui/react';
import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import editIcon from '/icons/edit.svg';

interface ImageOutputProps {
  picture_url: string | undefined;
  entityType: string;
}

export default function ImageOutputRefactor({
  picture_url,
  entityType,
}: ImageOutputProps) {
  // If picture_url is not provided, return null
  if (!picture_url) return null;

  // Get the context for profile editing and modal state
  const { isProfileEditing, setIsEditPhotoModalOpen } =
    useAdminProfileDetailsGlobalContext();

  // Function to handle the click event for editing the photo
  const handleClick = () => {
    setIsEditPhotoModalOpen(true);
  };

  // Get the preview URL from the context
  const { previewUrl } = useAdminProfileDetailsGlobalContext();

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto flex justify-center items-center">
      <img
        src={
          entityType === 'therapist' ? (previewUrl ?? undefined) : picture_url
        }
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
