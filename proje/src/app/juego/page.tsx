"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import RegistroUsuarios from "../registre/page";

function obtenerIdsAleatorios(cantidad: number): number[] {
  const ids: number[] = [];
  for (let i = 0; i < cantidad; i++) {
    const id = Math.floor(Math.random() * 150) + 1;
    ids.push(id);
  }
  return ids;
}

async function cargarPokemons(ids: number[]) {
  const peticiones = ids.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
  );
  const resultados = await Promise.all(peticiones);

  return resultados.map((p) => ({
    nombre: p.name,
    img: p.sprites.front_default,
  }));
}

const Tarjeta = ({
  img,
  girada,
  onClick,
}: {
  img: string;
  girada: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="bg-white border rounded shadow cursor-pointer flex items-center justify-center h-32"
  >
    {girada ? (
      <img src={img} alt="tarjeta" className="w-full h-full object-contain" />
    ) : (
      <div className="text-3xl">PRUEBA SUERTE!</div>
    )}
  </div>
);

export default function Juego() {
  const cantidad = 4;
  const [tarjetas, setTarjetas] = useState<any[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clicksPorTarjeta, setClicksPorTarjeta] = useState<number[]>([]);
  const [paresEncontrados, setParesEncontrados] = useState(0);
  const [bloquearTablero, setBloquearTablero] = useState(false);
  const [tiempo, setTiempo] = useState(20);

  useEffect(() => {
    const iniciarJuego = async () => {
      const ids = obtenerIdsAleatorios(cantidad);
      const pokemons = await cargarPokemons(ids);
      const cartas = [...pokemons, ...pokemons]
        .map((p, i) => ({ ...p, id: i, girada: false, emparejada: false }))
        .sort(() => Math.random() - 0.5);

      setTarjetas(cartas);
      setClicksPorTarjeta(Array(cartas.length).fill(0));
      setSeleccionadas([]);
      setTotalClicks(0);
      setParesEncontrados(0);
      setTiempo(20);
    };

    iniciarJuego();
  }, []);

  useEffect(() => {
    if (tiempo === 0) return;
    const intervalo = setInterval(() => {
      setTiempo((prev) => prev - 1);
    }, 1000);
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

    const clicksTarjeta = [...clicksPorTarjeta];
    clicksTarjeta[index]++;
    setClicksPorTarjeta(clicksTarjeta);

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
        Tiempo restante: <strong>{tiempo}s</strong> | Clics:{" "}
        <strong>{totalClicks}</strong> | Pares encontrados:{" "}
        <strong>{paresEncontrados}</strong>
      </div>

      {tiempo === 0 && (
        <p className="text-center text-red-500 font-semibold mt-4">
          ¡Tiempo agotado!
        </p>
      )}

      {paresEncontrados === cantidad && (
        <p className="text-center text-green-600 font-semibold mt-4">
          ¡Has ganado!
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 mt-6">
        {tarjetas.map((tarjeta, index) => (
          <div key={tarjeta.id} className="flex flex-col items-center">
            <Tarjeta
              img={tarjeta.img}
              girada={tarjeta.girada || tarjeta.emparejada}
              onClick={() => manejarClickTarjeta(index)}
            />
            <p className="mt-1 text-sm text-gray-700">
              Clicks: {clicksPorTarjeta[index]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}