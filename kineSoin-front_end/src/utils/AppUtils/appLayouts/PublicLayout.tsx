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

        <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
          <div className="flex flex-col w-full h-full">
            <Outlet />
          </div>
        </main>

        <Footer />

        <PublicMobileNav />
      </PatientRegisterContextProvider>
    </div>
  );
}
