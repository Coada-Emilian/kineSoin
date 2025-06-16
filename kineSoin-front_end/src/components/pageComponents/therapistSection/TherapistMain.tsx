import { useEffect, useState } from 'react';
import { IUserProfile } from '../../../@types/interfaces/customInterfaces';
import { getTherapistTokenAndDataFromLocalStorage } from '../../../localStorage/therapistLocalStorage';
import SideNav from '../../standaloneComponents/generalComponents/layoutComponents/sideNav/oldComponents/SideNav';
import UserHeadband from '../../standaloneComponents/generalComponents/layoutComponents/userHeadband/UserHeadband';
import TherapistDayTable from '../../standaloneComponents/privateSection/therapistSection/therapistDayTable/TherapistDayTable';
import TherapistPatientsTable from '../../standaloneComponents/privateSection/therapistSection/therapistPatientTable/TherapistPatientsTable';

interface TherapistMainProps {
  isTherapistDashboardMain?: boolean;
  isTherapistPatientsMain?: boolean;
}

export default function TherapistMain({
  isTherapistDashboardMain,
  isTherapistPatientsMain,
}: TherapistMainProps) {
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
          <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block md:h-auto ">
            <SideNav isTherapistSideNav />
          </div>

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
