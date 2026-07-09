import { Outlet } from 'react-router-dom';
import PublicFooter from '../components/layouts/footers/PublicFooter';
import TherapistMobileNavbar from '../components/layouts/mobileNavbars/TherapistMobileNavbar';
import TherapistNavbar from '../components/layouts/navbars/TherapistNavbar';
import TherapistSideNavbar from '../components/pages/therapist/TherapistSideNavbar';
import DNALoader from '../components/ui/DNALoader';
import UserHeadband from '../components/ui/UserHeadband';
import { useFetchTherapistDataQuery } from '../hooks/therapist/useFetchTherapistData';

export default function TherapistLayout() {
  const {
    data: therapist,
    isLoading: isTherapistLoading,
    isError,
  } = useFetchTherapistDataQuery();

  if (isTherapistLoading) {
    return DNALoader();
  }

  if (isError || !therapist) {
    return (
      <main className="bg-gray-200">
        <div className="p-4 text-red-500">Error loading therapist data</div>
      </main>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <TherapistNavbar />

      <main className="flex items-center w-full justify-center h-fit md:h-fit bg-gray-100">
        <div className="flex flex-col w-full h-full">
          <UserHeadband
            userProfile={therapist.response}
            profileUrl={'/therapist/my-profile'}
            dashboardUrl={'/therapist/dashboard'}
          />

          <div className="h-fit md:flex gap-4 mb-2 ">
            <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block md:h-auto ">
              <TherapistSideNavbar />
            </div>
            
            <Outlet />
          </div>
        </div>
      </main>

      <PublicFooter />

      <TherapistMobileNavbar />
    </div>
  );
}
