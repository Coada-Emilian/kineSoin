import { useEffect, useState } from 'react';
import UserHeadband from '../../standaloneComponents/generalComponents/UserHeadband/UserHeadband';
import SideNav from '../../standaloneComponents/generalComponents/SideNav/SideNav';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../localStorage/therapistLocalStorage';
import TherapistDayTable from '../../standaloneComponents/PrivateSection/TherapistSection/TherapistDayTable/TherapistDayTable';
import TherapistPatientsTable from '../../standaloneComponents/PrivateSection/TherapistSection/TherapistPatientsTable/TherapistPatientsTable';
import { IUserProfile } from '../../../@types/customTypes';

interface TherapistMainProps {
  isTherapistDashboardMain?: boolean;
  isTherapistPatientsMain?: boolean;
}

export default function TherapistMain({
  isTherapistDashboardMain,

  isTherapistPatientsMain,
}: TherapistMainProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [windowWidth]);

  const [therapist, setTherapist] = useState<IUserProfile>();

  useEffect(() => {
    try {
      const response = getTherapistTokenAndDataFromLocalStorage();
      if (response) {
        setTherapist(response);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, [therapist?.id]);

  const fetchParagraph = () =>
    isTherapistDashboardMain
      ? 'Ma journée'
      : isTherapistPatientsMain
        ? 'Patients'
        : '';

  return (
    <>
      <main className={`bg-gray-200 `}>
        <UserHeadband
          userProfile={therapist}
          profileUrl={'/therapist/my-profile'}
          dashboardUrl={'/therapist/dashboard'}
        />

        <div className="h-fit md:flex gap-4 mb-2 ">
          {windowWidth && windowWidth > 768 && (
            <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block md:h-auto ">
              <SideNav isTherapistSideNav />
            </div>
          )}

          <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6 md:min-h-screen">
            <p className="text-xl font-semibold italic mb-2 ">
              {fetchParagraph()}
            </p>

            {isTherapistDashboardMain && <TherapistDayTable />}

            {isTherapistPatientsMain && <TherapistPatientsTable />}
          </div>
        </div>
      </main>
    </>
  );
}
