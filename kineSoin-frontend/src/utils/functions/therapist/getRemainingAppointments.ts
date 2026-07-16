import type { IDashboardAppointment } from '../../../@types/interfaces/therapistInterfaces';
import { getCurrentTime } from '../getCurrentTime';

export const getRemainingAppointments = (
  appointments: IDashboardAppointment[]
) => {
  const currentTime = getCurrentTime();

  return appointments.filter((appointment) => appointment.time >= currentTime);
};
