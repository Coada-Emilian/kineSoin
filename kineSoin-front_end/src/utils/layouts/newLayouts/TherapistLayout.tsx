import { Outlet } from 'react-router-dom';
import PublicFooter from '../../../components/standaloneComponents/generalComponents/layoutComponents/footer/PublicFooter';
import TherapistMobileNav from '../../../components/standaloneComponents/generalComponents/layoutComponents/mobileNav/newComponents/TherapistMobileNav';
import TherapistNavBar from '../../../components/standaloneComponents/generalComponents/layoutComponents/navBar/newComponents/TherapistNavBar';

export function TherapistLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <TherapistNavBar />

      <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
        <div className="flex flex-col w-full h-full">
          <Outlet />
        </div>
      </main>

      <PublicFooter />

      <TherapistMobileNav />
    </div>
  );
}
