import { Outlet } from 'react-router-dom';
import PublicFooter from '../../../components/standaloneComponents/generalComponents/layoutComponents/footer/PublicFooter';
import PublicMobileNav from '../../../components/standaloneComponents/generalComponents/layoutComponents/mobileNav/newComponents/PublicMobileNav';
import PublicNavBar from '../../../components/standaloneComponents/generalComponents/layoutComponents/navBar/newComponents/PublicNavBar';
import { PatientRegisterContextProvider } from '../../contexts/PatientRegisterContext';

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
