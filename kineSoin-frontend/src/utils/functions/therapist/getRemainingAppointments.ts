import type { ISameDayAppointment } from '../../../@types/interfaces/therapistInterfaces';
import { getCurrentTime } from '../getCurrentTime';

export const getRemainingAppointments = (
  appointments: ISameDayAppointment[]
) => {
  const currentTime = getCurrentTime();

  return appointments.filter((appointment) => appointment.time >= currentTime);
};
