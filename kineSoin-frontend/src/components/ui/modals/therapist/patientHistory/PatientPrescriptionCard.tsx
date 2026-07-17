import {
  ChevronDown,
  ChevronUp,
  CircleCheckBig,
  Clock3,
  NotepadTextDashed,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import type { IPrescriptionHistory } from '../../../../../@types/interfaces/therapistInterfaces';
import { formatDate } from '../../../../../utils/functions/formatDate';
import PrescriptionProgressSection from '../PrescriptionProgressBar';

export default function PatientPrescriptionCard({
  prescription,
  expanded,
  handlePrescriptionToggle,
  progress,
}: {
  prescription: IPrescriptionHistory;
  expanded: boolean;
  handlePrescriptionToggle: (prescriptionId: number) => void;
  progress: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between p-5 transition hover:bg-slate-50"
        onClick={() => handlePrescriptionToggle(prescription.id)}
      >
        <div className="text-left">
          <h3 className="text-lg font-semibold text-slate-700">
            {prescription.affliction.name}
          </h3>

          <p className="text-sm text-slate-500">
            Ordonnance #{prescription.id} •{' '}
            {prescription.date && formatDate(prescription.date)}
          </p>

          <p className="mt-1 text-sm text-teal-600">
            {prescription.completed_appointment_quantity} /{' '}
            {prescription.appointment_quantity} séances réalisées
          </p>
        </div>

        {expanded ? (
          <ChevronUp className="size-6 text-slate-500" />
        ) : (
          <ChevronDown className="size-6 text-slate-500" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-slate-200 p-5">
          <PrescriptionProgressSection
            progress={progress}
            completedAppointments={prescription.completed_appointment_quantity}
            totalAppointments={prescription.appointment_quantity}
          />

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Stethoscope className="size-5 text-teal-600" />

                <span className="font-semibold">Médecin</span>
              </div>

              <p>
                {prescription.medic.surname} {prescription.medic.name}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <NotepadTextDashed className="size-5 text-teal-600" />

                <span className="font-semibold">Affection</span>
              </div>

              <p>{prescription.affliction.name}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-4 text-lg font-semibold text-slate-700">
              Consultations
            </h4>

            <div className="flex flex-col divide-y divide-slate-100 rounded-xl border border-slate-100">
              {prescription.appointments
                .sort(
                  (a, b) =>
                    new Date(`${a.date}T${a.time}`).getTime() -
                    new Date(`${b.date}T${b.time}`).getTime()
                )
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      {appointment.is_canceled ? (
                        <XCircle className="size-6 text-red-500" />
                      ) : appointment.is_accepted ? (
                        <CircleCheckBig className="size-6 text-green-500" />
                      ) : (
                        <Clock3 className="size-6 text-amber-500" />
                      )}

                      <div className="flex flex-col items-start">
                        <p className="font-semibold">
                          {formatDate(appointment.date)}
                        </p>

                        <p className="text-sm text-slate-500">
                          {appointment.time.slice(0, 5)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <img
                        src={appointment.therapist.picture_url}
                        alt={`${appointment.therapist.name} ${appointment.therapist.surname}`}
                        className="size-8 rounded-full"
                      />
                      <span className="text-sm font-semibold">
                        {appointment.therapist.surname}{' '}
                        {appointment.therapist.name}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
