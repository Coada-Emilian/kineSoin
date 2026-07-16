import { CalendarDays, CircleCheckBig, Clock3, Target } from 'lucide-react';
import { formatProgress } from '../../../../utils/functions/therapist/formatProgress';

export default function PrescriptionProgressSection({
  completedAppointments,
  totalAppointments,
  progress,
}: {
  completedAppointments: number;
  totalAppointments: number;
  progress: number;
}) {
  return (
    <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/40 p-5 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="size-5 text-teal-700" />

          <h3 className="font-semibold text-slate-700">Progression</h3>
        </div>

        <span className="text-sm text-slate-600">
          <span className="font-semibold text-teal-700">
            {completedAppointments}
          </span>
          {' / '}
          <span className="font-semibold text-teal-700">
            {totalAppointments}
          </span>{' '}
          séances réalisées
        </span>
      </div>

      <div className="mt-5 flex items-center gap-4 ">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-linear-to-r from-teal-500 to-teal-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
          {formatProgress(progress)}
        </span>
      </div>

      <div className="my-5 h-px bg-slate-200" />

      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <div className="flex items-center justify-center gap-3 px-4">
          <div className="rounded-full bg-emerald-100 p-3 ">
            <CircleCheckBig className="size-7 shrink-0 text-emerald-600" />
          </div>

          <div className="items-start flex flex-col">
            <p className="text-2xl font-bold leading-none text-emerald-600">
              {completedAppointments}
            </p>

            <p className="text-sm text-slate-500">réalisées</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-4">
          <div className="rounded-full bg-blue-100 p-3">
            <Clock3 className="size-7 shrink-0 text-blue-600" />
          </div>

          <div className="items-start flex flex-col">
            <p className="text-2xl font-bold leading-none text-blue-600">
              {totalAppointments - completedAppointments}
            </p>

            <p className="text-sm text-slate-500">restantes</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-4">
          <div className="rounded-full bg-violet-100 p-3">
            <CalendarDays className="size-7 shrink-0 text-violet-600" />
          </div>

          <div className="items-start flex flex-col">
            <p className="text-2xl font-bold leading-none text-violet-600">
              {totalAppointments}
            </p>

            <p className="text-sm text-slate-500">prévues</p>
          </div>
        </div>
      </div>
    </div>
  );
}
