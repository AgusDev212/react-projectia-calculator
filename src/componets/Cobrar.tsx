import React, { useState } from 'react';
import { useTotal } from '../context/TotalContext';
import './Cobrar.css';

const Cobrar: React.FC = () => {
  const { total } = useTotal();
  const [efectivo, setEfectivo] = useState(0);

  const cambio = efectivo - total;

  const agregarBillete = (valor: number) => {
    setEfectivo(e => e + valor);
  };

  const limpiarEfectivo = () => setEfectivo(0);

  return (
    <div className="cobrar-container">
      <h2>Cobrar</h2>
      <div className="cobrar-field">
        <label htmlFor="total">Total de la venta:</label>
        <input
          id="total"
          type="number"
          value={total}
          min={0}
          step={1}
          readOnly
        />
      </div>
      <div className="cobrar-field">
        <label htmlFor="efectivo">Efectivo cancelado:</label>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button type="button" onClick={() => agregarBillete(50)}>50</button>
          <button type="button" onClick={() => agregarBillete(100)}>100</button>
          <button type="button" onClick={() => agregarBillete(200)}>200</button>
          <button type="button" onClick={limpiarEfectivo} style={{ marginLeft: '1rem', color: '#d32f2f' }}>Limpiar</button>
        </div>
        <input
          id="efectivo"
          type="number"
          value={efectivo}
          min={0}
          step={1}
          readOnly
        />
      </div>
      <div className="cobrar-field">
        <label>Cambio:</label>
        <input
          type="number"
          value={cambio >= 0 ? cambio : 0}
          readOnly
          className="cobrar-cambio"
        />
      </div>
    </div>
  );
};

export default Cobrar;
