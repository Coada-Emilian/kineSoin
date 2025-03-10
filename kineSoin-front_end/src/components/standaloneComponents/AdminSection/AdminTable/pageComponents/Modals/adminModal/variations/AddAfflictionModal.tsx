import BaseModal from '../../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { handleAfflictionSubmit } from '../utils/dataSubmitFunctions';
import { useGlobalContext } from '../../../../../../../../utils/contexts/GlobalContext';
import StandardTextInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../../../@types/standardInterfaces';
import { fetchBodyRegionsAsAdmin } from '../../../../../../../../utils/apiUtils/adminApiUtils/adminBodyRegionApiUtils';
import StandardDropdownInputRefactor from '../../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import CustomBtn from '../../../../../../generalComponents/CustomButton/CustomButtonRefactor';
import CreateButtonsSection from '../../../../new_components/CreateButtonsSection';

interface AddAfflictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAfflictionModal({
  isOpen,
  onClose,
}: AddAfflictionModalProps) {
  const { errorMessage, setError } = useGlobalContext();

  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  useEffect(() => {
    fetchBodyRegionsAsAdmin().then((bodyRegions) => {
      setBodyRegions(bodyRegions);
    });
  }, []);

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
              setError,
              setIsAddAfflictionModalOpen: onClose,
            })
          }
        >
          <StandardTextInputRefactor
            textInput={{
              inputId: 'affliction-register-name_input',
              labelName: 'Nom',
              inputName: 'name',
              inputPlaceholder: "Entrez le nom de l'affliction",
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardDropdownInputRefactor
            dropdownInput={{
              inputId: 'affliction-register-bodyRegion_input',
              labelName: 'Region concernée',
              inputName: 'body_region_id',
              autoComplete: 'body region',
              isRequired: true,
              allOptions: {
                startingOption: {
                  value: '',
                  text: 'Choisissez une région',
                },
                options: [
                  ...bodyRegions.map((region) => ({
                    key: region.id.toString(),
                    value: region.id.toString(),
                    text: `${region.name}`,
                  })),
                ],
              },
            }}
          />

          <div className="flex gap-1">
            <StandardTextInputRefactor
              textInput={{
                inputId: 'affliction-register-licenceCode_input',
                labelName: 'Cotation',
                inputName: 'insurance_code',
                inputPlaceholder: "Entrez la cotation de l'affliction",
                isRequired: true,
                autoComplete: 'insurance-code',
              }}
            />

            <StandardDropdownInputRefactor
              dropdownInput={{
                inputId: 'affliction-register-operatedStatus_input',
                labelName: 'Est opéré ?',
                inputName: 'is_operated',
                autoComplete: 'is operated',
                isRequired: true,
                allOptions: {
                  startingOption: {
                    value: '',
                    text: "Choisissez le statut de l'affliction",
                  },
                  options: [
                    {
                      key: '1',
                      value: 'true',
                      text: 'Oui',
                    },
                    {
                      key: '2',
                      value: 'false',
                      text: 'Non',
                    },
                  ],
                },
              }}
            />
          </div>

          <StandardTextInputRefactor
            textInput={{
              inputId: 'affliction-register-description_input',
              labelName: 'Description',
              inputName: 'description',
              inputPlaceholder: "Entrez la description de l'affliction",
              isRequired: true,
              isTextArea: true,
              autoComplete: 'description',
            }}
          />

          <CreateButtonsSection onClose={onClose} />
        </form>
      </div>
    </BaseModal>
  );
}
