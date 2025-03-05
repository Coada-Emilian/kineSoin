import { Outlet } from 'react-router-dom';
import Footer from '../../../components/standaloneComponents/generalComponents/Footer/Footer';
import PublicNavBar from '../../../components/standaloneComponents/generalComponents/NavBar/PublicNavBar';
import { PatientRegisterContextProvider } from '../../contexts/PatientRegisterContext';
import PublicMobileNav from '../../../components/standaloneComponents/generalComponents/MobileNav/PublicMobileNav';

export function PublicLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <PatientRegisterContextProvider>
        <PublicNavBar />

        <Outlet />

        <Footer />

        <PublicMobileNav />
      </PatientRegisterContextProvider>
    </div>
  );
}
