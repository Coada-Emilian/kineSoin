import type { PublicRouteDetailsProps } from '../../@types/interfaces/customProps';
import HomePage from '../../pages/publicSection/HomePage';
import PatientLoginPage from '../../pages/publicSection/PatientLoginPage';
import PatientRegistrationPage from '../../pages/publicSection/PatientRegistrationPage';
import TherapistLoginPage from '../../pages/publicSection/TherapistLoginPage';

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
