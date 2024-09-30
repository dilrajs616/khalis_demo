import { createContext, ReactNode, useState } from "react";

export const ShabadContext = createContext({
  shabad: 1,
  setShabad: (shabadId: number) => {},
});

export function ShabadContextProvider({ children }: { children: ReactNode }) {
  const [shabad, setShabad] = useState<any>();
  return (
    <ShabadContext.Provider value={{ shabad, setShabad }}>
      {children}
    </ShabadContext.Provider>
  );
}
