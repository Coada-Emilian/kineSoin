import { CalendarDays, NotepadTextDashed, SportShoe } from 'lucide-react';
import type {
  IPatientHistoryDto,
  IPrescriptionHistory,
} from '../../../../../@types/interfaces/therapistInterfaces';
import { formatDate } from '../../../../../utils/functions/formatDate';

export default function PatientPrescriptionsStats({
  data,
}: {
  data: IPatientHistoryDto;
}) {
  const totalPrescriptions = data.prescriptions.length ?? 0;

  const totalAppointmentsEver =
    data.prescriptions.reduce(
      (total: number, prescription: IPrescriptionHistory) =>
        total + prescription.appointment_quantity,
      0
    ) ?? 0;

  const firstPrescriptionDate =
    data?.prescriptions.length > 0
      ? [...data.prescriptions].sort(
          (a, b) =>
            new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
        )[0].date
      : null;
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-teal-100 p-3">
            <NotepadTextDashed className="size-6 text-teal-600" />
          </div>

          <p className="text-xl font-bold text-slate-700">
            {totalPrescriptions}
          </p>

          <p className="text-sm text-slate-500">
            ordonnance{totalPrescriptions > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-blue-100 p-3">
            <SportShoe className="size-6 text-blue-600" />
          </div>

          <p className="text-xl font-bold text-slate-700">
            {totalAppointmentsEver}
          </p>

          <p className="text-sm text-slate-500">séances prévues</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-violet-100 p-3">
            <CalendarDays className="size-6 text-violet-600" />
          </div>

          <p className="text-xl font-bold text-slate-700">
            {firstPrescriptionDate ? formatDate(firstPrescriptionDate) : '-'}
          </p>

          <p className="text-sm text-slate-500">Première ordonnance</p>
        </div>
      </div>
    </div>
  );
}
