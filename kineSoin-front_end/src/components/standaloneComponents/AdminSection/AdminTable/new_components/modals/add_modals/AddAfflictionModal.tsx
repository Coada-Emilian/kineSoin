/**
 * @component AddAfflictionModal
 *
 * A modal component for adding a new affliction. It provides input fields for affliction name, associated body region,
 * insurance code, operation status, and a description. The form submission is handled by `useSubmitAffliction`.
 *
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {() => void} onClose - Function to close the modal.
 *
 * @returns {JSX.Element} - The rendered modal component with input fields and action buttons.
 *
 * @example
 * <AddAfflictionModal isOpen={isModalOpen} onClose={handleClose} />
 *
 * @remarks
 * - Uses `useFetchBodyRegions` to fetch available body regions on mount.
 * - Displays error messages from the global context.
 * - Form submission is handled via React Query's mutation.
 */

import BaseModal from '../../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import { useGlobalContext } from '../../../../../../../utils/contexts/GlobalContext';
import StandardTextInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardTextInputRefactor';
import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../../@types/standardInterfaces';
import StandardDropdownInputRefactor from '../../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import CreateButtonsSection from '../../page_components/CreateButtonsSection';
import { useSubmitAffliction } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/modals/mutations/useAfflictionSubmit';
import { useFetchBodyRegions } from '../../../../../../../utils/componentUtils/pageComponents/functions/adminSection/AdminTable/modals/mutations/useFetchBodyRegions';
import { DNA } from 'react-loader-spinner';
import DNALoader from '../../../../../../../utils/DNALoader';

interface AddAfflictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAfflictionModal({
  isOpen,
  onClose,
}: AddAfflictionModalProps) {
  const { errorMessage, setError } = useGlobalContext();

  const submitAfflictionMutation = useSubmitAffliction(onClose, setError);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAfflictionMutation.mutate(new FormData(e.currentTarget));
  };

  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  const regionFetchMutation = useFetchBodyRegions(setBodyRegions, setError);

  useEffect(() => {
    regionFetchMutation.mutate();
  }, []);

  if (regionFetchMutation.isPending || submitAfflictionMutation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter une affliction
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
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
