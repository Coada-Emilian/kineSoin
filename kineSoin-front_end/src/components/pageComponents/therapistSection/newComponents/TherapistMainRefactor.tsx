import { useEffect, useState } from 'react';
import { IUserProfile } from '../../../../@types/interfaces/customInterfaces';
import { useTherapistFetchBasicDataMutation } from '../../../../utils/functions/privateSection/therapistSection/mutations/useTherapistFetchBasicDataMutation';
import UserHeadband from '../../../standaloneComponents/generalComponents/layoutComponents/userHeadband/UserHeadband';

export default function TherapistMainRefactor() {
  const [therapist, setTherapist] = useState<IUserProfile>();

  const fetchTherapistBasicData = useTherapistFetchBasicDataMutation();

  useEffect(() => {
    fetchTherapistBasicData.mutate(undefined, {
      onSuccess: (data) => {
        setTherapist(data);
      },
      onError: (error) => {
        console.error('Error fetching therapist data:', error);
      },
    });
  }, []);

  return (
    <main className={`bg-gray-200 `}>
      <UserHeadband
        userProfile={therapist}
        profileUrl={'/therapist/my-profile'}
        dashboardUrl={'/therapist/dashboard'}
      />

      {/* <div className="h-fit md:flex gap-4 mb-2 ">
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
      </div> */}
    </main>
  );
}
