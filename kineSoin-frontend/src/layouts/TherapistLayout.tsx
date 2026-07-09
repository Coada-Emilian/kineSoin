import { Outlet } from 'react-router-dom';
import PublicFooter from '../components/layouts/footers/PublicFooter';
import TherapistMobileNavbar from '../components/layouts/mobileNavbars/TherapistMobileNavbar';
import TherapistNavbar from '../components/layouts/navbars/TherapistNavbar';
import TherapistSideNavbar from '../components/pages/therapist/TherapistSideNavbar';
import DNALoader from '../components/ui/DNALoader';
import UserHeadband from '../components/ui/UserHeadband';
import TherapistDataProvider from '../contexts/therapist/TherapistDataProvider';
import { useFetchTherapistDataQuery } from '../hooks/therapist/useFetchTherapistData';
import { getTherapistPageTitle } from '../utils/functions/therapist/getTherapistPageTitle';

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

  const path = window.location.pathname;
  const pathName = path.split('/').pop() || '';

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
            <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6 md:min-h-screen">
              <p className="text-2xl font-semibold italic mb-2 ">
                {getTherapistPageTitle(pathName)}
              </p>

              <TherapistDataProvider>
                <Outlet />
              </TherapistDataProvider>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />

      <TherapistMobileNavbar />
    </div>
  );
}
