import { useState } from 'react';
import PatientRegisterImageModal from '../Modals/PatientRegisterImageModal';
import addIcon from '/icons/plus.png';
import checkIcon from '/icons/check.png';

interface StandardFileInputProps {
  isPatientRegisterImageInput?: boolean;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function StandardFileInput({
  isPatientRegisterImageInput,
  setPatientImage,
}: StandardFileInputProps) {
  const [isPatientRegisterImageModalOpen, setIsPatientRegisterImageModalOpen] =
    useState<boolean>(false);

  const [fileName, setFileName] = useState<string>(
    'Aucun fichier sélectionné...'
  );

  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

  return (
    <div className="mb-4">
      <div className="flex gap-2 items-center mb-2">
        <label className="text-primaryBlue text-sm font-medium">
          Chargez votre photo
        </label>
        {isImageUploaded && <img src={checkIcon} alt="" className="w-6" />}
      </div>

      <div className="flex rounded-md shadow-sm border">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 italic"
          value={fileName}
          onChange={() => {}}
        />

        <button
          type="button"
          onClick={() => setIsPatientRegisterImageModalOpen(true)}
        >
          <img
            src={addIcon}
            alt="Ajouter une photo"
            className="h-6 my-auto px-2 w-auto opacity-90"
          />
        </button>
      </div>

      {isPatientRegisterImageModalOpen && (
        <PatientRegisterImageModal
          isPatientRegisterImageModalOpen={isPatientRegisterImageModalOpen}
          setIsPatientRegisterImageModalOpen={
            setIsPatientRegisterImageModalOpen
          }
          setPatientImage={setPatientImage}
          fileName={fileName}
          setFileName={setFileName}
          setIsImageUploaded={setIsImageUploaded}
        />
      )}
    </div>
  );
}
