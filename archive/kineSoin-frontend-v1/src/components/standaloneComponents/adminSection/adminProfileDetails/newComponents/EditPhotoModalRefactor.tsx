/**
 * @component EditPhotoModalRefactor
 *
 * Modal component for editing a therapist's profile photo.
 *
 * Allows the user to select a new image file, preview it immediately,
 * and confirm or cancel the change.
 *
 * Uses a global context to manage and display the current preview URL of the photo.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {() => void} props.onClose - Callback to close the modal.
 * @param {ITherapist} props.therapist - Therapist object containing current photo URL.
 * @param {React.Dispatch<React.SetStateAction<File | null>>} props.setSelectedFile -
 *   State setter to store the newly selected image file.
 *
 * @returns {JSX.Element} A modal UI to upload and preview a new therapist photo.
 *
 * @example
 * <EditPhotoModalRefactor
 *   isOpen={isModalOpen}
 *   onClose={() => setModalOpen(false)}
 *   therapist={therapistData}
 *   setSelectedFile={setFile}
 * />
 */

import { ITherapist } from '../../../../../@types/interfaces/modelInterfaces';
import { useAdminProfileDetailsGlobalContext } from '../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from '../../../privateSection/therapistSection/modals/BaseModal';

interface EditPhotoModalRefactorProps {
  isOpen: boolean;
  onClose: () => void;
  therapist: ITherapist;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export default function EditPhotoModalRefactor({
  isOpen,
  onClose,
  therapist,
  setSelectedFile,
}: EditPhotoModalRefactorProps) {
  // Get the preview URL and setPreviewUrl from the global context
  const { previewUrl, setPreviewUrl } = useAdminProfileDetailsGlobalContext();

  // Initialize the selected file state
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Update preview URL
    }
  };

  // Handle cancel click to reset the selected file and preview URL
  const handleCancelClick = () => {
    setSelectedFile(null);
    setPreviewUrl(therapist.picture_url);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4 m-6">
        <h2 className="text-lg font-semibold">
          Modifier la photo du thérapeute
        </h2>

        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Therapist"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <p>No photo available</p>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primaryBlue hover:file:bg-secondaryBlue cursor-pointer"
        />

        <div className="flex justify-end gap-4">
          <CustomBtn
            btn={{
              type: 'basic',
              text: 'Confirmer',
              style: 'normal',
              onClick: () => {
                handleFileChange;
                onClose();
              },
            }}
          />

          <CustomBtn
            btn={{
              type: 'cancel',
              text: 'Annuler',
              style: 'normal',
              onClick: handleCancelClick,
            }}
          />
        </div>
      </div>
    </BaseModal>
  );
}
