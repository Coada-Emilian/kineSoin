// Purpose: Provide the MedicSection component which displays the medic's profile details.

import { IMedic } from '../../../../../../@types/IMedic';
import Input from '../generalComponents/common/Input';
import Output from '../generalComponents/common/Output';

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
          <Input medic={medic} isMedicAddressInput />
        ) : (
          <Output medic={medic} isMedicAddressOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <Input medic={medic} isMedicPhoneNumberInput />
        ) : (
          <Output medic={medic} isMedicPhoneNumberOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <Input medic={medic} isMedicLicenceCodeInput />
        ) : (
          <Output medic={medic} isMedicLicenceCodeOutput />
        )}
      </section>
    </>
  );
}
