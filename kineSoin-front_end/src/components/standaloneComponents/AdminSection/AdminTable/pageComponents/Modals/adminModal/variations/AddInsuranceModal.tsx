import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleInsuranceSubmit } from '../utils/dataSubmitFunctions';

interface AddInsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
}

export default function AddInsuranceModal({
  isOpen,
  onClose,
  setErrorMessage,
  errorMessage,
}: AddInsuranceModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un organisme d'assurance
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            handleInsuranceSubmit(e, {
              setErrorMessage: setErrorMessage,
              setIsAddInsuranceModalOpen: onClose,
            })
          }
        >
          <StandardTextInput
            adminInsurance={{ isAdminInsuranceAddNameInput: true }}
          />

          <StandardTextInput
            adminInsurance={{ isAdminInsuranceAddLicenceCodeInput: true }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInput
              adminInsurance={{
                isAdminInsuranceAddStreetNumberInput: true,
              }}
            />

            <StandardTextInput
              adminInsurance={{ isAdminInsuranceAddStreetNameInput: true }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInput
              adminInsurance={{ isAdminInsuranceAddPostalCodeInput: true }}
            />

            <StandardTextInput
              adminInsurance={{ isAdminInsuranceAddCityInput: true }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardChoiceDropdown isCountryDropdownInput />

            <StandardTelephoneInput isAdminInsuranceAddTelephoneInput />
          </div>

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
