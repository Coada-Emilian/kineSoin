import { useState } from 'react';
import type { ImageModalProps } from '../../../@types/props/modalProps';
import { handleFileChange } from '../../../utils/functions/handleFileChange';
import CustomButton from '../buttons/CustomButton';
import BaseModal from './BaseModal';

export default function ImageModal({
  isOpen,
  onClose,
  setPatientImage,
  setTherapistImage,
  setFileName,
  inputId,
  inputName,
  fileName,
  setIsFileAdded,
}: ImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="md">
      <h3 className="text-xm md:text-base text-center font-semibold text-primaryBlue italic">
        Ajoutez une photo de profil
      </h3>

      <div className="flex flex-col gap-4 mt-4">
        <input
          type="file"
          accept="image/*"
          name={inputName}
          id={inputId}
          className="hidden"
          onChange={(e) =>
            handleFileChange(e, {
              setFileName,
              setPreview,
              setPatientImage,
              setTherapistImage,
            })
          }
        />

        <label
          htmlFor={inputId}
          className="w-full flex items-center justify-between px-4 py-3 border border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 transition-all duration-200 hover:bg-gray-100 hover:border-secondaryTeal"
        >
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 italic">
              {fileName || 'Aucun fichier sélectionné'}
            </span>

            <span className="text-xs text-gray-400">PNG, JPG jusqu'à 5MB</span>
          </div>

          <span className="bg-secondaryTeal text-white px-4 py-2 rounded-lg text-sm shadow-sm">
            Choisir
          </span>
        </label>

        {preview && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-gray-700 text-sm mb-4">Aperçu de l'image</p>

            <img
              src={preview}
              alt="Aperçu du fichier"
              className="h-36 md:h-40 w-36 md:w-40 rounded-full object-cover border border-gray-200 shadow-sm"
            />
          </div>
        )}

        <div className="flex justify-center mt-6 gap-3">
          <CustomButton
            btn={{
              type: 'basic',
              text: 'Valider',
              style: 'normal',
              onClick: () => {
                setIsFileAdded(true);
                onClose();
              },
            }}
          />

          <CustomButton
            btn={{
              type: 'cancel',
              text: 'Annuler',
              style: 'normal',
              onClick: () => {
                onClose();
              },
            }}
          />
        </div>
      </div>
    </BaseModal>
  );
}
