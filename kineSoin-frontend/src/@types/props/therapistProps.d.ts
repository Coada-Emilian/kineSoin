import type { IBasicUser } from '../interfaces/customInterfaces';

export interface TherapistPageProps {
  pathName: string;
}

export interface UseFetchTherapistBasicDataQueryProps {
  setTherapist: React.Dispatch<React.SetStateAction<IBasicUser | undefined>>;
}
