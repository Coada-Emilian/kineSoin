import HomePageMain from '../../../../components/pageComponents/PublicSection/new_components/HomePageMain';
import PatientLoginMain from '../../../../components/pageComponents/PublicSection/new_components/PatientLoginMain';
import PatientRegisterMain from '../../../../components/pageComponents/PublicSection/new_components/PatientRegisterMain';
import TherapistLoginMain from '../../../../components/pageComponents/PublicSection/new_components/TherapistLoginMain';

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
