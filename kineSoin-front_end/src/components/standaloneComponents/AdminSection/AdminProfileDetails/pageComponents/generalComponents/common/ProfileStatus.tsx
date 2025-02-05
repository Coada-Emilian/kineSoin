// Purpose: Display the status of the user.

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
