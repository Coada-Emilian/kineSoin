/**
 * @file EditProfileName.tsx
 * @description A React functional component that renders an editable name field for various profile types, including therapists, afflictions, medics, and insurance providers. The input field label and placeholder dynamically update based on the profile type passed as props.
 *
 * @param {Object} props - The props for the EditProfileName component.
 * @param {ITherapist | null} [props.therapist] - Optional therapist object containing profile details, including the name.
 * @param {IAffliction | null} [props.affliction] - Optional affliction object containing profile details, including the name.
 * @param {IMedic | null} [props.medic] - Optional medic object containing profile details, including the name.
 * @param {IInsurance | null} [props.insurance] - Optional insurance object containing profile details, including the name.
 *
 * @returns {JSX.Element} The rendered EditProfileName component, displaying an input field with a dynamic label and placeholder based on the profile type.
 */

import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface EditProfileNameProps {
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
}

export default function EditProfileName({
  therapist,
  affliction,
  medic,
  insurance,
}: EditProfileNameProps) {
  return (
    <div className="flex gap-2 items-center ">
      <label
        htmlFor={`${therapist ? 'therapist_name' : affliction ? 'affliction_name' : medic ? 'medic_name' : insurance ? 'insurance_name' : ''}`.trim()}
        className="font-semibold"
      >
        Nom :
      </label>
      <input
        type="text"
        name="name"
        id={`${therapist ? 'therapist_name' : affliction ? 'affliction_name' : medic ? 'medic_name' : insurance ? 'insurance_name' : ''}`.trim()}
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={
          (therapist
            ? therapist.name
            : affliction
              ? affliction.name
              : medic
                ? medic.name
                : insurance
                  ? insurance.name
                  : '') || 'Nom'
        }
      />
    </div>
  );
}
