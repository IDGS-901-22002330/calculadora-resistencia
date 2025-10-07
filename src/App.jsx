import { useState } from 'react';
import './App.css';

const coloresBandas = {
  banda1: [
    { nombre: 'Negro', valor: 0, color: '#000000' },
    { nombre: 'Marrón', valor: 1, color: '#8B4513' },
    { nombre: 'Rojo', valor: 2, color: '#FF0000' },
    { nombre: 'Naranja', valor: 3, color: '#FFA500' },
    { nombre: 'Amarillo', valor: 4, color: '#FFFF00' },
    { nombre: 'Verde', valor: 5, color: '#008000' },
    { nombre: 'Azul', valor: 6, color: '#0000FF' },
    { nombre: 'Violeta', valor: 7, color: '#EE82EE' },
    { nombre: 'Gris', valor: 8, color: '#808080' },
    { nombre: 'Blanco', valor: 9, color: '#FFFFFF' },
  ],
  banda2: [
    { nombre: 'Negro', valor: 0, color: '#000000' },
    { nombre: 'Marrón', valor: 1, color: '#8B4513' },
    { nombre: 'Rojo', valor: 2, color: '#FF0000' },
    { nombre: 'Naranja', valor: 3, color: '#FFA500' },
    { nombre: 'Amarillo', valor: 4, color: '#FFFF00' },
    { nombre: 'Verde', valor: 5, color: '#008000' },
    { nombre: 'Azul', valor: 6, color: '#0000FF' },
    { nombre: 'Violeta', valor: 7, color: '#EE82EE' },
    { nombre: 'Gris', valor: 8, color: '#808080' },
    { nombre: 'Blanco', valor: 9, color: '#FFFFFF' },
  ],
  multiplicador: [
    { nombre: 'Negro', valor: 1, color: '#000000' },
    { nombre: 'Marrón', valor: 10, color: '#8B4513' },
    { nombre: 'Rojo', valor: 100, color: '#FF0000' },
    { nombre: 'Naranja', valor: 1000, color: '#FFA500' },
    { nombre: 'Amarillo', valor: 10000, color: '#FFFF00' },
    { nombre: 'Verde', valor: 100000, color: '#008000' },
    { nombre: 'Azul', valor: 1000000, color: '#0000FF' },
    { nombre: 'Violeta', valor: 10000000, color: '#EE82EE' },
    { nombre: 'Gris', valor: 100000000, color: '#808080' },
    { nombre: 'Blanco', valor: 1000000000, color: '#FFFFFF' },
    { nombre: 'Oro', valor: 0.1, color: '#FFD700' },
    { nombre: 'Plata', valor: 0.01, color: '#C0C0C0' },
  ],
  tolerancia: [
    { nombre: 'Marrón', valor: 1, color: '#8B4513' },
    { nombre: 'Rojo', valor: 2, color: '#FF0000' },
    { nombre: 'Verde', valor: 0.5, color: '#008000' },
    { nombre: 'Azul', valor: 0.25, color: '#0000FF' },
    { nombre: 'Violeta', valor: 0.1, color: '#EE82EE' },
    { nombre: 'Gris', valor: 0.05, color: '#808080' },
    { nombre: 'Oro', valor: 5, color: '#FFD700' },
    { nombre: 'Plata', valor: 10, color: '#C0C0C0' },
  ],
};

function App() {
  const [bandas, setBandas] = useState({
    banda1: coloresBandas.banda1[0].valor,
    banda2: coloresBandas.banda2[0].valor,
    multiplicador: coloresBandas.multiplicador[0].valor,
    tolerancia: coloresBandas.tolerancia[0].valor,
  });

  const getColor = (bandaName, valor) => {
    return coloresBandas[bandaName].find(color => color.valor === valor)?.color || '#FFFFFF';
  };

  const calcularResistencia = () => {
    const valorOhmico = (bandas.banda1 * 10 + bandas.banda2) * bandas.multiplicador;
    const tolerancia = (valorOhmico * bandas.tolerancia) / 100;
    return {
      valor: valorOhmico,
      tolerancia: `±${bandas.tolerancia}%`,
      rango: `${valorOhmico - tolerancia} Ω a ${valorOhmico + tolerancia} Ω`,
    };
  };

  const resistencia = calcularResistencia();

  const handleCambio = (e) => {
    const { name, value } = e.target;
    setBandas((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  return (
    <div className="App">
      <h1>Calculadora de Resistencia</h1>
      <div className="resistor-body">
        <div className="bandas-container">
          <div className="banda1" style={{ backgroundColor: getColor('banda1', bandas.banda1) }}></div>
          <div className="banda2" style={{ backgroundColor: getColor('banda2', bandas.banda2) }}></div>
          <div className="multiplicador" style={{ backgroundColor: getColor('multiplicador', bandas.multiplicador) }}></div>
          <div className="tolerancia" style={{ backgroundColor: getColor('tolerancia', bandas.tolerancia) }}></div>
        </div>
      </div>

      <div className="resistor-image-container">
  <img src="https://sc-b.digikeyassets.com/-/media/Images/Marketing/Resources/Calculator/resistor-color-chart.png?la=en&ts=4db603f5-4e9b-4759-84b7-21a04d18b1a8" alt="Resistor con bandas de colores" />
</div>

      <div className="controles">
        <div className="banda">
          <label htmlFor="banda1">Banda 1:</label>
          <select name="banda1" id="banda1" onChange={handleCambio} value={bandas.banda1}>
            {coloresBandas.banda1.map((color) => (
              <option key={color.nombre} value={color.valor}>
                {color.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="banda">
          <label htmlFor="banda2">Banda 2:</label>
          <select name="banda2" id="banda2" onChange={handleCambio} value={bandas.banda2}>
            {coloresBandas.banda2.map((color) => (
              <option key={color.nombre} value={color.valor}>
                {color.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="banda">
          <label htmlFor="multiplicador">Multiplicador:</label>
          <select name="multiplicador" id="multiplicador" onChange={handleCambio} value={bandas.multiplicador}>
            {coloresBandas.multiplicador.map((color) => (
              <option key={color.nombre} value={color.valor}>
                {color.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="banda">
          <label htmlFor="tolerancia">Tolerancia:</label>
          <select name="tolerancia" id="tolerancia" onChange={handleCambio} value={bandas.tolerancia}>
            {coloresBandas.tolerancia.map((color) => (
              <option key={color.nombre} value={color.valor}>
                {color.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="resultado">
        <h2>Valor de Resistencia:</h2>
        <p>Valor: {resistencia.valor} Ω</p>
        <p>Tolerancia: {resistencia.tolerancia}</p>
        <p>Rango: {resistencia.rango}</p>
      </div>
    </div>
  );
}

export default App;