import type { PublicRouteDetailsProps } from '../../../@types/props/customProps';
import HomePage from '../../../pages/public/HomePage';
import PatientLoginPage from '../../../pages/public/PatientLoginPage';
import PatientRegistrationPage from '../../../pages/public/PatientRegistrationPage';
import TherapistLoginPage from '../../../pages/public/TherapistLoginPage';

export const publicRouteDetails: PublicRouteDetailsProps[] = [
  {
    index: true,
    element: HomePage,
  },
  {
    path: 'loginPatient',
    element: PatientLoginPage,
  },
  {
    path: 'loginTherapist',
    element: TherapistLoginPage,
  },
  {
    path: 'registerPatient',
    element: PatientRegistrationPage,
  },
];
