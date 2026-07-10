import { useState, type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import TherapistFooter from '../components/layouts/footers/TherapistFooter';
import TherapistMobileNavbar from '../components/layouts/mobileNavbars/TherapistMobileNavbar';
import TherapistNavbar from '../components/layouts/navbars/TherapistNavbar';
import TherapistHeader from '../components/pages/therapist/TherapistHeader';
import TherapistSideNavbar from '../components/pages/therapist/TherapistSideNavbar';
import DNALoader from '../components/ui/DNALoader';
import TherapistHero from '../components/ui/TherapistHero';
import TherapistDataProvider from '../contexts/therapist/TherapistDataProvider';
import { useFetchTherapistDataQuery } from '../hooks/therapist/useFetchTherapistData';

export default function TherapistLayout() {
  const {
    data: therapist,
    isLoading: isTherapistLoading,
    isError,
  } = useFetchTherapistDataQuery();

  const [heroMessage, setHeroMessage] = useState<ReactNode>(
    'Ravi de vous retrouver.'
  );

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
  const page = path.split('/').pop() || '';

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <TherapistNavbar />

      <main className="flex items-center w-full justify-center h-fit md:h-fit ">
        <div className="flex flex-col w-full h-full">
          <TherapistHero
            userProfile={therapist.response}
            message={heroMessage}
          />

          <div className="h-fit md:flex gap-4 mb-2 bg-linear-to-r from-teal-50 to-white p-6 ">
            <div className="hidden w-72 shrink-0 border-r border-slate-100 md:block">
              <TherapistSideNavbar />
            </div>

            <div className="flex flex-col bg-linear-to-r from-teal-50 to-white p-6 bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-2 md:min-h-screen">
              <TherapistHeader page={page} />

              <TherapistDataProvider>
                <Outlet context={{ setHeroMessage }} />
              </TherapistDataProvider>
            </div>
          </div>
        </div>
      </main>

      <TherapistFooter />

      <TherapistMobileNavbar />
    </div>
  );
}
