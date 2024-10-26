/**
 * @file ProfileId.tsx
 * @description A React functional component that displays the ID of a profile based on the provided props for therapist, patient, affliction, medic, or insurance.
 *
 * @param {Object} props - The props for the ProfileId component.
 * @param {ITherapist|null} [props.therapist] - Optional therapist object containing the therapist's details.
 * @param {IPatient|null} [props.patient] - Optional patient object containing the patient's details.
 * @param {IAffliction|null} [props.affliction] - Optional affliction object containing the affliction's details.
 * @param {IMedic|null} [props.medic] - Optional medic object containing the medic's details.
 * @param {IInsurance|null} [props.insurance] - Optional insurance object containing the insurance details.
 *
 * @returns {JSX.Element} The rendered ProfileId component displaying the relevant ID based on the provided props.
 */

import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileIdProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
  affliction?: IAffliction | null;
  medic?: IMedic | null;
  insurance?: IInsurance | null;
}

export default function ProfileId({
  therapist,
  patient,
  affliction,
  medic,
  insurance,
}: ProfileIdProps) {
  return (
    <h4 className="font-semibold mb-2">
      #ID :{' '}
      <span className="italic font-normal">
        {therapist
          ? therapist.id
          : patient
            ? patient.id
            : affliction
              ? affliction.id
              : medic
                ? medic.id
                : insurance
                  ? insurance.id
                  : ''}
      </span>
    </h4>
  );
}
