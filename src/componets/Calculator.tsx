import React, { useEffect } from "react";
import { useProductos } from "../context/ProductosContext";
import { useTotal } from "../context/TotalContext";
import { useCantidades } from "../context/CantidadesContext";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const { productos } = useProductos();
  const { setTotal } = useTotal();
  const { cantidades, setCantidades } = useCantidades();

  // Inicializar cantidades si está vacío o cambia la lista de productos
  useEffect(() => {
    if (cantidades.length !== productos.length) {
      setCantidades(productos.map(() => 0));
    }
  }, [productos, cantidades, setCantidades]);

  const incrementar = (idx: number) => {
    setCantidades((cantidades) =>
      cantidades.map((c, i) => (i === idx ? c + 1 : c))
    );
  };

  const limpiarCantidades = () => {
    setCantidades(productos.map(() => 0));
  };

  const subtotales = productos.map((p, i) => {
    const precioNormalizado =
      typeof p.precio === "string"
        ? Number(String(p.precio).replace(",", "."))
        : p.precio;
    return precioNormalizado * cantidades[i];
  });
  const totalCalculado = subtotales.reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    setTotal(totalCalculado);
  }, [totalCalculado, setTotal]);

  return (
    <div className="calculator-container">
      <h2>Calculadora</h2>
      <table className="calculator-table">
        <thead>
          <tr>
            <th style={{ width: "35%" }}>Producto</th>
            <th style={{ width: "15%" }}>PU</th>
            <th style={{ width: "10%" }}>Cant.</th>
            <th style={{ width: "15%" }}>Subtotal</th>
            <th style={{ width: "7%", textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, idx) => {
            const cantidad = cantidades[idx];
            return (
              <tr
                key={idx}
                className={`calc-producto-fila${
                  cantidad > 0 ? "" : " sin-cantidad"
                }`}
                onClick={(e) => {
                  incrementar(idx);
                  if (cantidad + 1 > 0) {
                    e.currentTarget.classList.add("pressed");
                    setTimeout(() => {
                      e.currentTarget.classList.remove("pressed");
                    }, 300);
                  }
                }}
                style={{ cursor: "pointer", userSelect: "none" }}
                title="Toca la fila para incrementar"
              >
                <td style={{ width: "35%" }}>
                  {producto.nombre.toUpperCase()}
                </td>
                <td style={{ width: "15%" }}>${producto.precio.toFixed(2)}</td>
                <td style={{ width: "10%" }}>
                  <span className="calc-cantidad">{cantidad}</span>
                </td>
                <td style={{ width: "15%" }}>${subtotales[idx].toFixed(2)}</td>
                <td style={{ width: "7%", textAlign: "center" }}>
                  <button
                    className="calc-btn"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setCantidades((cantidades) =>
                        cantidades.map((c, i) => (i === idx ? 0 : c))
                      );
                    }}
                    title="Resetear cantidad"
                    style={{ background: "#fbc02d", padding: "2px 6px" }}
                  >
                    {/* Icono de quitar */}❌
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>
              Total:
            </td>
            <td style={{ fontWeight: "bold" }}>${totalCalculado.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <button
        className="calc-btn"
        style={{ marginTop: "1rem", background: "#d32f2f" }}
        onClick={limpiarCantidades}
      >
        Limpiar
      </button>
    </div>
  );
};

export default Calculator;
