import { useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/interfaces/modelInterfaces';
import { useAdminProfileDetailsGlobalContext } from '../../../../../../utils/contexts/AdminProfileDetailsGlobalContext';
import { usePrefixesContext } from '../../../../../../utils/contexts/PrefixesContext';
import StandardDropdownInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardDropdownInputRefactor';
import StandardEmailInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor';
import StandardTelephoneInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardTelephoneInputRefactor';
import AddressOutputRefactor from '../generalComponents/common/Outputs/new_components/AddressOutputRefactor';
import AgeAndGenderOutputRefactor from '../generalComponents/common/Outputs/new_components/AgeAndGenderOutputRefactor';
import AMCCodeOutputRefactor from '../generalComponents/common/Outputs/new_components/AMCCodeOutputRefactor';
import BodyRegionAndOperatedStatusOutputRefactor from '../generalComponents/common/Outputs/new_components/BodyRegionAndOperatedStatusOutputRefactor';
import DescriptionOutputRefactor from '../generalComponents/common/Outputs/new_components/DescriptionOutputRefactor';
import DiplomaOutputRefactor from '../generalComponents/common/Outputs/new_components/DiplomaOutputRefactor';
import EmailOutputRefactor from '../generalComponents/common/Outputs/new_components/EmailOutputRefactor';
import ExperienceOutputRefactor from '../generalComponents/common/Outputs/new_components/ExperienceOutputRefactor';
import InsuranceCodeOutputRefactor from '../generalComponents/common/Outputs/new_components/InsuranceCodeOutputRefactor';
import LicenceCodeOutputRefactor from '../generalComponents/common/Outputs/new_components/LicenceCodeOutputRefactor';
import PhoneNumberOutputRefactor from '../generalComponents/common/Outputs/new_components/PhoneNumberOutputRefactor';
import SpecialtyOutputRefactor from '../generalComponents/common/Outputs/new_components/SpecialtyOutputRefactor';
import { getProfileSectionEntityDetails } from './getProfileSectionEntityDetails';

interface ProfileSectionRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | undefined;
  entityType: string;
}

export default function ProfileSectionRefactor({
  entity,
  entityType,
}: ProfileSectionRefactorProps) {
  const entityDetails = getProfileSectionEntityDetails(entity);

  const { isProfileEditing } = useAdminProfileDetailsGlobalContext();

  const { countries } = usePrefixesContext();

  const [entityEmail, setEntityEmail] = useState(entityDetails.email);
  const [entityPrefix, setEntityPrefix] = useState(entityDetails.prefix);
  const [entityPhoneNumber, setEntityPhoneNumber] = useState(
    entityDetails.phone_number
  );
  const existingCountry = countries.find(
    (country) => country.prefix === entityDetails.prefix
  );
  const remainingCountries = countries.filter(
    (country) => country.prefix !== entityDetails.prefix
  );

  return (
    <section className="mb-2 md:text-2xl w-full">
      {isProfileEditing ? (
        <>
          <StandardEmailInputRefactor
            emailInput={{
              id: `admin-${entityType}-edit-name_input`,
              value: entityEmail,
              name: 'email',
              autoComplete: 'email',
              labelName: 'E-mail:',
              isFlexRow: true,
              additionalLabelClassName: 'text-sm',
              onChange: (e) => {
                setEntityEmail(e.target.value);
              },
            }}
          />

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
                onChange: (e) => {
                  setEntityPhoneNumber(e.target.value);
                },
              }}
            />
          </div>
        </>
      ) : (
        <>
          <AgeAndGenderOutputRefactor
            age={entityDetails.age}
            gender={entityDetails.gender}
          />

          <EmailOutputRefactor email={entityDetails.email} />

          <PhoneNumberOutputRefactor
            prefix={entityDetails.prefix}
            phone_number={entityDetails.phone_number}
          />

          <AddressOutputRefactor
            city={entityDetails.city}
            postal_code={entityDetails.postal_code}
            street_number={entityDetails.street_number}
            street_name={entityDetails.street_name}
          />

          <AMCCodeOutputRefactor amc_code={entityDetails.amc_code} />

          <InsuranceCodeOutputRefactor
            insurance_code={entityDetails.insurance_code}
          />

          <LicenceCodeOutputRefactor
            licence_code={entityDetails.licence_code}
          />

          <BodyRegionAndOperatedStatusOutputRefactor
            body_region={entityDetails.body_region}
            is_operated={entityDetails.is_operated}
          />

          <DiplomaOutputRefactor diploma={entityDetails.diploma} />

          <SpecialtyOutputRefactor specialty={entityDetails.specialty} />

          <ExperienceOutputRefactor experience={entityDetails.experience} />

          <DescriptionOutputRefactor description={entityDetails.description} />
        </>
      )}
    </section>
  );
}
