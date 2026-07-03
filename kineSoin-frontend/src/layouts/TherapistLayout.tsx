import { Outlet } from 'react-router-dom';
import PublicFooter from '../components/layouts/footers/PublicFooter';
import TherapistNavbar from '../components/layouts/navbars/TherapistNavbar';
import TherapistMobileNavbar from '../components/layouts/mobileNavbars/TherapistMobileNavbar';

export default function TherapistLayout() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <TherapistNavbar />

      <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
        <div className="flex flex-col w-full h-full">
          <Outlet />
        </div>
      </main>

      <PublicFooter />

      <TherapistMobileNavbar />
    </div>
  );
}
