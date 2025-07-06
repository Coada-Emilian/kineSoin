import { useTherapistDetailsContext } from '../../../../utils/contexts/TherapistDetailsContext';
import { TherapistSectionContextProvider } from '../../../../utils/contexts/TherapistSectionContext';

import { fetchTherapistPageTitle } from '../../../../utils/functions/privateSection/therapistSection/fetchTherapistPageTitle';
import TherapistSideNav from '../../../standaloneComponents/generalComponents/layoutComponents/sideNav/newComponents/TherapistSideNav';
import UserHeadband from '../../../standaloneComponents/generalComponents/layoutComponents/userHeadband/UserHeadband';
import TherapistAppointmentsCalendar from '../../../standaloneComponents/privateSection/therapistSection/therapistAppointments/TherapistAppointmentsCalendar';
import TherapistDayTable from '../../../standaloneComponents/privateSection/therapistSection/therapistDayTable/TherapistDayTable';
import TherapistPatientDetails from '../../../standaloneComponents/privateSection/therapistSection/therapistPatientDetails/therapistPatientDetails';

import TherapistPatientsTable from '../../../standaloneComponents/privateSection/therapistSection/therapistPatientTable/TherapistPatientsTable';

interface TherapistMainRefactorProps {
  pathName: string;
}

export default function TherapistMainRefactor({
  pathName,
}: TherapistMainRefactorProps) {
  const therapistContext = useTherapistDetailsContext();

  const therapist = therapistContext?.basicTherapistDetails;

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
          <p className="text-2xl font-semibold italic mb-2 ">
            {fetchTherapistPageTitle(pathName)}
          </p>

          <TherapistSectionContextProvider>
            {pathName === 'dashboard' && <TherapistDayTable />}

            {pathName === 'patients' && therapist && (
              <TherapistPatientsTable therapist={therapist} />
            )}

            {pathName === 'patient/:patientId' && <TherapistPatientDetails />}

            {pathName === 'appointments' && <TherapistAppointmentsCalendar />}

            {pathName === 'patient/:patientId/appointments' && (
              <div>Do the appointments page</div>
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
