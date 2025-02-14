import ReactModal from 'react-modal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import { useState } from 'react';

interface NewPrescriptionModalProps {
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  isNewPrescriptionModalOpen: boolean;
  setIsNewPrescriptionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth?: number;
  setIsScanUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string;
  scanPreview?: string | null;
  setScanPreview?: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function NewPrescriptionModal({
  setFileName,
  setPrescriptionScan,
  isNewPrescriptionModalOpen,
  setIsNewPrescriptionModalOpen,
  windowWidth,
  setIsScanUploaded,
  fileName,
  scanPreview,
  setScanPreview,
}: NewPrescriptionModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Create a URL for the file preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      if (setScanPreview) {
        setScanPreview(previewUrl);
      }
      if (setPrescriptionScan) {
        setPrescriptionScan(file);
      }
    } else {
      setFileName('Aucun fichier sélectionné');
    }
  };

  return (
    <ReactModal
      isOpen={isNewPrescriptionModalOpen}
      onRequestClose={() => setIsNewPrescriptionModalOpen(false)}
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
        Chargez votre scan
      </h3>

      <div className="flex flex-col gap-4 mt-4">
        <input
          type="file"
          accept="image/*"
          name="scan"
          id="new-prescription-scan_input"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="new-prescription-scan_input"
          className="w-full flex gap-2 items-center justify-between px-1 py-1 border rounded-md cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-secondaryTeal"
        >
          <span className="text-center">
            {' '}
            {windowWidth && windowWidth < 768
              ? `${fileName.slice(0, 10)}...`
              : `${fileName.slice(0, 35)}...`}
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
              className="w-48 object-contain rounded-3xl border"
            />
          </div>
        )}

        <div className="flex">
          <CustomButton
            btnText="Valider"
            normalButton
            onClick={() => {
              setIsNewPrescriptionModalOpen(false), setIsScanUploaded(true);
            }}
          />
        </div>
      </div>
    </ReactModal>
  );
}
