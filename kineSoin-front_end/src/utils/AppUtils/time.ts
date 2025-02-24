export const generateTimeSlots = () => {
  const times: string[] = [];
  let start = new Date();
  start.setHours(8, 0, 0, 0); // Start at 08:00 AM

  while (start.getHours() < 20) {
    // Until 08:00 PM
    times.push(
      start.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    start.setMinutes(start.getMinutes() + 30); // Increment by 30 minutes
  }

  return times;
};