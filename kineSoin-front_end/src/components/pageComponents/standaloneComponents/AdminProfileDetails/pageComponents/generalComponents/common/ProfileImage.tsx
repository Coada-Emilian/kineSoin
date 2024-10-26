/**
 * @file ProfileImage.tsx
 * @description A React functional component that displays the profile image of either a therapist or a patient based on the provided props.
 *
 * @param {Object} props - The props for the ProfileImage component.
 * @param {ITherapist} [props.therapist] - Optional therapist object containing the therapist's details, including their picture URL and full name.
 * @param {IPatient} [props.patient] - Optional patient object containing the patient's details, including their picture URL and full name.
 *
 * @returns {JSX.Element} The rendered ProfileImage component displaying the relevant profile image based on the provided props.
 */

import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileImageProps {
  therapist?: ITherapist;
  patient?: IPatient;
}

export default function ProfileImage({
  therapist,
  patient,
}: ProfileImageProps) {
  return (
    <div className="w-fit mx-auto mb-6 flex justify-center items-center">
      {therapist && (
        <img
          src={therapist.picture_url}
          alt={therapist.fullName}
          className="rounded-xl shadow-xl w-48 md:w-72"
        />
      )}
      {patient && (
        <img
          src={patient.picture_url}
          alt={patient.fullName}
          className="rounded-xl shadow-xl w-48 md:w-72"
        />
      )}
    </div>
  );
}
