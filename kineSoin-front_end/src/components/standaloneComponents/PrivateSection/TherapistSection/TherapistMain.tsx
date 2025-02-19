import { useEffect, useState } from 'react';
import UserHeadband from '../../generalComponents/UserHeadband/UserHeadband';
import SideNav from '../../generalComponents/SideNav/SideNav';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../../localStorage/therapistLocalStorage';
import TherapistDayTable from './TherapistDayTable/TherapistDayTable';
import TherapistPatientsTable from './TherapistPatientsTable/TherapistPatientsTable';

interface TherapistMainProps {
  isTherapistDashboardMain?: boolean;

  isTherapistPatientsMain?: boolean;
}

export default function TherapistMain({
  isTherapistDashboardMain,

  isTherapistPatientsMain,
}: TherapistMainProps) {
  const windowWidth = window.innerWidth;
  const [therapistId, setTherapistId] = useState<number>();

  useEffect(() => {
    try {
      const response = getTherapistTokenAndDataFromLocalStorage();
      if (response) {
        setTherapistId(response.id ? parseInt(response.id, 10) : undefined);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  }, [therapistId]);

  const fetchParagraph = () =>
    isTherapistDashboardMain
      ? 'Ma journée'
      : isTherapistPatientsMain
        ? 'Patients'
        : '';

  return (
    <>
      <main className={`bg-gray-200 `}>
        <UserHeadband isTherapistHeadband />

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
