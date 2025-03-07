interface FunctionProps {
  setFileName?: React.Dispatch<React.SetStateAction<string>>;
  setPreview?: React.Dispatch<React.SetStateAction<string | null>>;
  setPreviewUrl?: React.Dispatch<React.SetStateAction<string | null>>;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
  setPrescriptionScan?: React.Dispatch<React.SetStateAction<File | null>>;
  setTherapistImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  {
    setFileName,
    setPreview,
    setPreviewUrl,
    setPatientImage,
    setPrescriptionScan,
    setTherapistImage,
  }: FunctionProps
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
    // if (setPrescriptionScan) {
    //   setPrescriptionScan(file);
    // }
    if (setTherapistImage) {
      setTherapistImage(file);
    }
  } else {
    if (setFileName) {
      setFileName('Aucun fichier sélectionné');
    }
  }
};
