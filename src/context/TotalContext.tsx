import React, { createContext, useContext, useState } from 'react';

interface TotalContextType {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const TotalContext = createContext<TotalContextType | undefined>(undefined);

export const useTotal = () => {
  const context = useContext(TotalContext);
  if (!context) throw new Error('useTotal debe usarse dentro de TotalProvider');
  return context;
};

export const TotalProvider = ({ children }: { children: React.ReactNode }) => {
  const [total, setTotal] = useState(0);
  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};
