import { useEffect, useState } from "react";

export const useMinDelay = (isCheckingAuth, minDelay = 1000) => {
  const [minTimeReached, setMinTimeReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeReached(true), minDelay);
    return () => clearTimeout(timer);
  }, [minDelay]);

  return isCheckingAuth || !minTimeReached;
};