/**
 * @file ProfileStatus.tsx
 * @description A React functional component that displays the status of a therapist or patient. The status is highlighted with different background colors based on its value.
 *
 * @param {Object} props - The props for the ProfileStatus component.
 * @param {ITherapist|null} [props.therapist] - Optional therapist object containing the therapist's status.
 * @param {IPatient|null} [props.patient] - Optional patient object containing the patient's status.
 *
 * @returns {JSX.Element} The rendered ProfileStatus component displaying the relevant status based on the provided props, with styling indicating the status type.
 */

import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface ProfileStatusProps {
  therapist?: ITherapist | null;
  patient?: IPatient | null;
}

export default function ProfileStatus({
  therapist,
  patient,
}: ProfileStatusProps) {
  return (
    <h4 className="font-bold mb-2">
      Statut:{' '}
      <span
        className={`italic p-2 rounded-md 
        ${therapist?.status === 'active' ? 'bg-green-300' : ''}
        ${therapist?.status === 'inactive' ? 'bg-gray-200' : ''}
        ${therapist?.status === 'pending' ? 'bg-yellow-300' : ''}
        ${therapist?.status === 'banned' ? 'bg-red-300' : ''}
        ${patient?.status === 'active' ? 'bg-green-300' : ''}
        ${patient?.status === 'inactive' ? 'bg-gray-200' : ''}
        ${patient?.status === 'pending' ? 'bg-yellow-300' : ''}
        ${patient?.status === 'banned' ? 'bg-red-300' : ''}
        ${!therapist && !patient ? 'bg-gray-200' : ''}`}
      >
        {therapist?.status?.toUpperCase() || patient?.status?.toUpperCase()}
      </span>
    </h4>
  );
}
