import { useState } from 'react';
import { IUserProfile } from '../../../../@types/interfaces/customInterfaces';
import { TherapistSectionContextProvider } from '../../../../utils/contexts/TherapistSectionContext';
import { fetchTherapistPageTitle } from '../../../../utils/functions/privateSection/therapistSection/fetchTherapistPageTitle';
import { useFetchTherapistBasicData } from '../../../../utils/functions/privateSection/therapistSection/hooks/useFetchTherapistBasicData';
import TherapistSideNav from '../../../standaloneComponents/generalComponents/layoutComponents/sideNav/newComponents/TherapistSideNav';
import UserHeadband from '../../../standaloneComponents/generalComponents/layoutComponents/userHeadband/UserHeadband';
import TherapistAppointmentsCalendar from '../../../standaloneComponents/privateSection/therapistSection/therapistAppointments/TherapistAppointmentsCalendar';
import TherapistDayTable from '../../../standaloneComponents/privateSection/therapistSection/therapistDayTable/TherapistDayTable';
import TherapistPatientAppointments from '../../../standaloneComponents/privateSection/therapistSection/therapistPatientAppointments/TherapistPatientAppointments';
import TherapistPatientDetails from '../../../standaloneComponents/privateSection/therapistSection/therapistPatientDetails/TherapistPatientDetails';
import TherapistPatientsTable from '../../../standaloneComponents/privateSection/therapistSection/therapistPatientTable/TherapistPatientsTable';

interface TherapistMainRefactorProps {
  pathName: string;
}

export default function TherapistMainRefactor({
  pathName,
}: TherapistMainRefactorProps) {
  const [basicTherapistDetails, setBasicTherapistDetails] =
    useState<IUserProfile>();

  useFetchTherapistBasicData({ setTherapist: setBasicTherapistDetails });
  return (
    <main className={`bg-gray-200 `}>
      <UserHeadband
        userProfile={basicTherapistDetails}
        profileUrl={'/therapist/my-profile'}
        dashboardUrl={'/therapist/dashboard'}
      />

      <div className="h-fit md:flex gap-4 mb-2 ">
        <div className="w-1/4 h-full border-r-2 border-r-lightGrey border-solid hidden md:block md:h-auto ">
          <TherapistSideNav />
        </div>

        <div className="flex gap-4 flex-col text-center bg-white bg-opacity-50 rounded-3xl py-4 justify-center md:justify-start items-center md:items-start w-full md:px-8 md:py-6 md:min-h-screen">
          <p className="text-2xl font-semibold italic mb-2 ">
            {fetchTherapistPageTitle(pathName)}
          </p>

          <TherapistSectionContextProvider>
            {pathName === 'dashboard' && <TherapistDayTable />}

            {pathName === 'patients' && basicTherapistDetails && (
              <TherapistPatientsTable therapist={basicTherapistDetails} />
            )}

            {pathName === 'patient/:patientId' && <TherapistPatientDetails />}

            {pathName === 'appointments' && <TherapistAppointmentsCalendar />}

            {pathName === 'patient/:patientId/appointments' && (
              <TherapistPatientAppointments />
            )}

            {pathName === 'patient/:patientId/appointments/:appointmentId' && (
              <div>Do the appointment page</div>
            )}
          </TherapistSectionContextProvider>
        </div>
      </div>
    </main>
  );
}
