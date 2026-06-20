import type { ITherapist } from '../../../../../@types/interfaces/modelInterfaces';

export const renderTherapists = (
  allTherapists: ITherapist[],
  setRenderedTherapists: React.Dispatch<React.SetStateAction<ITherapist[]>>,
  therapistStatus: string
) => {
  if (therapistStatus === 'all') {
    setRenderedTherapists(allTherapists ?? []);
  } else if (therapistStatus === 'active') {
    const activeTherapists = (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'active'
    );
    setRenderedTherapists(activeTherapists);
  } else if (therapistStatus === 'inactive') {
    const inactiveTherapists = (allTherapists ?? []).filter(
      (therapist) => therapist.status === 'inactive'
    );
    setRenderedTherapists(inactiveTherapists);
  }
};
