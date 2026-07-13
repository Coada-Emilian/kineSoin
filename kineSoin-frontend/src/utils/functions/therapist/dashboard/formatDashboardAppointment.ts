import type { ISameDayAppointment } from '../../../../@types/interfaces/therapistInterfaces';
import { getFormattedAppointmentDate } from '../../getFormattedAppointmentDate';
import { getNameInitials } from '../getNameInitials';

export function formatDashboardAppointment(
  appointment: ISameDayAppointment | undefined,
  isTimePassed: boolean
) {
  if (!appointment) return null;

  const patientFullName = `${appointment.patient.name} ${appointment.patient.surname}`;

  return {
    patientFullName,
    patientEmail: appointment.patient.email,
    patientFullPhoneNumber: `${appointment.patient.prefix} ${appointment.patient.phone_number}`,
    patientNameInitials: getNameInitials(patientFullName),
    afflictionName: appointment.afflictionName,
    afflictionBodyRegion:
      appointment.prescription?.affliction?.body_region?.name,
    lastAppointment: getFormattedAppointmentDate(
      appointment.lastAppointmentAt ?? null
    ),

    classes: {
      primaryText: isTimePassed
        ? 'text-gray-500 italic font-semibold'
        : 'text-slate-700 font-semibold',

      secondaryText: isTimePassed
        ? 'text-gray-400 italic font-medium'
        : 'text-slate-400 font-medium',

      avatar: isTimePassed
        ? 'bg-gray-200 text-slate-400'
        : 'bg-teal-50 text-slate-600 group-hover:bg-teal-100 group-hover:text-secondaryBlue',

      iconButton: isTimePassed
        ? 'bg-gray-200'
        : 'bg-teal-50 transition-all duration-150 hover:bg-teal-100 active:scale-95 cursor-pointer',

      icon: isTimePassed
        ? 'h-4 w-4 md:h-5 md:w-5'
        : 'h-4 w-4 md:h-5 md:w-5 transition-transform duration-150 group-hover:scale-110',
    },
  };
}
