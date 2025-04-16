"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";

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

const Tarjeta = ({img, girada, onClick,}:{img: string; girada: boolean; onClick: () => void;}) => (
  <div onClick={onClick} className="bg-white border rounded shadow cursor-pointer flex items-center justify-center h-32" >
    {girada ? (
      <img src={img} alt="tarjeta" className="w-full h-full object-contain" />
    ) : (
      <div className="text-3xl">PRUEBA SUERTE!</div>
    )}
  </div>
);

export default function Juego() {
  const tarjetasIniciales = GrupoTarjetas.map((t, i) => ({...t, id: i, girada: false, emparejada: false,}));

  const [tarjetas, setTarjetas] = useState(tarjetasIniciales);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [paresEncontrados, setParesEncontrados] = useState(0);
  const [bloquearTablero, setBloquearTablero] = useState(false);
  const [tiempo, setTiempo] = useState(20);

  useEffect(() => {
    if (tiempo === 0) return;
    const intervalo = setInterval(() => {setTiempo((-1))})
    return () => clearInterval(intervalo);
  }, [tiempo]);

  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [i1, i2] = seleccionadas;
      const nuevaLista = [...tarjetas];
      setBloquearTablero(true);

      if (nuevaLista[i1].nombre === nuevaLista[i2].nombre) {
        nuevaLista[i1].emparejada = true;
        nuevaLista[i2].emparejada = true;
        setParesEncontrados((p) => p + 1);
        setTimeout(() => {
          setSeleccionadas([]);
          setTarjetas(nuevaLista);
          setBloquearTablero(false);
        }, 500);
      } else {
        setTimeout(() => {
          nuevaLista[i1].girada = false;
          nuevaLista[i2].girada = false;
          setSeleccionadas([]);
          setTarjetas(nuevaLista);
          setBloquearTablero(false);
        }, 1000);
      }
    }
  }, [seleccionadas]);

  const manejarClickTarjeta = (index: number) => {
    if (bloquearTablero) return;
    if (tarjetas[index].girada || tarjetas[index].emparejada) return;
    if (seleccionadas.length === 2) return;

    const nuevas = [...tarjetas];
    nuevas[index].girada = true;
    setTarjetas(nuevas);
    setSeleccionadas([...seleccionadas, index]);
    setTotalClicks((c) => c + 1);
  };

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold text-center mt-4">Juego de Memoria</h1>
      <div className="text-center mt-2">
        Tiempo restante: <strong>{tiempo}s</strong> |  Clics: <strong>{totalClicks}</strong> | Pares encontrados: <strong>{paresEncontrados}</strong>
      </div>

      {tiempo === 0 && (
        <p className="text-center text-red-500 font-semibold mt-4">Tiempo agotado!</p>
      )}

      {paresEncontrados === GrupoTarjetas.length / 2 && (
        <p className="text-center text-green-600 font-semibold mt-4">Has ganado!</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 mt-6">
        {tarjetas.map((tarjeta, index) => (
          <Tarjeta key={tarjeta.id} img={tarjeta.img} girada={tarjeta.girada || tarjeta.emparejada} onClick={() => manejarClickTarjeta(index)}/>
        ))}
      </div>
    </div>
  );
}