import { useEffect, useState } from 'react';

export const useDashboardRefresh = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 60_000); // check every minute

    return () => clearInterval(interval);
  }, []);
};
