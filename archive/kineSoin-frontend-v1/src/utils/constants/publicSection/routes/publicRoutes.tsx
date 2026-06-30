import HomePageMain from '../../../../components/pageComponents/publicSection/newComponents/HomePageMain';
import PatientLoginMain from '../../../../components/pageComponents/publicSection/newComponents/PatientLoginMain';
import PatientRegisterMain from '../../../../components/pageComponents/publicSection/newComponents/PatientRegisterMain';
import TherapistLoginMain from '../../../../components/pageComponents/publicSection/newComponents/TherapistLoginMain';

export const publicRoutes: {
  path?: string;
  element: JSX.Element;
  index?: boolean;
}[] = [
  {
    index: true,
    element: <HomePageMain />,
  },
  {
    path: 'loginPatient',
    element: <PatientLoginMain />,
  },
  {
    path: 'loginTherapist',
    element: <TherapistLoginMain />,
  },
  { path: 'registerPatient', element: <PatientRegisterMain /> },
];
