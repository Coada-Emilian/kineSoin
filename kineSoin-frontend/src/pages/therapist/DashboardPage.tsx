import { Button } from '@headlessui/react';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import TherapistDashboardAppointmentsTable from '../../components/pages/therapist/dashboard/TherapistDashboardAppointmentsTable';
import TherapistDashboardDynamicParagraph from '../../components/pages/therapist/dashboard/TherapistDashboardDynamicParagraph';
import TherapistDashboardModals from '../../components/pages/therapist/dashboard/TherapistDashboardModals';
import DNALoader from '../../components/ui/DNALoader';
import { useUTherapistUiContext } from '../../hooks/context/therapist/useTherapistUiContext';
import { useDynamicDashboardRefresh } from '../../hooks/therapist/useDynamicAppointmentRefresh';
import { useFetchTherapistDashboardDataQuery } from '../../hooks/therapist/useFetchTherapistDashboardDataQuery';
import { formatCurrentDate } from '../../utils/functions/formatCurrentDate';
import dynamicIcon from '/icons/dynamic2_32.webp';
import dynamicIcon2 from '/icons/dynamic_32.webp';

export default function DashboardPage() {
  const { data: tableAppointments = [], isLoading } =
    useFetchTherapistDashboardDataQuery();

  const { isDynamicModeOn, handleDynamicModeClick } = useUTherapistUiContext();

  useDynamicDashboardRefresh(isDynamicModeOn);

  const currentDate = formatCurrentDate();

  const { setHeroMessage } = useOutletContext<{
    setHeroMessage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  }>();

  useEffect(() => {
    setHeroMessage(
      <>
        Vous avez{' '}
        <span className="font-semibold text-slate-800">
          {tableAppointments.length}
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
    <div className="flex flex-col items-center w-11/12">
      <div className="w-full flex justify-end mb-6 gap-4 items-center">
        <TherapistDashboardDynamicParagraph />

        <Button onClick={handleDynamicModeClick}>
          <img
            src={!isDynamicModeOn ? dynamicIcon : dynamicIcon2}
            alt={isDynamicModeOn ? 'dynamic mode on' : 'dynamic mode off'}
            className={`${isDynamicModeOn ? 'animate-spin' : ''} w-6 h-6 md:w-8 md:h-8 cursor-pointer`}
          />
        </Button>

        <p className="border border-gray-200 p-2 rounded-xl shadow-xl italic font-semibold text-xxs md:text-base">
          Date: {currentDate}
        </p>
      </div>

      <TherapistDashboardAppointmentsTable appointments={tableAppointments} />

      <TherapistDashboardModals />
    </div>
  );
}
