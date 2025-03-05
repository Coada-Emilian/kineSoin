import StandardChoiceDropdown from '../../../../../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput';
import StandardTelephoneInput from '../../../../../../generalComponents/StandardInputs/StandardTelephoneInput';
import StandardTextInput from '../../../../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { addSecondFormDetails } from '../utils/addFormDetailsFunctions';
import CustomButton from '../../../../../../generalComponents/CustomButton/CustomButton';

import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import { useAdminAddTherapistFormGlobalContext } from '../../../../../../../../utils/contexts/AdminAddTherapistFormGlobalContext';

interface SecondAddTherapistModalProps {
  isOpen: boolean;
  onClose: () => void;

  setIsAddTherapistModalP3Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SecondAddTherapistModal({
  isOpen,
  onClose,

  setIsAddTherapistModalP3Open,
}: SecondAddTherapistModalProps) {
  const { errorMessage, setError } = useGlobalContext();
  const { setAddForm } = useAdminAddTherapistFormGlobalContext();
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
            addSecondFormDetails(e, {
              setError,
              setAddForm,
              setIsAddTherapistModalP2Open: onClose,
              setIsAddTherapistModalP3Open: setIsAddTherapistModalP3Open,
            })
          }
        >
          <StandardTextInput
            adminTherapist={{ isAdminTherapistAddDiplomaInput: true }}
          />

          <StandardTextInput
            adminTherapist={{
              isAdminTherapistAddExperienceInput: true,
            }}
          />

          <StandardTextInput
            adminTherapist={{ isAdminTherapistAddSpecialtyInput: true }}
          />

          <div className="flex gap-2 items-center justify-between">
            <StandardChoiceDropdown isCountryDropdownInput />

            <StandardTelephoneInput isAdminTherapistAddTelephoneInput />
          </div>

          <StandardTextInput
            adminTherapist={{
              isAdminTherapistAddDescriptionInput: true,
            }}
          />

          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 2 / 3 : Études et expérience
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
