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
