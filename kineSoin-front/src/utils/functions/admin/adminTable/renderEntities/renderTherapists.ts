import type { ITherapist } from '../../../../../@types/interfaces/modelInterfaces';

export const renderTherapists = (
  allTherapists: ITherapist[],
  therapistStatus: string
): ITherapist[] => {
  if (therapistStatus === 'all') {
    return allTherapists ?? [];
  }

  if (therapistStatus === 'active') {
    return (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'active'
    );
  }

  if (therapistStatus === 'inactive') {
    return (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'inactive'
    );
  }

  return [];
};
