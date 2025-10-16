import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Producto {
  nombre: string;
  precio: number;
}

const prodIniciales: Producto[] = [
  { nombre: "AJI DE CARNE", precio: 18 },
  { nombre: "BISTE", precio: 15 },
  { nombre: "PUCHERO", precio: 18 },
  { nombre: "ALBONDIGAS", precio: 16 },
  { nombre: "MILANESA", precio: 15 },
  { nombre: "POLLO AL HORNO", precio: 25 },
  { nombre: "MONDONGO", precio: 25 },
  { nombre: "FRICASE", precio: 25 },
  { nombre: "FRICASE DE POLLO", precio: 20 },
  { nombre: "SOPA", precio: 7 },
];

interface ProductosContextType {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
}

const ProductosContext = createContext<ProductosContextType | undefined>(
  undefined
);

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context)
    throw new Error("useProductos debe usarse dentro de ProductosProvider");
  return context;
};

export const ProductosProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<Producto[]>(prodIniciales);
  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};
