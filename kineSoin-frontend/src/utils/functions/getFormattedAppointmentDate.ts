export function getFormattedAppointmentDate(date: string | null) {
  if (!date) return null;

  const appointmentDate = new Date(date);

  return {
    date: new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(appointmentDate),

    time: new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(appointmentDate),
  };
}
