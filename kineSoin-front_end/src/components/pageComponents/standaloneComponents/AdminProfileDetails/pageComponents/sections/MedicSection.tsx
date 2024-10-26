/**
 * @file MedicSection.tsx
 * @description A React functional component that renders a medical professional's information section within a profile. This component allows for editing and displaying details related to the medical professional, such as their address, phone number, and license code. The component conditionally renders input fields for editing or output fields for displaying this information based on the editing state.
 *
 * @param {Object} props - The props for the MedicSection component.
 * @param {boolean} props.isProfileEditing - A boolean indicating if the profile is in editing mode.
 * @param {IMedic} props.medic - An object representing the medical professional's details to be displayed or edited.
 *
 * @returns {JSX.Element} The rendered MedicSection component, which contains input or output fields for the medic's address, phone number, and license code, depending on the editing state.
 */

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
