import { useState } from 'react';
import CustomButton from '../../CustomButton/CustomButton';
import { handleFileChange } from './functions/handleFileChange';
import BaseModal from '../../../PrivateSection/TherapistSection/Modals/BaseModal';
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  inputId: string;
  inputName: string;
  fileName: string;
  setIsFileAdded: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ImageModalRefactor({
  isOpen,
  onClose,
  setPatientImage,
  setFileName,
  inputId,
  inputName,
  fileName,
  setIsFileAdded,
}: ImageModalProps) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h3 className="text-xl text-center font-semibold text-primaryBlue italic">
        Chargez votre photo
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
              // setPreviewUrl,
              setPatientImage,
              // setPrescriptionScan,
              // setTherapistImageFile,
            })
          }
        />

        <label
          htmlFor={inputId}
          className="w-full flex gap-2 items-center justify-between px-1 py-1 border rounded-md cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-secondaryTeal"
        >
          <span className="text-center block md:hidden">
            {`${(fileName || '').slice(0, 10)}...`}
          </span>

          <span className="text-center hidden md:block">
            {`${(fileName || '').slice(0, 35)}...`}
          </span>

          <span className="bg-secondaryTeal text-white px-3 py-1 rounded-md text-center">
            Choisir un fichier
          </span>
        </label>

        {preview && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-gray-700 text-sm mb-4">Aperçu de l'image </p>

            <img
              src={preview}
              alt="Aperçu du fichier"
              className={`h-36 md:h-48 rounded-full w-36 md:w-48 object-contain border`}
            />
          </div>
        )}

        <div className="flex justify-center mt-4 gap-4">
          <CustomButton
            btnText="Valider"
            normalButton
            onClick={() => {
              setIsFileAdded(true);
              onClose && onClose();
            }}
          />
          <CustomButton
            btnText="Annuler"
            cancelButton
            onClick={() => onClose && onClose()}
          />
        </div>
      </div>
    </BaseModal>
  );
}
