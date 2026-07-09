import type { TherapistPageProps } from '../../@types/props/therapistProps';
import TherapistDashboardTable from '../../components/pages/therapist/dashboard/TherapistDashboardTable';
import TherapistSideNavbar from '../../components/pages/therapist/TherapistSideNavbar';
import DNALoader from '../../components/ui/DNALoader';
import UserHeadband from '../../components/ui/UserHeadband';
import TherapistDataProvider from '../../contexts/therapist/TherapistDataProvider';
import { useFetchTherapistDataQuery } from '../../hooks/therapist/useFetchTherapistData';
import { getTherapistPageTitle } from '../../utils/functions/therapist/getTherapistPageTitle';

export default function TherapistPage({ pathName }: TherapistPageProps) {
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
    <main className={`bg-gray-200 `}>
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
            {pathName === 'dashboard' && <TherapistDashboardTable />}

            {/* {pathName === 'patients' && basicTherapistDetails && (
              <TherapistPatientsTable therapist={basicTherapistDetails} />
            )}

            {pathName === 'patient/:patientId' && <TherapistPatientDetails />}

            {pathName === 'patient/:patientId/appointments' && (
              <TherapistPatientAppointments />
            )}

            {pathName === 'agenda' && <TherapistAppointmentsCalendar />}

            {pathName === 'patient/:patientId/appointments/:appointmentId' && (
              <div>Do the appointment page</div>
            )} */}
          </TherapistDataProvider>
        </div>
      </div>
    </main>
  );
}
