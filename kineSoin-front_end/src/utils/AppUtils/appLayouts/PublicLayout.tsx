import { Outlet } from 'react-router-dom';
import Footer from '../../../components/standaloneComponents/generalComponents/Footer/Footer';
import PublicNavBar from '../../../components/standaloneComponents/generalComponents/NavBar/PublicNavBar';
import { PatientRegisterGlobalContextProvider } from '../../contexts/PatientRegisterGlobalContext';
import PublicMobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/PublicMobileNav';

export function PublicLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <PatientRegisterGlobalContextProvider>
        <PublicNavBar />

        <Outlet />

        <Footer />

        <PublicMobileNav />
      </PatientRegisterGlobalContextProvider>
    </div>
  );
}
