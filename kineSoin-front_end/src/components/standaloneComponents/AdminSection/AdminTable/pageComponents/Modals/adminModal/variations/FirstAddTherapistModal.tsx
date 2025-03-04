import { useState } from 'react';
import { IAddForm } from '../../../../../../../../@types/formInterfaces';
import StandardFileInput from '../../../../../../generalComponents/StandardInputs/standardFileInput/StandardFileInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addFirstFormDetails } from '../utils/addFormDetailsFunctions';
import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import { useGlobalAdminContext } from '../../../../../../../../contexts/GlobalAdminContext';

interface FirstAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;
  setAddForm: React.Dispatch<React.SetStateAction<IAddForm>>;
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FirstAddTherapistModal({
  isOpen,
  onClose,
  setAddForm,
  setIsAddTherapistModalP2Open,
}: FirstAddTherapistModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [therapistImageFile, setTherapistImageFile] = useState<File | null>(
    null
  );

  const { errorMessage, setError } = useGlobalAdminContext();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un thérapeute
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            addFirstFormDetails(e, {
              therapistImageFile: therapistImageFile,
              setError,
              setAddForm: setAddForm,
              setIsAddTherapistModalP1Open: onClose,
              setIsAddTherapistModalP2Open: setIsAddTherapistModalP2Open,
            })
          }
        >
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

          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 1 / 3 : Informations personnelles
          </p>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Suivant" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => {
                onClose && onClose();
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
