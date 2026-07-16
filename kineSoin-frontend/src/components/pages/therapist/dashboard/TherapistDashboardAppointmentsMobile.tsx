import type { IDashboardAppointment } from '../../../../@types/interfaces/therapistInterfaces';
import type { TherapistDashboardAppointmentsTableProps } from '../../../../@types/props/therapistProps';
import TherapistDashboardAppointmentCard from './TherapistDashboardAppointmentCard';

export default function TherapistDashboardAppointmentsMobile({
  appointments,
}: TherapistDashboardAppointmentsTableProps) {
  return (
    <div className="flex flex-col gap-4">
      {appointments.map((appointment: IDashboardAppointment) => (
        <TherapistDashboardAppointmentCard
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </div>
  );
}
