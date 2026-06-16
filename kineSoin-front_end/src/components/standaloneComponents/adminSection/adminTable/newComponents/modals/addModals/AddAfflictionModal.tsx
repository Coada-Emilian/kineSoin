/**
 * @component AddAfflictionModal
 *
 * A modal component that renders a form for adding a new affliction. It allows admins
 * to input details such as the name, affected body region, insurance code, operation status,
 * and a description. It fetches available body regions dynamically when opened.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {() => void} onClose - Function to close the modal.
 *
 * @returns {JSX.Element} - The form modal for creating a new affliction.
 *
 * @example
 * <AddAfflictionModal isOpen={isModalOpen} onClose={closeModalHandler} />
 *
 * @remarks
 * - Uses React Query mutations for submitting the form and fetching body regions.
 * - Displays a loading spinner while fetching or submitting.
 * - Uses FormData to collect and send form fields to the backend.
 * - The `is_operated` field accepts a boolean string ("true" or "false").
 *
 * @dependencies
 * - `useSubmitAfflictionMutation` to handle affliction submission.
 * - `useFetchBodyRegionsMutation` to populate body region dropdown.
 * - `StandardTextInputRefactor` and `StandardDropdownInputRefactor` for inputs.
 * - `BaseModal` for rendering the modal UI.
 * - `CreateButtonsSection` for form submit/cancel buttons.
 * - `DNALoader` for loading animation.
 */

import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../../@types/interfaces/modelInterfaces';
import DNALoader from '../../../../../../../utils/DNALoader';
import { useSubmitAfflictionMutation } from '../../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/afflictionModalMutations/useAfflictionSubmitMutation';
import { useFetchBodyRegionsMutation } from '../../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/bodyRegionModalMutations/useFetchBodyRegionsMutation';
import StandardDropdownInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardDropdownInputRefactor';
import StandardTextInputRefactor from '../../../../../generalComponents/standardInputs/newInputs/StandardTextInputRefactor';
import BaseModal from '../../../../../privateSection/therapistSection/modals/BaseModal';
import CreateButtonsSection from '../../pageComponents/CreateButtonsSection';

interface AddAfflictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAfflictionModal({
  isOpen,
  onClose,
}: AddAfflictionModalProps) {
  // Declare the mutation for submitting the affliction
  const submitAfflictionMutation = useSubmitAfflictionMutation(onClose);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAfflictionMutation.mutate(new FormData(e.currentTarget));
  };

  // Initialize the state to store body regions
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  // Fetch body regions using a custom mutation
  const regionFetchMutation = useFetchBodyRegionsMutation(setBodyRegions);

  // Fetch body regions when the modal is opened
  useEffect(() => {
    if (location.pathname.includes('affliction')) {
      regionFetchMutation.mutate();
    }
  }, [isOpen]);

  // If the body regions are still being fetched or the affliction submission is pending, show a loader
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

          <div className="flex gap-2 w-full">
            <StandardTextInputRefactor
              textInput={{
                id: 'affliction-register-licenceCode_input',
                labelName: 'Cotation',
                name: 'insurance_code',
                placeholder: "Entrez la cotation de l'affliction",
                isRequired: true,
                autoComplete: 'insurance-code',
                additionalDivClassName: 'w-1/2',
              }}
            />

            <StandardDropdownInputRefactor
              dropdownInput={{
                id: 'affliction-register-operatedStatus_input',
                additionalDivClassName: 'w-1/2',
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
