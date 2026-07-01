import type { ICountryPrefix } from '../../../../../../@types/interfaces/apiInterfaces';
import type { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import type { AdminPageProps } from '../../../../../../@types/props/adminProps';
import type { IAdminEntityProfileInputTypes } from '../../../../../../@types/types/adminTypes';
import { hasValues } from '../../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import { useFetchAdminBodyRegionsQuery } from '../../../../../../utils/hooks/admin/queries/useFetchAdminBodyRegionsQuery';
import { useAdminEntityProfileContext } from '../../../../../../utils/hooks/context/useAdminEntityProfileContext';
import { useAppContext } from '../../../../../../utils/hooks/context/useAppContext';
import DropdownInput from '../../../../../ui/inputs/DropdownInput';
import EmailInput from '../../../../../ui/inputs/EmailInput';
import TelephoneInput from '../../../../../ui/inputs/TelephoneInput';
import TextInput from '../../../../../ui/inputs/TextInput';

export default function AdminEntityProfileContactSectionInputs({
  entityType,
}: AdminPageProps) {
  // Get the countries and their prefixes from the prefixes context
  const { countryPrefixes } = useAppContext();

  const { editedEntity, setEditedEntity } = useAdminEntityProfileContext();

  // Find the existing country based on the entity prefix
  const existingCountry = countryPrefixes.find(
    (country: ICountryPrefix) => country.prefix === editedEntity.prefix
  );
  // Filter out the remaining countries that do not match the entity prefix
  const remainingCountries = countryPrefixes.filter(
    (country) => country.prefix !== editedEntity.prefix
  );

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputType: IAdminEntityProfileInputTypes
  ) => {
    setEditedEntity((prev) => ({
      ...prev,
      [inputType]: e.target.value,
    }));
  };

  const { data: body_regions = [] } = useFetchAdminBodyRegionsQuery(true);

  // Filter the body regions to exclude the one already selected or if no region is selected
  const remainingBodyRegions: IBodyRegion[] = body_regions.filter(
    (region: IBodyRegion) =>
      region.id !== editedEntity?.id || !editedEntity.body_region?.id
  );

  const operatedOptions = [
    { value: true, text: 'Oui' },
    { value: false, text: 'Non' },
  ];

  const startingOption =
    operatedOptions.find(
      (option) => option.text === editedEntity.is_operated
    ) ?? operatedOptions[0];

  const options =
    operatedOptions.find(
      (option) => option.text !== editedEntity.is_operated
    ) ?? operatedOptions[0];

  return (
    <>
      {hasValues(editedEntity.email) && (
        <EmailInput
          input={{
            id: `admin-${entityType}-edit-name_input`,
            value: editedEntity.email,
            name: 'email',
            autoComplete: 'email',
            labelName: 'E-mail',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            onChange: (e) => handleInputChange(e, 'email'),
          }}
        />
      )}

      {hasValues(editedEntity.prefix, editedEntity.phone_number) && (
        <div className="flex flex-row gap-2 justify-between w-full">
          <DropdownInput
            input={{
              id: `admin-${entityType}-prefix_input`,
              labelName: 'Préfixe',
              additionalDivClassName: 'w-1/4',
              additionalLabelClassName: 'text-sm',
              isFlexRow: true,
              name: 'prefix',
              autoComplete: 'prefix',
              isRequired: true,
              allOptions: {
                startingOption: {
                  value: `${existingCountry?.prefix}`,
                  text: `${existingCountry?.name} ${existingCountry?.prefix}`,
                },
                options: [
                  ...remainingCountries.map((country) => ({
                    key: country.name,
                    value: country.prefix,
                    text: `${country.name} ${country.prefix}`,
                  })),
                ],
              },
            }}
          />

          <TelephoneInput
            input={{
              id: `admin-${entityType}-phoneNumber_input`,
              isRequired: true,
              autoComplete: 'phone-number',
              value: editedEntity.phone_number,
              additionalLabelClassName: 'text-sm',
              additionalDivClassName: 'w-3/4',
              isFlexRow: true,
              onChange: (e) => handleInputChange(e, 'phone_number'),
            }}
          />
        </div>
      )}

      {hasValues(
        editedEntity.street_name,
        editedEntity.street_number,
        editedEntity.postal_code,
        editedEntity.city
      ) && (
        <div>
          <div className="flex gap-4 mb-2">
            {' '}
            <TextInput
              input={{
                id: `admin-${entityType}-streetNumber_input`,
                value: editedEntity.street_number,
                name: 'street_number',
                labelName: 'N° rue',
                isFlexRow: true,
                additionalLabelClassName: 'text-sm w-full',
                additionalDivClassName: 'w-1/3',
                onChange: (e) => {
                  handleInputChange(e, 'street_number');
                },
              }}
            />
            <TextInput
              input={{
                id: `admin-${entityType}-streetName_input`,
                value: editedEntity.street_name,
                name: 'street_name',
                labelName: 'Nom rue',
                isFlexRow: true,
                additionalLabelClassName: 'text-sm w-1/4',
                additionalDivClassName: 'w-full',
                onChange: (e) => {
                  handleInputChange(e, 'street_name');
                },
              }}
            />
          </div>

          <div className="flex gap-4 mb-2">
            <TextInput
              input={{
                id: `admin-${entityType}-postalCode_input`,
                value: editedEntity.postal_code,
                name: 'postal_code',
                labelName: 'Code postal',
                isFlexRow: true,
                additionalLabelClassName: 'text-sm w-full',
                additionalDivClassName: 'w-1/3',
                onChange: (e) => {
                  handleInputChange(e, 'postal_code');
                },
              }}
            />

            <TextInput
              input={{
                id: `admin-${entityType}-city_input`,
                value: editedEntity.city,
                name: 'city',
                labelName: 'Ville',
                isFlexRow: true,
                additionalLabelClassName: 'text-sm',
                additionalDivClassName: 'w-full',
                onChange: (e) => {
                  handleInputChange(e, 'city');
                },
              }}
            />
          </div>
        </div>
      )}

      {hasValues(editedEntity.amc_code) && (
        <TextInput
          input={{
            id: `admin-${entityType}-amcCode_input`,
            value: editedEntity.amc_code,
            name: 'amc_code',
            labelName: 'Code AMC',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'amc_code'),
          }}
        />
      )}

      {hasValues(editedEntity.insurance_code) && (
        <TextInput
          input={{
            id: `admin-${entityType}-insuranceCode_input`,
            value: editedEntity.insurance_code,
            name: 'insurance_code',
            labelName: 'Code Assurance',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'insurance_code'),
          }}
        />
      )}

      {hasValues(editedEntity.licence_code) && (
        <TextInput
          input={{
            id: `admin-${entityType}-licenceCode_input`,
            value: editedEntity.licence_code,
            name: 'licence_code',
            labelName: 'Code ADELI',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm ',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'licence_code'),
          }}
        />
      )}

      {hasValues(editedEntity.is_operated, editedEntity.body_region) && (
        <div className="flex gap-4 mb-2">
          <DropdownInput
            input={{
              id: `admin-${entityType}-bodyRegion_input`,
              labelName: 'Région du corps',
              additionalDivClassName: 'w-1/2',
              additionalLabelClassName: 'text-sm',
              isFlexRow: true,
              name: 'body_region_id',
              autoComplete: 'body-region',
              isRequired: true,
              allOptions: {
                startingOption: {
                  value: editedEntity.body_region?.id?.toString() ?? '',
                  text: editedEntity?.body_region?.name as string,
                },
                options: [
                  ...remainingBodyRegions.map((region) => ({
                    key: region.name,
                    value: region.id.toString(),
                    text: region.name,
                  })),
                ],
              },
            }}
          />

          <DropdownInput
            input={{
              id: `admin-${entityType}-operatedStatus_input`,
              labelName: 'Opéré',
              additionalDivClassName: 'w-1/2',
              additionalLabelClassName: 'text-sm',
              isFlexRow: true,
              name: 'is_operated',
              autoComplete: 'operated-status',
              isRequired: true,
              allOptions: {
                startingOption: {
                  value: startingOption.value.toString(),
                  text: startingOption.text,
                },
                options: [
                  {
                    key: options.text,
                    value: options.value.toString(),
                    text: options.text,
                  },
                ],
              },
            }}
          />
        </div>
      )}

      {hasValues(editedEntity.diploma) && (
        <TextInput
          input={{
            id: `admin-${entityType}-diploma_input`,
            value: editedEntity.diploma,
            name: 'diploma',
            labelName: 'Diplôme',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'diploma'),
          }}
        />
      )}

      {hasValues(editedEntity.specialty) && (
        <TextInput
          input={{
            id: `admin-${entityType}-specialty_input`,
            value: editedEntity.specialty,
            name: 'specialty',
            labelName: 'Spécialité',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'specialty'),
          }}
        />
      )}

      {hasValues(editedEntity.experience) && (
        <TextInput
          input={{
            id: `admin-${entityType}-experience_input`,
            value: editedEntity.experience,
            name: 'experience',
            labelName: 'Expérience',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'experience'),
          }}
        />
      )}

      {hasValues(editedEntity.description) && (
        <TextInput
          input={{
            id: `admin-${entityType}-description_input`,
            value: editedEntity.description,
            name: 'description',
            labelName: 'Description',
            isTextArea: true,
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'description'),
          }}
        />
      )}
    </>
  );
}
