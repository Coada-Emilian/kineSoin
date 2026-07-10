export function getRemainingAppointmentTime(appointmentTime: string) {
  const [hours, minutes] = appointmentTime.split(':').map(Number);

  const now = new Date();

  const appointmentDate = new Date(now);
  appointmentDate.setHours(hours, minutes, 0, 0);

  const remainingMinutes = Math.floor(
    (appointmentDate.getTime() - now.getTime()) / 60000
  );

  if (remainingMinutes < 0) {
    return {
      label: 'Terminé',
      isPassed: true,
    };
  }

  if (remainingMinutes < 15) {
    return {
      label: 'Bientôt',
      isPassed: false,
    };
  }

  if (remainingMinutes < 60) {
    return {
      label: `Dans ${remainingMinutes} min`,
      isPassed: false,
    };
  }

  const hoursRemaining = Math.floor(remainingMinutes / 60);
  const minutesRemaining = remainingMinutes % 60;

  return {
    label:
      minutesRemaining === 0
        ? `Dans ${hoursRemaining} h`
        : `Dans ${hoursRemaining} h ${minutesRemaining}`,
    isPassed: false,
  };
}
