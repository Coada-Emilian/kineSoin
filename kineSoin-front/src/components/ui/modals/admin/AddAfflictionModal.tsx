import { useEffect, useState } from 'react';
import type { IBodyRegion } from '../../../../@types/interfaces/modelInterfaces';
import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useAfflictionCreationMutation } from '../../../../utils/hooks/admin/creation/useAfflictionCreationMutation';
import { useFetchAdminBodyRegionsMutation } from '../../../../utils/hooks/admin/fetch/useFetchAdminBodyRegionsMutation';
import DNALoader from '../../DNALoader';
import DropdownInput from '../../inputs/DropdownInput';
import TextInput from '../../inputs/TextInput';
import BaseModal from '../BaseModal';
import ButtonSection from './addTherapist/ButtonSection';

export default function AddAfflictionModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const submitAfflictionMutation = useAfflictionCreationMutation(onClose);

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitAfflictionMutation.mutate(new FormData(e.currentTarget));
  };

  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  const regionFetchMutation = useFetchAdminBodyRegionsMutation(setBodyRegions);

  useEffect(() => {
    regionFetchMutation.mutate();
  }, []);

  if (regionFetchMutation.isPending || submitAfflictionMutation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="compact" size="sm">
      <h2 className="text-xl md:text-2xl font-semibold text-primaryBlue italic">
        Ajouter une affliction
      </h2>

      <p className="text-sm text-gray-500">Créez une nouvelle affliction</p>

      {(regionFetchMutation.error || submitAfflictionMutation.error) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-center text-red-600 text-sm">
            {regionFetchMutation.error?.message ||
              submitAfflictionMutation.error?.message}
          </p>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        <TextInput
          input={{
            id: 'affliction-register-name_input',
            labelName: 'Nom',
            name: 'name',
            placeholder: "Entrez le nom de l'affliction",
            isRequired: true,
            autoComplete: 'name',
          }}
        />

        <DropdownInput
          input={{
            id: 'affliction-register-bodyRegion_input',
            labelName: 'Région concernée',
            name: 'body_region_id',
            autoComplete: 'body region',
            isRequired: true,
            allOptions: {
              startingOption: {
                value: '',
                text: 'Choisissez une région',
              },
              options: bodyRegions.map((region) => ({
                key: region.id.toString(),
                value: region.id.toString(),
                text: region.name,
              })),
            },
          }}
        />

        <div className="flex gap-2 w-full">
          <TextInput
            input={{
              id: 'affliction-register-licenceCode_input',
              labelName: 'Cotation',
              name: 'insurance_code',
              placeholder: "Entrez la cotation de l'affliction",
              isRequired: true,
              autoComplete: 'insurance-code',
              additionalDivClassName: 'w-1/2',
            }}
          />

          <DropdownInput
            input={{
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

        <TextInput
          input={{
            id: 'affliction-register-description_input',
            labelName: 'Description',
            name: 'description',
            placeholder: "Entrez la description de l'affliction",
            isRequired: true,
            isTextArea: true,
            autoComplete: 'description',
          }}
        />

        <ButtonSection onClose={onClose} />
      </form>
    </BaseModal>
  );
}
