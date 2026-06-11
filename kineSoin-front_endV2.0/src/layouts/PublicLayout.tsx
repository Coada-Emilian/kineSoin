import { Outlet } from 'react-router-dom';
import PublicFooter from '../components/layout/footers/PublicFooter';
import PublicMobileNavbar from '../components/layout/mobileNavbars/PublicMobileNavBar';
import PublicNavbar from '../components/layout/navbars/PublicNavbar';
import { PatientRegistrationContextProvider } from '../utils/contexts/PatientRegistrationContext/PatientRegistrationContext';

export default function PublicLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <PatientRegistrationContextProvider>
        <PublicNavbar />

        <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
          <div className="flex flex-col w-full h-full">
            <Outlet />
          </div>
        </main>

        <PublicFooter />

        <PublicMobileNavbar />
      </PatientRegistrationContextProvider>
    </div>
  );
}
