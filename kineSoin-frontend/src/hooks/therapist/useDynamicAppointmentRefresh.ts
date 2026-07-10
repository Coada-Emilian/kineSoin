import { useEffect, useState } from 'react';

export const useDynamicDashboardRefresh = (isDynamicModeOn: boolean) => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!isDynamicModeOn) return;

    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 60_000); // check every minute

    return () => clearInterval(interval);
  }, [isDynamicModeOn]);
};
