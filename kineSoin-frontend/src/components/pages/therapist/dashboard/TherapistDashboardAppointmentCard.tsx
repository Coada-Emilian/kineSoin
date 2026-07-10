import { Button } from '@headlessui/react';
import type { TherapistDashboardAppointmentsCardProps } from '../../../../@types/props/therapistProps';

import { getCurrentTime } from '../../../../utils/functions/getCurrentTime';
import cancelIcon from '/icons/cancel.png';
import messageIcon from '/icons/message.png';

export default function TherapistDashboardAppointmentCard({
  appointment,
}: TherapistDashboardAppointmentsCardProps) {
  const currentTime = getCurrentTime();
  const isTimePassed = appointment.time < currentTime;

  return (
    <div
      className={`rounded-2xl border border-slate-200 p-4 shadow-sm transition-shadow ${
        isTimePassed ? 'bg-slate-50' : 'bg-linear-to-r from-teal-50 to-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-800">
          {appointment.time}
        </span>
      </div>

      <div className="mt-4">
        <h3
          className={`text-base font-semibold ${
            isTimePassed ? 'text-slate-500' : 'text-slate-800'
          }`}
        >
          {appointment.patientFullName}
        </h3>

        <p
          className={`mt-2 text-sm ${
            isTimePassed ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {appointment.afflictionName}
        </p>
      </div>

      {!isTimePassed && (
        <div className="mt-5 flex justify-end gap-3">
          <Button className="rounded-full p-2 transition-colors hover:bg-slate-100">
            <img
              src={messageIcon}
              alt="Envoyer un message"
              className="h-5 w-5"
            />
          </Button>

          <Button className="rounded-full p-2 transition-colors hover:bg-red-50">
            <img src={cancelIcon} alt="Annuler" className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
