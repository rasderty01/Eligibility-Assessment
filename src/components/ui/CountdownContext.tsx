import { createContext, useState, useContext, ReactNode } from "react";

const CountdownContext = createContext({
  showCountdown: false,
  startCountdown: () => {},
  stopCountdown: () => {},
  resetCountdown: () => {},
});

export const useCountdown = () => useContext(CountdownContext);

export const CountdownProvider = ({ children }: { children: ReactNode }) => {
  const [showCountdown, setShowCountdown] = useState(false);

  const startCountdown = () => {
    setShowCountdown(true);
  };

  const stopCountdown = () => {
    setShowCountdown(false);
  };

  const resetCountdown = () => {
    setShowCountdown(false);
  };

  return (
    <CountdownContext.Provider
      value={{ showCountdown, startCountdown, stopCountdown, resetCountdown }}
    >
      {children}
    </CountdownContext.Provider>
  );
};
