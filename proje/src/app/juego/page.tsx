"use client";
import { useState } from 'react';
import Header from '../components/Header';

const GrupoTarjetas = [
  { nombre: "pokemon1", img: "/pokemon1.jpg" },
  { nombre: "pokemon2", img: "/pokemon2.jpeg" },
  { nombre: "pokemon3", img: "/pokemon3.png" },
  { nombre: "pokemon4", img: "/pokemon4.png" },
  { nombre: "pokemon2", img: "/pokemon2.jpeg" },
  { nombre: "pokemon4", img: "/pokemon4.png" },
  { nombre: "pokemon3", img: "/pokemon3.png" },
  { nombre: "pokemon1", img: "/pokemon1.jpg" },
];

const Tarjeta = ({nombre, img, onClick, clics,}:{nombre: string, img: string, onClick: () => void, clics: number}) => {
  return (
    <div onClick={onClick}><img src={img} alt={nombre} className="w-full h-32 object-contain mb-2"/>
      <p className="mt-2">Clics: {clics}</p>
    </div>
  );
};

const Juego = () => {
  const [totalClicks, setTotalClicks] = useState(0);

  const [clicsPorTarjeta, setClicsPorTarjeta] = useState(new Array(GrupoTarjetas.length).fill(0))

  const manejarClickTarjeta = (index: number) => {
    setTotalClicks(totalClicks + 1);

    const nuevosClics = [...clicsPorTarjeta];
    nuevosClics[index] += 1;
    setClicsPorTarjeta(nuevosClics);
  };

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold text-center mt-4">Juego</h1>
      <h2 className="text-center">Clics Totales: {totalClicks}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
        {GrupoTarjetas.map((tarjeta, index) => (
          <Tarjeta key={index} nombre={tarjeta.nombre} img={tarjeta.img} onClick={() => manejarClickTarjeta(index)} clics={clicsPorTarjeta[index]}/>
        ))}
      </div>
    </div>
  );
};

export default Juego;