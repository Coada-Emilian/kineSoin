import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../../@types/interfaces/modelInterfaces';
import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitAfflictionMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/affliction_mutations/useAfflictionSubmitMutation';
import { useFetchBodyRegionsMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/region_mutations/useFetchBodyRegionsMutation';
import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';

interface AddAfflictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAfflictionModal({
  isOpen,
  onClose,
}: AddAfflictionModalProps) {
  const submitAfflictionMutation = useSubmitAfflictionMutation(onClose);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAfflictionMutation.mutate(new FormData(e.currentTarget));
  };

  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  const regionFetchMutation = useFetchBodyRegionsMutation(setBodyRegions);

  useEffect(() => {
    if (location.pathname.includes('affliction')) {
      regionFetchMutation.mutate();
    } else {
      console.log('Not on affliction page');
    }
  }, [isOpen]);

  if (regionFetchMutation.isPending || submitAfflictionMutation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une affliction
        </h2>

        {(regionFetchMutation.error || submitAfflictionMutation.error) && (
          <p className="text-red-500 text-xs text-center">
            {regionFetchMutation.error?.message ||
              submitAfflictionMutation.error?.message}
          </p>
        )}

        <form className="space-y-4 " onSubmit={handleFormSubmit}>
          <StandardTextInputRefactor
            textInput={{
              id: 'affliction-register-name_input',
              labelName: 'Nom',
              name: 'name',
              placeholder: "Entrez le nom de l'affliction",
              isRequired: true,
              autoComplete: 'name',
            }}
          />

          <StandardDropdownInputRefactor
            dropdownInput={{
              id: 'affliction-register-bodyRegion_input',
              labelName: 'Region concernée',
              name: 'body_region_id',
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
                id: 'affliction-register-licenceCode_input',
                labelName: 'Cotation',
                name: 'insurance_code',
                placeholder: "Entrez la cotation de l'affliction",
                isRequired: true,
                autoComplete: 'insurance-code',
              }}
            />

            <StandardDropdownInputRefactor
              dropdownInput={{
                id: 'affliction-register-operatedStatus_input',
                labelName: 'Est opéré ?',
                name: 'is_operated',
                autoComplete: 'is operated',
                isRequired: true,
                allOptions: {
                  startingOption: {
                    value: '',
                    text: "Statut de l'affliction",
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
              id: 'affliction-register-description_input',
              labelName: 'Description',
              name: 'description',
              placeholder: "Entrez la description de l'affliction",
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
