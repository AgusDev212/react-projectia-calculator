import React, { createContext, useContext, useState } from 'react';

interface CantidadesContextType {
  cantidades: number[];
  setCantidades: React.Dispatch<React.SetStateAction<number[]>>;
}

const CantidadesContext = createContext<CantidadesContextType | undefined>(undefined);

export const useCantidades = () => {
  const context = useContext(CantidadesContext);
  if (!context) throw new Error('useCantidades debe usarse dentro de CantidadesProvider');
  return context;
};

export const CantidadesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cantidades, setCantidades] = useState<number[]>([]);
  return (
    <CantidadesContext.Provider value={{ cantidades, setCantidades }}>
      {children}
    </CantidadesContext.Provider>
  );
};
