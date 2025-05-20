import { Outlet } from 'react-router-dom';
import PublicFooter from '../../../../components/standaloneComponents/generalComponents/Footer/public_footer/PublicFooter';
import PublicMobileNav from '../../../../components/standaloneComponents/generalComponents/MobileNav/public_mobile_nav/PublicMobileNav';
import PublicNavBar from '../../../../components/standaloneComponents/generalComponents/NavBar/new_components/PublicNavBar';
import { PatientRegisterContextProvider } from '../../../contexts/PatientRegisterContext';

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

        <PublicFooter />

        <PublicMobileNav />
      </PatientRegisterContextProvider>
    </div>
  );
}
