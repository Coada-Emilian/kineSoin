/**
 * @component ProfileSectionInputs
 *
 * Renders a set of input fields for editing profile details of a given entity type
 * (e.g., therapist, patient, medic) using various standard input components.
 *
 * This component consumes global contexts to obtain current entity values,
 * input change handlers, body regions, and country prefixes to populate dropdowns.
 *
 * @param {Object} props
 * @param {string} props.entityType - The type of entity (used for input IDs and naming).
 *
 * @returns {JSX.Element} A collection of form inputs for editing profile information,
 * including email, phone prefix and number, address fields, codes (AMC, insurance, ADELI),
 * body region selection, operated status, diploma, specialty, experience, and description.
 *
 * @example
 * <ProfileSectionInputs entityType="therapist" />
 */

import { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import { usePrefixesContext } from '../../../../../../utils/contexts/PrefixesContext';
import {
  StandardDropdownInputRefactor,
  StandardEmailInputRefactor,
  StandardTelephoneInputRefactor,
  StandardTextInputRefactor,
} from '../../../../generalComponents/standardInputs/newInputs';

interface ProfileSectionInputsProps {
  entityType: string;
}

export default function ProfileSectionInputs({
  entityType,
}: ProfileSectionInputsProps) {
  // Get the global context for profile details
  const {
    entityPrefix,
    entityEmail,
    entityPhoneNumber,
    entityStreetName,
    entityStreetNumber,
    entityCity,
    entityPostalCode,
    entityAMCCode,
    entityInsuranceCode,
    entityLicenceCode,
    entityOperatedStatus,
    entityBodyRegion,
    entityDiploma,
    entitySpecialty,
    entityExperience,
    entityDescription,
    inputChangeHandlers,
    bodyRegions,
  } = useAdminProfileDetailsGlobalContext();

  // Get the countries and their prefixes from the prefixes context
  const { countries } = usePrefixesContext();

  // Find the existing country based on the entity prefix
  const existingCountry = countries.find(
    (country) => country.prefix === entityPrefix
  );
  // Filter out the remaining countries that do not match the entity prefix
  const remainingCountries = countries.filter(
    (country) => country.prefix !== entityPrefix
  );

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateName: string
  ) => {
    const handler = inputChangeHandlers.find(
      (item) => item.stateName === stateName
    );
    if (handler) {
      handler.setState(e.target.value);
    } else {
      console.warn(`No handler found for ${stateName}`);
    }
  };

  // Filter the body regions to exclude the one already selected or if no region is selected
  const remainingBodyRegions: IBodyRegion[] = bodyRegions.filter(
    (region) => region.id !== entityBodyRegion?.id || !entityBodyRegion.id
  );

  // Determine the operated status options based on the entity's operated status
  const operatedStatus =
    entityOperatedStatus === 'Oui'
      ? { value: 'true', text: 'Oui' }
      : { value: 'false', text: 'Non' };

  // Determine the other operated status option based on the entity's operated status
  const otherOperatedStatus =
    entityOperatedStatus === 'Oui'
      ? { value: 'false', text: 'Non' }
      : { value: 'true', text: 'Oui' };

  return (
    <>
      {entityEmail && (
        <StandardEmailInputRefactor
          emailInput={{
            id: `admin-${entityType}-edit-name_input`,
            value: entityEmail,
            name: 'email',
            autoComplete: 'email',
            labelName: 'E-mail',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            onChange: (e) => handleInputChange(e, 'entityEmail'),
          }}
        />
      )}

      {entityPrefix && entityPhoneNumber && (
        <div className="flex flex-row gap-2 justify-between w-full">
          <StandardDropdownInputRefactor
            dropdownInput={{
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

          <StandardTelephoneInputRefactor
            telephoneInput={{
              id: `admin-${entityType}-phoneNumber_input`,
              isRequired: true,
              autoComplete: 'phone-number',
              value: entityPhoneNumber,
              additionalLabelClassName: 'text-sm',
              additionalDivClassName: 'w-3/4',
              isFlexRow: true,
              onChange: (e) => handleInputChange(e, 'entityPhoneNumber'),
            }}
          />
        </div>
      )}

      {entityStreetName &&
        entityStreetNumber &&
        entityPostalCode &&
        entityCity && (
          <div>
            <div className="flex gap-4 mb-2">
              {' '}
              <StandardTextInputRefactor
                textInput={{
                  id: `admin-${entityType}-streetNumber_input`,
                  value: entityStreetNumber,
                  name: 'street_number',
                  labelName: 'N° rue',
                  isFlexRow: true,
                  additionalLabelClassName: 'text-sm w-full',
                  additionalDivClassName: 'w-1/3',
                  onChange: (e) => {
                    handleInputChange(e, 'entityStreetNumber');
                  },
                }}
              />
              <StandardTextInputRefactor
                textInput={{
                  id: `admin-${entityType}-streetName_input`,
                  value: entityStreetName,
                  name: 'street_name',
                  labelName: 'Nom rue',
                  isFlexRow: true,
                  additionalLabelClassName: 'text-sm w-1/4',
                  additionalDivClassName: 'w-full',
                  onChange: (e) => {
                    handleInputChange(e, 'entityStreetName');
                  },
                }}
              />
            </div>

            <div className="flex gap-4 mb-2">
              <StandardTextInputRefactor
                textInput={{
                  id: `admin-${entityType}-postalCode_input`,
                  value: entityPostalCode,
                  name: 'postal_code',
                  labelName: 'Code postal',
                  isFlexRow: true,
                  additionalLabelClassName: 'text-sm w-full',
                  additionalDivClassName: 'w-1/3',
                  onChange: (e) => {
                    handleInputChange(e, 'entityPostalCode');
                  },
                }}
              />

              <StandardTextInputRefactor
                textInput={{
                  id: `admin-${entityType}-city_input`,
                  value: entityCity,
                  name: 'city',
                  labelName: 'Ville',
                  isFlexRow: true,
                  additionalLabelClassName: 'text-sm',
                  additionalDivClassName: 'w-full',
                  onChange: (e) => {
                    handleInputChange(e, 'entityCity');
                  },
                }}
              />
            </div>
          </div>
        )}

      {entityAMCCode && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-amcCode_input`,
            value: entityAMCCode,
            name: 'amc_code',
            labelName: 'Code AMC',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entityAMCCode'),
          }}
        />
      )}

      {entityInsuranceCode && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-insuranceCode_input`,
            value: entityInsuranceCode,
            name: 'insurance_code',
            labelName: 'Code Assurance',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entityInsuranceCode'),
          }}
        />
      )}

      {entityLicenceCode && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-licenceCode_input`,
            value: entityLicenceCode,
            name: 'licence_code',
            labelName: 'Code ADELI',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm ',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entityLicenceCode'),
          }}
        />
      )}

      {entityOperatedStatus && entityBodyRegion && (
        <div className="flex gap-4 mb-2">
          <StandardDropdownInputRefactor
            dropdownInput={{
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
                  value: entityBodyRegion.id,
                  text: entityBodyRegion.name,
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

          <StandardDropdownInputRefactor
            dropdownInput={{
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
                  value: operatedStatus.value,
                  text: operatedStatus.text,
                },
                options: [
                  {
                    key: otherOperatedStatus.text,
                    value: otherOperatedStatus.value,
                    text: otherOperatedStatus.text,
                  },
                ],
              },
            }}
          />
        </div>
      )}

      {entityDiploma && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-diploma_input`,
            value: entityDiploma,
            name: 'diploma',
            labelName: 'Diplôme',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entityDiploma'),
          }}
        />
      )}

      {entitySpecialty && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-specialty_input`,
            value: entitySpecialty,
            name: 'specialty',
            labelName: 'Spécialité',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entitySpecialty'),
          }}
        />
      )}

      {entityExperience && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-experience_input`,
            value: entityExperience,
            name: 'experience',
            labelName: 'Expérience',
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entityExperience'),
          }}
        />
      )}

      {entityDescription && (
        <StandardTextInputRefactor
          textInput={{
            id: `admin-${entityType}-description_input`,
            value: entityDescription,
            name: 'description',
            labelName: 'Description',
            isTextArea: true,
            isFlexRow: true,
            additionalLabelClassName: 'text-sm',
            additionalDivClassName: 'w-full',
            onChange: (e) => handleInputChange(e, 'entityDescription'),
          }}
        />
      )}
    </>
  );
}
