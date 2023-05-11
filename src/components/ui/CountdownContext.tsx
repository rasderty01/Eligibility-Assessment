import { createContext, useState, useContext, ReactNode } from "react";

const CountdownContext = createContext({
  showCountdown: false,
  startCountdown: () => {},
  stopCountdown: () => {},
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

  return (
    <CountdownContext.Provider
      value={{ showCountdown, startCountdown, stopCountdown }}
    >
      {children}
    </CountdownContext.Provider>
  );
};
