import { useState, useEffect } from "react";

export const useSignal = <T>() => {
  const [signal, setSignal] = useState<T | boolean>(false);

  useEffect(() => {
    if (signal) {
      setSignal(false);
    }
  }, [signal]);

  const activate = (signal: T) => setSignal(signal || true);

  return [signal as T, activate] as const;
};
