import AdminFooter from '../standaloneComponents/AdminFooter/AdminFooter';
import Main from '../standaloneComponents/Main/Main';
import NavBar from '../standaloneComponents/NavBar/NavBar';

interface HomepageProps {
  windowWidth: number;
}

export default function Homepage({ windowWidth }: HomepageProps) {
  return (
    <>
      <NavBar windowWidth={windowWidth} isPublicNavBar />
      <Main />
      <AdminFooter />
    </>
  );
}

