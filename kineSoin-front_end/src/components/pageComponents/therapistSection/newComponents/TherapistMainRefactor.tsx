import { useState } from 'react';
import { IUserProfile } from '../../../../@types/interfaces/customInterfaces';
import { TherapistDayTableContextProvider } from '../../../../utils/contexts/TherapistDayTableContext';
import { fetchTherapistPageTitle } from '../../../../utils/functions/privateSection/therapistSection/fetchTherapistPageTitle';
import { useFetchTherapistBasicData } from '../../../../utils/functions/privateSection/therapistSection/hooks/useFetchTherapistBasicData';
import TherapistSideNav from '../../../standaloneComponents/generalComponents/layoutComponents/sideNav/newComponents/TherapistSideNav';
import UserHeadband from '../../../standaloneComponents/generalComponents/layoutComponents/userHeadband/UserHeadband';
import TherapistDayTable from '../../../standaloneComponents/privateSection/therapistSection/therapistDayTable/TherapistDayTable';
import TherapistPatientsTable from '../../../standaloneComponents/privateSection/therapistSection/therapistPatientTable/TherapistPatientsTable';

interface TherapistMainRefactorProps {
  pathName: string;
}

export default function TherapistMainRefactor({
  pathName,
}: TherapistMainRefactorProps) {
  const [therapist, setTherapist] = useState<IUserProfile>();

  useFetchTherapistBasicData({ setTherapist });

  return (
    <main className={`bg-gray-200 `}>
      <UserHeadband
        userProfile={therapist}
        profileUrl={'/therapist/my-profile'}
        dashboardUrl={'/therapist/dashboard'}
      />

      <div className="h-fit md:flex gap-4 mb-2 ">
        <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block md:h-auto ">
          <TherapistSideNav />
        </div>

        <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6 md:min-h-screen">
          <p className="text-xl font-semibold italic mb-2 ">
            {fetchTherapistPageTitle(pathName)}
          </p>

          {pathName === 'dashboard' && (
            <TherapistDayTableContextProvider>
              <TherapistDayTable />
            </TherapistDayTableContextProvider>
          )}

          {pathName === 'patients' && <TherapistPatientsTable />}
        </div>
      </div>
    </main>
  );
}
