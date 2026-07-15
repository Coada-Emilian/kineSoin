import { CalendarDays, Clock, UserRound } from 'lucide-react';
import type { ISameDayAppointment } from '../../../../../@types/interfaces/therapistInterfaces';
import { formatDate } from '../../../../../utils/functions/formatDate';

export default function AppointmentDetailsCard({
  appointment,
}: {
  appointment: ISameDayAppointment | null;
}) {
  return (
    <div className="grid w-10/12 justify-self-center grid-cols-[auto_1fr] gap-x-6 gap-y-4 rounded-xl bg-slate-100 p-5 text-base">
      <div className="flex items-center gap-2">
        <UserRound className="size-5 text-slate-500" />
        <span className="font-semibold">Patient</span>
      </div>

      <p className="font-semibold text-slate-700">
        {appointment?.patient.surname} {appointment?.patient.name}
      </p>

      <div className="flex items-center gap-2">
        <CalendarDays className="size-5 text-slate-500" />
        <span className="font-semibold">Date</span>
      </div>

      <p className="font-semibold text-slate-700">{formatDate(Date())}</p>

      <div className="flex items-center gap-2">
        <Clock className="size-5 text-slate-500" />
        <span className="font-semibold">Heure</span>
      </div>

      <p className="font-semibold text-slate-700">{appointment?.time}</p>
    </div>
  );
}
