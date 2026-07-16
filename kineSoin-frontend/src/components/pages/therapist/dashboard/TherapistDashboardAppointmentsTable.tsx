import type { IDashboardAppointment } from '../../../../@types/interfaces/therapistInterfaces';
import TherapistDashboardTableBody from './table/TherapistDashboardTableBody';
import TherapistDashboardTableHead from './table/TherapistDashboardTableHead';

export default function TherapistDashboardAppointmentsTable({
  appointments,
}: {
  appointments: IDashboardAppointment[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0 text-xxs md:text-base">
        <TherapistDashboardTableHead />

        <TherapistDashboardTableBody appointments={appointments} />
      </table>
    </div>
  );
}
