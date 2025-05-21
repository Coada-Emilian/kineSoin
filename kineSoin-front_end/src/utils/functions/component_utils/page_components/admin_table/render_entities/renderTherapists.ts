import { ITherapist } from '../../../../../../@types/interfaces/modelInterfaces';

// Function to render therapists based on status
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
