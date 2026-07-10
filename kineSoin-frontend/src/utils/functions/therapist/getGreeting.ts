export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return 'Bonjour';
  }

  if (currentHour >= 12 && currentHour < 18) {
    return 'Bon après‑midi';
  }

  return 'Bonsoir';
};
