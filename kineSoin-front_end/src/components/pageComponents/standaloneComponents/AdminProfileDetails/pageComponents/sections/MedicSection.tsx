import { IMedic } from '../../../../../../@types/IMedic';
import Address from '../generalComponents/medic/Address';
import EditAddress from '../generalComponents/medic/EditAddress';
import EditLicenceCode from '../generalComponents/medic/EditLicenceCode';
import EditPhoneNumber from '../generalComponents/medic/EditPhoneNumber';
import LicenceCode from '../generalComponents/medic/LicenceCode';
import PhoneNumber from '../generalComponents/medic/PhoneNumber';

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
