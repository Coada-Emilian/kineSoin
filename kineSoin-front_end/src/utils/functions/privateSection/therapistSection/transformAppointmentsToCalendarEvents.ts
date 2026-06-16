import { ICalendarAppointment } from '../../../../@types/interfaces/customInterfaces';

export const transformAppointmentsToCalendarEvents = (
  appointments: ICalendarAppointment[]
) => {
  return appointments.map((appointment) => ({
    id: String(appointment.id),
    title: `${appointment.patient.surname} ${appointment.patient.name}`, // Just the patient's full name
    start: new Date(`${appointment.date}T${appointment.time}`),
    patientId: String(appointment.patient.id), // Ensure patientId is a string
    end: new Date(
      new Date(`${appointment.date}T${appointment.time}`).getTime() +
        30 * 60 * 1000 // +30min
    ),
  }));
};
