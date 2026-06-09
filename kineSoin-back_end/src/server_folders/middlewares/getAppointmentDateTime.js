export default function getAppointmentDateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}`);
}
