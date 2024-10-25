import { IMedic } from '../../../../../../@types/IMedic';
import Address from '../generalComponents/common/Address';
import EditAddress from '../generalComponents/common/EditAddress';
import EditLicenceCode from '../generalComponents/common/EditLicenceCode';
import EditPhoneNumber from '../generalComponents/common/EditPhoneNumber';
import LicenceCode from '../generalComponents/common/LicenceCode';
import PhoneNumber from '../generalComponents/common/PhoneNumber';

interface MedicSectionProps {
  isProfileEditing: boolean;
  medic: IMedic;
}

export default function MedicSection({
  isProfileEditing,
  medic,
}: MedicSectionProps) {
  return (
    <>
      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditAddress medic={medic} />
        ) : (
          <Address medic={medic} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditPhoneNumber medic={medic} />
        ) : (
          <PhoneNumber medic={medic} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditLicenceCode medic={medic} />
        ) : (
          <LicenceCode medic={medic} />
        )}
      </section>
    </>
  );
}
