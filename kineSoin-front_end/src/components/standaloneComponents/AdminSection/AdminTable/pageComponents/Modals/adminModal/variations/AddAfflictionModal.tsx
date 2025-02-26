import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleAfflictionSubmit } from '../utils/dataSubmitFunctions';

interface AddAfflictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
}

export default function AddAfflictionModal({
  isOpen,
  onClose,
  setErrorMessage,
  errorMessage,
}: AddAfflictionModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une affliction
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            handleAfflictionSubmit(e, {
              setErrorMessage: setErrorMessage,
              setIsAddAfflictionModalOpen: onClose,
            })
          }
        >
          <StandardTextInput
            adminAffliction={{ isAdminAfflictionAddNameInput: true }}
          />

          <StandardChoiceDropdown isAdminAfflictionAddRegionInput />

          <div className="flex gap-1">
            <StandardTextInput
              adminAffliction={{
                isAdminAfflictionAddLicenceCodeInput: true,
              }}
            />

            <StandardChoiceDropdown isAdminAfflictionAddOperatedStatusInput />
          </div>

          <StandardTextInput
            adminAffliction={{ isAdminAfflictionAddDescriptionInput: true }}
          />

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />

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
