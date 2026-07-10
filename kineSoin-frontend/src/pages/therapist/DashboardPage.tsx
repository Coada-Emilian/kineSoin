import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import TherapistDashboardAppointmentsMobile from '../../components/pages/therapist/dashboard/TherapistDashboardAppointmentsMobile';
import TherapistDashboardAppointmentsTable from '../../components/pages/therapist/dashboard/TherapistDashboardAppointmentsTable';
import TherapistDashboardModals from '../../components/pages/therapist/dashboard/TherapistDashboardModals';
import TherapistCard from '../../components/pages/therapist/TherapistCard';
import DNALoader from '../../components/ui/DNALoader';
import { useDashboardRefresh } from '../../hooks/therapist/useDashboardRefresh';
import { useFetchTherapistDashboardDataQuery } from '../../hooks/therapist/useFetchTherapistDashboardDataQuery';
import { getRemainingAppointments } from '../../utils/functions/therapist/getRemainingAppointments';

export default function DashboardPage() {
  const { data: tableAppointments = [], isLoading } =
    useFetchTherapistDashboardDataQuery();

  useDashboardRefresh();

  const remainingAppointments = getRemainingAppointments(tableAppointments);

  const { setHeroMessage } = useOutletContext<{
    setHeroMessage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  }>();

  useEffect(() => {
    setHeroMessage(
      <>
        Vous avez{' '}
        <span className="font-semibold text-slate-800">
          {remainingAppointments.length}
        </span>{' '}
        rendez-vous aujourd'hui.
      </>
    );
  }, [tableAppointments, setHeroMessage]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <DNALoader />
      </div>
    );
  }

  return (
    <>
      <div className="block md:hidden">
        <TherapistDashboardAppointmentsMobile
          appointments={tableAppointments}
        />
      </div>

      <div className="hidden md:flex md:flex-col md:items-center md:w-11/12  ">
        <TherapistCard
          title="Planning du jour"
          subtitle={"Les consultations prévues pour aujourd'hui."}
        >
          <TherapistDashboardAppointmentsTable
            appointments={tableAppointments}
          />
        </TherapistCard>

        <TherapistDashboardModals />
      </div>
    </>
  );
}
