import { useState } from 'react';
import addIcon from '/icons/plus.png';
import checkIcon from '/icons/check.png';
import ImageModal from '../Modals/ImageModal';

interface StandardFileInputProps {
  isPatientRegisterImageInput?: boolean;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  isNewPrescriptionFileInput?: boolean;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  setScanPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  isAdminTherapistImageAddInput?: boolean;
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistImageFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function StandardFileInput({
  isPatientRegisterImageInput,
  setPatientImage,
  isNewPrescriptionFileInput,
  setPrescriptionScan,
  setScanPreview,
  isAdminTherapistImageAddInput,
  setPreviewUrl,
  setTherapistImageFile,
}: StandardFileInputProps) {
  // Modal states
  const [isPatientRegisterImageModalOpen, setIsPatientRegisterImageModalOpen] =
    useState<boolean>(false);
  const [isNewPrescriptionModalOpen, setIsNewPrescriptionModalOpen] =
    useState<boolean>(false);
  const [isAdminTherapistImageModalOpen, setIsAdminTherapistImageModalOpen] =
    useState<boolean>(false);

  // File name state
  const [fileName, setFileName] = useState<string>(
    'Aucun fichier sélectionné...'
  );
  // Image uploaded state
  const [isPatientImageUploaded, setIsPatientImageUploaded] =
    useState<boolean>(false);

  const [isScanUploaded, setIsScanUploaded] = useState<boolean>(false);

  const [isAdminTherapistImageUploaded, setIsAdminTherapistImageUploaded] =
    useState<boolean>(false);

  const getLabelContent = () =>
    isPatientRegisterImageInput
      ? 'Chargez votre photo'
      : isNewPrescriptionFileInput
        ? "Ajouter un scan de l'ordonnance"
        : isAdminTherapistImageAddInput
          ? 'Ajouter une photo'
          : '';

  const labelContent = getLabelContent();

  return (
    <div className="mb-4 flex flex-col gap-2 items-center md:items-start">
      <div className="flex gap-2 items-center mb-2">
        <label className="text-primaryBlue text-sm font-medium">
          {labelContent}
        </label>

        {((isPatientRegisterImageInput && isPatientImageUploaded) ||
          (isNewPrescriptionFileInput && isScanUploaded) ||
          (isAdminTherapistImageAddInput && isAdminTherapistImageUploaded)) && (
          <img src={checkIcon} alt="check" className="w-6" />
        )}
      </div>

      <div className="flex rounded-md shadow-sm border md:w-full">
        {(isPatientRegisterImageInput ||
          isAdminTherapistImageAddInput ||
          isNewPrescriptionFileInput) && (
          <>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-tl-md rounded-bl-md focus:outline-none focus:ring-2 focus:ring-secondaryTeal focus:ring-opacity-50 italic "
              value={fileName}
              onChange={() => {}}
              readOnly
            />

            <button
              type="button"
              onClick={() => {
                isPatientRegisterImageInput &&
                  setIsPatientRegisterImageModalOpen(true);
                isNewPrescriptionFileInput &&
                  setIsNewPrescriptionModalOpen(true);
                isAdminTherapistImageAddInput &&
                  setIsAdminTherapistImageModalOpen(true);
              }}
              className="bg-white rounded-tr-md rounded-br-md"
            >
              <img
                src={addIcon}
                alt={
                  isPatientRegisterImageInput || isAdminTherapistImageAddInput
                    ? 'Ajouter une photo'
                    : isNewPrescriptionFileInput
                      ? "Ajouter un scan de l'ordonnance"
                      : ''
                }
                className="h-6 my-auto px-2 w-auto opacity-90 bg-white"
              />
            </button>
          </>
        )}
      </div>

      {isPatientRegisterImageModalOpen && (
        <ImageModal
          isPatientRegisterImageModal
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
        <ImageModal
          isNewPrescriptionScanModal
          setFileName={setFileName}
          setPrescriptionScan={setPrescriptionScan}
          isNewPrescriptionModalOpen={isNewPrescriptionModalOpen}
          setIsNewPrescriptionModalOpen={setIsNewPrescriptionModalOpen}
          setIsScanUploaded={setIsScanUploaded}
          fileName={fileName}
          setScanPreview={setScanPreview}
        />
      )}

      {isAdminTherapistImageModalOpen && (
        <ImageModal
          isAdminTherapistImageModal
          fileName={fileName}
          setFileName={setFileName}
          isAdminTherapistImageModalOpen={isAdminTherapistImageModalOpen}
          setIsAdminTherapistImageModalOpen={setIsAdminTherapistImageModalOpen}
          setIsAdminTherapistImageUploaded={setIsAdminTherapistImageUploaded}
          setPreviewUrl={setPreviewUrl}
          setTherapistImageFile={setTherapistImageFile}
        />
      )}
    </div>
  );
}
