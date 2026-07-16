import { Button } from '@headlessui/react';
import type { ITherapistDashboardAppointment } from '../../../../@types/interfaces/therapistInterfaces';
import type { TherapistDashboardAppointmentsCardProps } from '../../../../@types/props/therapistProps';
import { useTherapistSelectionContext } from '../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useUTherapistUiContext } from '../../../../hooks/context/therapist/useTherapistUiContext';
import { getCurrentTime } from '../../../../utils/functions/getCurrentTime';
import { getRemainingAppointmentTime } from '../../../../utils/functions/therapist/getRemainingAppointmentTime';
import cancelIcon from '/icons/cancel.png';
import messageIcon from '/icons/message.png';

export default function TherapistDashboardAppointmentCard({
  appointment,
}: TherapistDashboardAppointmentsCardProps) {
  const currentTime = getCurrentTime();
  const isTimePassed = appointment.time < currentTime;

  const { label, isPassed } = getRemainingAppointmentTime(appointment.time);

  const { setOpenModal } = useUTherapistUiContext();

  const {
    setSelectedPatient,
    setSelectedAppointment,
    setSelectedPrescription,
  } = useTherapistSelectionContext();

  const handleMessageIconClick = (
    appointment: ITherapistDashboardAppointment
  ) => {
    setSelectedPatient(appointment.patient);
    setOpenModal('message');
  };

  const handleCancelIconClick = (
    appointment: ITherapistDashboardAppointment
  ) => {
    setSelectedAppointment(appointment);
    setSelectedPatient(appointment.patient);
    setSelectedPrescription(appointment.prescription);
    setOpenModal('cancel');
  };

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        isTimePassed
          ? 'border-slate-200 bg-slate-50'
          : 'border-teal-100 bg-linear-to-r from-teal-50 to-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            isTimePassed
              ? 'bg-slate-200 text-slate-600'
              : 'bg-teal-100 text-teal-700'
          }`}
        >
          {appointment.time}
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isPassed
              ? 'bg-slate-200 text-slate-500'
              : label === 'Bientôt'
                ? 'bg-orange-100 text-orange-700'
                : label.includes('min')
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {label}
        </span>
      </div>

      <div className="mt-5">
        <h3
          className={`text-lg font-semibold ${
            isTimePassed ? 'text-slate-500' : 'text-slate-800'
          }`}
        >
          {appointment.patient.name} {appointment.patient.surname}
        </h3>

        <p
          className={`mt-1 text-sm ${
            isTimePassed ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {appointment.afflictionName}
        </p>
      </div>

      {!isTimePassed && (
        <div className=" flex justify-end gap-2 border-t border-slate-100 pt-4">
          <Button
            className="rounded-full p-2 transition-colors hover:bg-slate-100"
            onClick={() => handleMessageIconClick(appointment)}
          >
            <img
              src={messageIcon}
              alt="Envoyer un message"
              className="h-5 w-5"
            />
          </Button>

          <Button
            className="rounded-full p-2 transition-colors hover:bg-red-50"
            onClick={() => handleCancelIconClick(appointment)}
          >
            <img
              src={cancelIcon}
              alt="Annuler le rendez-vous"
              className="h-5 w-5"
            />
          </Button>
        </div>
      )}
    </div>
  );
}
