/**
 * @file ProfileName.tsx
 * @description A React functional component that displays the name of a therapist, patient, medic, affliction, or insurance based on the provided props.
 *
 * @param {Object} props - The props for the ProfileName component.
 * @param {ITherapist|null} [props.therapist] - Optional therapist object containing the therapist's full name.
 * @param {IPatient|null} [props.patient] - Optional patient object containing the patient's full name.
 * @param {IAffliction|null} [props.affliction] - Optional affliction object containing the affliction's name.
 * @param {IMedic|null} [props.medic] - Optional medic object containing the medic's full name.
 * @param {IInsurance|null} [props.insurance] - Optional insurance object containing the insurance's name.
 *
 * @returns {JSX.Element} The rendered ProfileName component displaying the relevant name based on the provided props.
 */

import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileNameProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
}

export default function ProfileName({
  therapist,
  patient,
  affliction,
  medic,
  insurance,
}: ProfileNameProps) {
  return (
    <h4 className="font-semibold mb-2">
      Nom :{' '}
      <span className="italic font-normal">
        {therapist
          ? therapist.fullName
          : patient
            ? patient.fullName
            : medic
              ? medic.fullName
              : affliction
                ? affliction.name
                : insurance
                  ? insurance.name
                  : ''}
      </span>
    </h4>
  );
}
