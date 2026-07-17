import type { IDashboardAppointment } from '../../../../@types/interfaces/therapistInterfaces';
import type { TherapistDashboardProps } from '../../../../@types/props/therapistProps';
import TherapistDashboardAppointmentCard from './TherapistDashboardAppointmentCard';

export default function TherapistDashboardMobile({
  appointments,
}: TherapistDashboardProps) {
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
