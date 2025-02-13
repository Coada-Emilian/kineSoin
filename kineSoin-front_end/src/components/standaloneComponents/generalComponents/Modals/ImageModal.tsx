import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../CustomButton/CustomButton';

interface ImageModalProps {
  isPatientRegisterImageModalOpen?: boolean;
  setIsPatientRegisterImageModalOpen?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  fileName?: string;
  setFileName?: React.Dispatch<React.SetStateAction<string>>;
  setIsPatientImageUploaded?: React.Dispatch<React.SetStateAction<boolean>>;
  isPatientRegisterImageModal?: boolean;
  isNewPrescriptionScanModal?: boolean;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  isNewPrescriptionModalOpen?: boolean;
  setIsNewPrescriptionModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setScanPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  setIsScanUploaded?: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminTherapistImageModal?: boolean;
  isAdminTherapistImageModalOpen?: boolean;
  setIsAdminTherapistImageModalOpen?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsAdminTherapistImageUploaded?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistImageFile?: React.Dispatch<React.SetStateAction<File | null>>;
}
export default function ImageModal({
  isPatientRegisterImageModalOpen,
  setIsPatientRegisterImageModalOpen,
  setPatientImage,
  fileName,
  setFileName,
  setIsPatientImageUploaded,
  isPatientRegisterImageModal,
  isNewPrescriptionScanModal,
  setPrescriptionScan,
  isNewPrescriptionModalOpen,
  setIsNewPrescriptionModalOpen,
  setScanPreview,
  setIsScanUploaded,
  isAdminTherapistImageModal,
  isAdminTherapistImageModalOpen,
  setIsAdminTherapistImageModalOpen,
  setIsAdminTherapistImageUploaded,
  setPreviewUrl,
  setTherapistImageFile,
}: ImageModalProps) {
  const windowWidth = window.innerWidth;
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (setFileName) {
        setFileName(file.name);
      }
      // Create a URL for the file preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      if (setPreviewUrl) {
        setPreviewUrl(previewUrl);
      }
      if (setPatientImage) {
        setPatientImage(file);
      }
      if (setPrescriptionScan) {
        setPrescriptionScan(file);
      }
      if (setTherapistImageFile) {
        setTherapistImageFile(file);
      }
    } else {
      if (setFileName) {
        setFileName('Aucun fichier sélectionné');
      }
    }
  };

  return (
    <ReactModal
      isOpen={
        !!(
          isPatientRegisterImageModalOpen ||
          isNewPrescriptionModalOpen ||
          isAdminTherapistImageModalOpen
        )
      }
      onRequestClose={() => {
        if (setIsPatientRegisterImageModalOpen) {
          setIsPatientRegisterImageModalOpen(false);
        }
        if (setIsNewPrescriptionModalOpen) {
          setIsNewPrescriptionModalOpen(false);
        }
        if (setIsAdminTherapistImageUploaded) {
          setIsAdminTherapistImageUploaded(false);
        }
      }}
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
      <h3 className="text-xl text-center font-semibold text-primaryBlue italic">
        {isPatientRegisterImageModal
          ? 'Ajoutez votre photo de profil'
          : isNewPrescriptionScanModal
            ? 'Chargez votre scan'
            : isAdminTherapistImageModal
              ? 'Ajoutez une photo'
              : ''}
      </h3>

      <div className="flex flex-col gap-4 mt-4">
        <input
          type="file"
          accept="image/*"
          name={`${isPatientRegisterImageModal || isAdminTherapistImageModal ? 'photo' : isNewPrescriptionScanModal ? 'scan' : ''}`}
          id={`${
            isPatientRegisterImageModal
              ? 'patient-register-image_input'
              : isNewPrescriptionScanModal
                ? 'new-prescription-scan_input'
                : isAdminTherapistImageModal
                  ? 'admin-therapist-image_input'
                  : ''
          }`}
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor={`${
            isPatientRegisterImageModal
              ? 'patient-register-image_input'
              : isNewPrescriptionScanModal
                ? 'new-prescription-scan_input'
                : isAdminTherapistImageModal
                  ? 'admin-therapist-image_input'
                  : ''
          }`}
          className="w-full flex gap-2 items-center justify-between px-1 py-1 border rounded-md cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-secondaryTeal"
        >
          <span className="text-center">
            {' '}
            {windowWidth && windowWidth < 768
              ? `${(fileName || '').slice(0, 10)}...`
              : `${(fileName || '').slice(0, 35)}...`}
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
              className={`${isPatientRegisterImageModal || isAdminTherapistImageModal ? 'h-36 md:h-48 rounded-full' : ''} w-36 md:w-48 object-contain rounded-3xl border`}
            />
          </div>
        )}

        <div className="flex">
          <CustomButton
            btnText="Valider"
            normalButton
            onClick={() => {
              setIsPatientRegisterImageModalOpen &&
                setIsPatientRegisterImageModalOpen(false);

              setIsPatientImageUploaded && setIsPatientImageUploaded(true);

              setIsNewPrescriptionModalOpen &&
                setIsNewPrescriptionModalOpen(false);

              setIsScanUploaded && setIsScanUploaded(true);

              setIsAdminTherapistImageModalOpen &&
                setIsAdminTherapistImageModalOpen(false);

              setIsAdminTherapistImageUploaded &&
                setIsAdminTherapistImageUploaded(true);

              setScanPreview && setScanPreview(preview);
            }}
          />
        </div>
      </div>
    </ReactModal>
  );
}
