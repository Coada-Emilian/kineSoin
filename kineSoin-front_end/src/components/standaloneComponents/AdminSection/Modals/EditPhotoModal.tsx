// Purpose: Provide a modal to edit the therapist's photo.

import ReactModal from 'react-modal';
import { ITherapist } from '../../../../@types/ITherapist';
import { useState } from 'react';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';

interface EditPhotoModalProps {
  isEditPhotoModalOpen: boolean;
  setIsEditPhotoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  therapist: ITherapist;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function EditPhotoModal({
  isEditPhotoModalOpen,
  setIsEditPhotoModalOpen,
  therapist,
  setSelectedFile,
}: EditPhotoModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    therapist.picture_url
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Update preview URL
    }
  };

  return (
    <ReactModal
      isOpen={isEditPhotoModalOpen}
      onRequestClose={() => setIsEditPhotoModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="flex flex-col items-center text-center gap-4">
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
          <CustomButton
            btnText="Confirmer"
            normalButton
            btnType="submit"
            onClick={() => setIsEditPhotoModalOpen(false)}
          />

          <CustomButton
            btnText="Annuler"
            cancelButton
            btnType="button"
            onClick={() => {
              setSelectedFile(null), setIsEditPhotoModalOpen(false);
            }}
          />
        </div>
      </div>
    </ReactModal>
  );
}
