import { Button } from '@headlessui/react';
import { useAppointmentsContext } from '../../../../../utils/contexts/therapistSectionContext/AppointmentsContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import DNALoader from '../../../../../utils/DNALoader';
import { formatCurrentDate } from '../../../../../utils/functions/privateSection/therapistSection/formatCurrentDate';
import { useDynamicAppointmentCheck } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useDynamicAppointmentCheck';
import { useFetchTherapistDashboardDataQuery } from '../../../../../utils/functions/privateSection/therapistSection/hooks/useFetchTherapistDashboardData';
import AfflictionDetailsModal from '../modals/afflictionDetailsModal/AfflictionDetailsModal';
import CancelAppointmentModal from '../modals/CancelAppointmentModal';
import PatientDetailsModal from '../modals/PatientDetailsModal';
import SendMessageModal from '../modals/SendMessageModal';
import DayTableBody from './DayTableBody';
import DayTableDynamicParagraph from './DayTableDynamicParagraph';
import DayTableHead from './DayTableHead';
import dynamicIcon from '/icons/dynamic.png';
import dynamicIcon2 from '/icons/dynamic2.png';

export default function TherapistDayTable() {
  const { tableAppointments, setTableAppointments } = useAppointmentsContext();

  const {
    isDynamicModeOn,
    handleDynamicModeClick,
    isSendMessageModalOpen,
    setIsSendMessageModalOpen,
    isCancelAppointmentModalOpen,
    setIsCancelAppointmentModalOpen,
    isPatientDetailsModalOpen,
    setIsPatientDetailsModalOpen,
    isAfflictionDetailsModalOpen,
    setIsAfflictionDetailsModalOpen,
  } = useUIContext();

  const formattedDate = formatCurrentDate();

  useDynamicAppointmentCheck(tableAppointments, isDynamicModeOn);

  const { isLoading, isFetching } = useFetchTherapistDashboardDataQuery({
    tableAppointments,
    setTableAppointments,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex w-full items-center justify-center">
        {DNALoader()};
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-11/12">
      <div className="w-full flex justify-end mb-6 gap-4 items-center">
        <DayTableDynamicParagraph />

        <Button onClick={handleDynamicModeClick}>
          <img
            src={!isDynamicModeOn ? dynamicIcon : dynamicIcon2}
            alt={isDynamicModeOn ? 'dynamic mode on' : 'dynamic mode off'}
            className={`${isDynamicModeOn ? 'animate-spin' : ''} w-6 h-6 md:w-8 md:h-8 hover:animate-spin`}
          />
        </Button>

        <p className="border border-gray-200 p-2 rounded-xl shadow-xl italic font-semibold text-xxs md:text-base">
          Date: {formattedDate}
        </p>
      </div>

      <div className="w-full rounded-xl ">
        <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl text-xxs md:text-base">
          <DayTableHead />

          <DayTableBody />
        </table>
      </div>

      {isSendMessageModalOpen && (
        <SendMessageModal
          isOpen={isSendMessageModalOpen}
          onClose={() => {
            setIsSendMessageModalOpen(false);
          }}
        />
      )}

      {isCancelAppointmentModalOpen && (
        <CancelAppointmentModal
          isOpen={isCancelAppointmentModalOpen}
          onClose={() => {
            setIsCancelAppointmentModalOpen(false);
          }}
        />
      )}

      {isPatientDetailsModalOpen && (
        <PatientDetailsModal
          isOpen={isPatientDetailsModalOpen}
          onClose={() => {
            setIsPatientDetailsModalOpen(false);
          }}
        />
      )}

      {isAfflictionDetailsModalOpen && (
        <AfflictionDetailsModal
          isOpen={isAfflictionDetailsModalOpen}
          onClose={() => {
            setIsAfflictionDetailsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
