import { useState } from 'react';
import type { BasicModalProps } from '../../../../@types/props/modalProps';
import CustomButton from '../../buttons/CustomButton';
import BaseModal from '../BaseModal';
import { useAdminEntityProfileContext } from '../../../../hooks/context/useAdminEntityProfileContext';

export default function AdminProfileImageEditModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { editedEntity, setEditedEntity, setSelectedFile } =
    useAdminEntityProfileContext();

  const [previewUrl, setPreviewUrl] = useState(editedEntity.picture_url);

  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleConfirmClick = () => {
    if (!pendingFile || !previewUrl) {
      onClose();
      return;
    }

    setSelectedFile(pendingFile);

    setEditedEntity((prev) => ({
      ...prev,
      picture_url: previewUrl,
    }));

    onClose();
  };

  const handleCancelClick = () => {
    setPendingFile(null);
    setPreviewUrl(editedEntity.picture_url);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleCancelClick}>
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
          <CustomButton
            btn={{
              type: 'basic',
              text: 'Confirmer',
              style: 'normal',
              onClick: handleConfirmClick,
            }}
          />

          <CustomButton
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
