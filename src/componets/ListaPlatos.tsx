import React, { useState } from "react";
import { useProductos } from "../context/ProductosContext";
import "./ListaPlatos.css";

// ...existing code...

const ListaPlatos: React.FC = () => {
  const { productos, setProductos } = useProductos();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const agregarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    const precioNormalizado = precio.replace(",", ".");
    if (!nombre || !precioNormalizado || isNaN(Number(precioNormalizado)))
      return;
    setProductos([
      ...productos,
      { nombre: nombre.toUpperCase(), precio: Number(precioNormalizado) },
    ]);
    setNombre("");
    setPrecio("");
  };

  const eliminarProducto = (idx: number) => {
    setProductos(productos.filter((_, i) => i !== idx));
  };

  return (
    <div className="lista-platos-container">
      <h2>Lista de Productos</h2>
      <form className="lista-platos-form" onSubmit={agregarProducto}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre.toUpperCase()}
          onChange={(e) => setNombre(e.target.value.toUpperCase())}
          style={{ width: "120px" }}
        />
        <input
          type="number"
          placeholder="P. unit."
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ width: "30px" }}
        />
        <button type="submit">Add</button>
      </form>
      <table className="lista-platos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos
            .slice()
            .sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map((producto, idx) => {
              const indexOriginal = productos.findIndex((p) => p === producto);
              return (
                <tr key={idx} className={idx % 2 === 0 ? "" : "fila-par"}>
                  <td>{producto.nombre.toUpperCase()}</td>
                  <td>
                    <input
                      type="number"
                      value={producto.precio}
                      min={0}
                      step={1}
                      style={{
                        width: "80px",
                        textAlign: "right",
                        backgroundColor: "white",
                        color: "black",
                        textAlignLast: "center",
                        fontSize: "1rem",
                      }}
                      onChange={(e) => {
                        const valor = e.target.value.replace(",", ".");
                        const nuevoPrecio = Number(valor);
                        setProductos(
                          productos.map((p, i) =>
                            i === indexOriginal
                              ? { ...p, precio: nuevoPrecio }
                              : p
                          )
                        );
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => eliminarProducto(indexOriginal)}
                      className="eliminar-btn"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPlatos;
