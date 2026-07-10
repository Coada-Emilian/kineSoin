import type { TherapistDashboardAppointmentsTableProps } from '../../../../@types/props/therapistProps';
import TherapistDashboardTableBody from './table/TherapistDashboardTableBody';
import TherapistDashboardTableHead from './table/TherapistDashboardTableHead';

export default function TherapistDashboardAppointmentsTable({
  appointments,
}: TherapistDashboardAppointmentsTableProps) {
  return (
    <div className="w-full rounded-xl ">
      <table className="border border-gray-300 border-separate w-full mx-auto md:w-11/12 md:my-auto mb-6 rounded-2xl shadow-2xl text-xxs md:text-base">
        <TherapistDashboardTableHead />

        <TherapistDashboardTableBody appointments={appointments} />
      </table>
    </div>
  );
}
