import { IInsurance } from '../../../../../../@types/IInsurance';
import Address from '../generalComponents/common/Address';
import EditAddress from '../generalComponents/common/EditAddress';
import EditLicenceCode from '../generalComponents/common/EditLicenceCode';
import EditPhoneNumber from '../generalComponents/common/EditPhoneNumber';
import LicenceCode from '../generalComponents/common/LicenceCode';
import PhoneNumber from '../generalComponents/common/PhoneNumber';

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
          <EditAddress insurance={insurance} />
        ) : (
          <Address insurance={insurance} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditPhoneNumber insurance={insurance} />
        ) : (
          <PhoneNumber insurance={insurance} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditLicenceCode insurance={insurance} />
        ) : (
          <LicenceCode insurance={insurance} />
        )}
      </section>
    </>
  );
}
