import type { HandleFileChangeFunctionProps } from '../../@types/interfaces/customProps';

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  {
    setFileName,
    setPreview,
    setPreviewUrl,
    setPatientImage,
    setPrescriptionScan,
    setTherapistImage,
  }: HandleFileChangeFunctionProps
) => {
  const file = e.target.files?.[0];
  if (file) {
    if (setFileName) {
      setFileName(file.name);
    }
    // Create a URL for the file preview
    const previewUrl = URL.createObjectURL(file);
    if (setPreview) {
      setPreview(previewUrl);
    }
    if (setPreviewUrl) {
      setPreviewUrl(previewUrl);
    }
    if (setPatientImage) {
      setPatientImage(file);
    }
    if (setPrescriptionScan) {
      setPrescriptionScan(file);
    }
    if (setTherapistImage) {
      setTherapistImage(file);
    }
  } else {
    if (setFileName) {
      setFileName('Aucun fichier sélectionné');
    }
  }
};
