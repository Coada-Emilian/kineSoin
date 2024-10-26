/**
 * @file InsuranceSection.tsx
 * @description A React functional component that renders an insurance information section within a profile, allowing for editing and displaying insurance details. The component conditionally renders input fields for editing or output fields for displaying insurance information based on the editing state.
 *
 * @param {Object} props - The props for the InsuranceSection component.
 * @param {boolean} props.isProfileEditing - A boolean indicating if the profile is in editing mode.
 * @param {IInsurance} props.insurance - An object representing the insurance details to be displayed or edited.
 *
 * @returns {JSX.Element} The rendered InsuranceSection component, which contains input or output fields for insurance address, phone number, and AMC code, depending on the editing state.
 */

import { IInsurance } from '../../../../../../@types/IInsurance';
import Input from '../generalComponents/common/Input';
import Output from '../generalComponents/common/Output';

interface InsuranceSectionProps {
  isProfileEditing: boolean;
  insurance: IInsurance;
}

export default function InsuranceSection({
  isProfileEditing,
  insurance,
}: InsuranceSectionProps) {
  return (
    <>
      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <Input insurance={insurance} isInsuranceAddressInput />
        ) : (
          <Output insurance={insurance} isInsuranceAddressOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <Input insurance={insurance} isInsurancePhoneNumberInput />
        ) : (
          <Output insurance={insurance} isInsurancePhoneNumberOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <Input insurance={insurance} isInsuranceAMCCodeInput />
        ) : (
          <Output insurance={insurance} isInsuranceAMCCodeOutput />
        )}
      </section>
    </>
  );
}
