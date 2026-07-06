import { Button } from '@headlessui/react';
import { useDynamicAppointmentCheck } from '../../../../hooks/context/therapist/useDynamicAppointmentCheck';
import { useFetchTherapistDashboardDataQuery } from '../../../../hooks/context/therapist/useFetchTherapistDashboardDataQuery';
import { useTherapistAppointmentsContext } from '../../../../hooks/context/therapist/useTherapistAppointmentsContext';
import { useUTherapistUiContext } from '../../../../hooks/context/therapist/useTherapistUiContext';
import { formatCurrentDate } from '../../../../utils/functions/formatCurrentDate';
import DNALoader from '../../../ui/DNALoader';
import CancelAppointmentModal from '../../../ui/modals/therapist/CancelAppointmentModal';
import SendMessageModal from '../../../ui/modals/therapist/SendMessageModal';
import TherapistDashboardTableBody from './table/TherapistDashboardTableBody';
import TherapistDashboardTableHead from './table/TherapistDashboardTableHead';
import TherapistDashboardDynamicParagraph from './TherapistDashboardDynamicParagraph';
import dynamicIcon from '/icons/dynamic2_32.webp';
import dynamicIcon2 from '/icons/dynamic_32.webp';

export default function TherapistDashboardTable() {
  const { tableAppointments, setTableAppointments } =
    useTherapistAppointmentsContext();

  const { isDynamicModeOn, handleDynamicModeClick, openModal, closeModal } =
    useUTherapistUiContext();

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
        <TherapistDashboardDynamicParagraph />

        <Button onClick={handleDynamicModeClick}>
          <img
            src={!isDynamicModeOn ? dynamicIcon : dynamicIcon2}
            alt={isDynamicModeOn ? 'dynamic mode on' : 'dynamic mode off'}
            className={`${isDynamicModeOn ? 'animate-spin' : ''} w-6 h-6 md:w-8 md:h-8 cursor-pointer`}
          />
        </Button>

        <p className="border border-gray-200 p-2 rounded-xl shadow-xl italic font-semibold text-xxs md:text-base">
          Date: {formattedDate}
        </p>
      </div>

      <div className="w-full rounded-xl ">
        <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl text-xxs md:text-base">
          <TherapistDashboardTableHead />

          <TherapistDashboardTableBody />
        </table>
      </div>

      <SendMessageModal isOpen={openModal === 'message'} onClose={closeModal} />

      <CancelAppointmentModal
        isOpen={openModal === 'cancel'}
        onClose={closeModal}
      />

      {/* {isPatientDetailsModalOpen && (
        <PatientDetailsModal
          isOpen={isPatientDetailsModalOpen}
          onClose={() => {
            setIsPatientDetailsModalOpen(false);
          }}
        />
      )} */}

      {/* {isAfflictionDetailsModalOpen && (
        <AfflictionDetailsModal
          isOpen={isAfflictionDetailsModalOpen}
          onClose={() => {
            setIsAfflictionDetailsModalOpen(false);
          }}
        />
      )} */}
    </div>
  );
}
