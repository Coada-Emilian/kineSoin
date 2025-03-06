import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';
import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/old_inputs/StandardTextInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleMedicSubmit } from '../utils/dataSubmitFunctions';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';

interface AddMedicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMedicModal({ isOpen, onClose }: AddMedicModalProps) {
  const { errorMessage, setError } = useGlobalContext();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un médecin
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form
          className="space-y-4 "
          onSubmit={(e) =>
            handleMedicSubmit(e, {
              setError,
              setIsAddMedicModalOpen: onClose,
            })
          }
        >
          <StandardTextInput adminMedic={{ isAdminMedicAddNameInput: true }} />

          <StandardTextInput
            adminMedic={{ isAdminMedicAddSurnameInput: true }}
          />

          <StandardTextInput
            adminMedic={{ isAdminMedicAddLicenceCodeInput: true }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInput
              adminMedic={{ isAdminMedicAddStreetNumberInput: true }}
            />

            <StandardTextInput
              adminMedic={{ isAdminMedicAddStreetNameInput: true }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardTextInput
              adminMedic={{ isAdminMedicAddPostalCodeInput: true }}
            />

            <StandardTextInput
              adminMedic={{ isAdminMedicAddCityInput: true }}
            />
          </div>

          <div className="flex gap-2 items-center justify-between">
            <StandardChoiceDropdown isCountryDropdownInput />

            <StandardTelephoneInput isAdminMedicAddTelephoneInput />
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
