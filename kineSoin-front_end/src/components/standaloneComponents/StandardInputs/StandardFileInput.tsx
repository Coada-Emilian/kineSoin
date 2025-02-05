import { useState } from 'react';
import PatientRegisterImageModal from '../PrivateSection/PatientSection/Modals/PatientRegisterImageModal';
import addIcon from '/icons/plus.png';
import checkIcon from '/icons/check.png';
import NewPrescriptionModal from '../../pageComponents/PatientSection/PatientPrescriptionPage/NewPrescriptionModal';

interface StandardFileInputProps {
  isPatientRegisterImageInput?: boolean;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  isNewPrescriptionFileInput?: boolean;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  windowWidth?: number;
  scanPreview?: string | null;
  setScanPreview?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function StandardFileInput({
  isPatientRegisterImageInput,
  setPatientImage,
  isNewPrescriptionFileInput,
  setPrescriptionScan,
  windowWidth,
  scanPreview,
  setScanPreview,
}: StandardFileInputProps) {
  // Modal states
  const [isPatientRegisterImageModalOpen, setIsPatientRegisterImageModalOpen] =
    useState<boolean>(false);
  const [isNewPrescriptionModalOpen, setIsNewPrescriptionModalOpen] =
    useState<boolean>(false);

  // File name state
  const [fileName, setFileName] = useState<string>(
    'Aucun fichier sélectionné...'
  );
  // Image uploaded state
  const [isPatientImageUploaded, setIsPatientImageUploaded] =
    useState<boolean>(false);

  return (
    <div className="mb-4">
      <div className="flex gap-2 items-center mb-2">
        <label className="text-primaryBlue text-sm font-medium">
          {isPatientRegisterImageInput && 'Chargez votre photo'}
          {isNewPrescriptionFileInput && "Ajouter un scan de l'ordonnance :"}
        </label>

        {(isPatientRegisterImageInput && isPatientImageUploaded) ||
          (isNewPrescriptionFileInput && isPatientImageUploaded && (
            <img src={checkIcon} alt="" className="w-6" />
          ))}
      </div>

      <div className="flex rounded-md shadow-sm border">
        {isPatientRegisterImageInput && (
          <>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 italic"
              value={isPatientRegisterImageInput ? fileName : ''}
              onChange={() => {}}
            />

            <button
              type="button"
              onClick={() => {
                isPatientRegisterImageInput &&
                  setIsPatientRegisterImageModalOpen(true);
              }}
              className="bg-white rounded-tr-md rounded-br-md"
            >
              <img
                src={addIcon}
                alt={isPatientRegisterImageInput ? 'Ajouter une photo' : ''}
                className="h-6 my-auto px-2 w-auto opacity-90 bg-white"
              />
            </button>
          </>
        )}

        {isNewPrescriptionFileInput && (
          <>
            <button
              type="button"
              onClick={() => {
                isPatientRegisterImageInput &&
                  setIsPatientRegisterImageModalOpen(true);

                isNewPrescriptionFileInput &&
                  setIsNewPrescriptionModalOpen(true);
              }}
            >
              <img
                src={addIcon}
                alt={isPatientRegisterImageInput ? 'Ajouter une photo' : ''}
                className="h-6 my-auto px-2 w-auto opacity-90"
              />
            </button>

            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 italic"
              value={isNewPrescriptionFileInput ? fileName : ''}
              onChange={() => {}}
            />
          </>
        )}
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
          setIsPatientImageUploaded={setIsPatientImageUploaded}
        />
      )}

      {isNewPrescriptionModalOpen && (
        <NewPrescriptionModal
          setFileName={setFileName}
          setPrescriptionScan={setPrescriptionScan}
          isNewPrescriptionModalOpen={isNewPrescriptionModalOpen}
          setIsNewPrescriptionModalOpen={setIsNewPrescriptionModalOpen}
          windowWidth={windowWidth}
          setIsScanUploaded={setIsPatientImageUploaded}
          fileName={fileName}
          scanPreview={scanPreview}
          setScanPreview={setScanPreview}
        />
      )}
    </div>
  );
}
