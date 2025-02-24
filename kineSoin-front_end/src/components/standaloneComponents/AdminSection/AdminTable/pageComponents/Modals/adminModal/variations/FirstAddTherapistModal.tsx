import StandardFileInput from '../../../../../../generalComponents/StandardInputs/standardFileInput/StandardFileInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';

interface ModalProps {
  setTherapistImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  previewUrl: string | null;
}
export default function FirstAddTherapistModal({
  setTherapistImageFile,
  setPreviewUrl,
  previewUrl,
}: ModalProps) {
  return (
    <>
      <StandardTextInput
        adminTherapist={{ isAdminTherapistAddNameInput: true }}
      />

      <StandardTextInput
        adminTherapist={{ isAdminTherapistAddSurnameInput: true }}
      />

      <StandardTextInput
        adminTherapist={{
          isAdminTherapistAddLicenceCodeInput: true,
        }}
      />

      <StandardFileInput
        isAdminTherapistImageAddInput
        setPreviewUrl={setPreviewUrl}
        setTherapistImageFile={setTherapistImageFile}
      />

      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Therapist"
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
      ) : (
        <p className="text-xs md:text-sm text-center">
          Aucune image disponible
        </p>
      )}
    </>
  );
}
