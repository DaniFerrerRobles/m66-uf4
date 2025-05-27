"use client";
import { useContext } from "react";
import Image from "next/image";
import Header from "../components/Header";
import { JuegoContext } from "./JuegoContext";
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
    className="bg-white border rounded shadow cursor-pointer flex items-center justify-center h-32 relative"
  >
    {girada ? (
      <Image
        src={img}
        alt="tarjeta"
        width={100}
        height={100}
        className="object-contain"
        sizes="(max-width: 768px) 100px, 200px"
      />
    ) : (
      <div className="text-3xl">PRUEBA SUERTE!</div>
    )}
  </div>
);

export default function Juego() {
  const contexto = useContext(JuegoContext);

  if (!contexto) return <p>no encontrado.</p>;

  const {
    tarjetas,
    tiempo,
    totalClicks,
    paresEncontrados,
    clicksPorTarjeta,
    manejarClickTarjeta,
  } = contexto;

  const cantidad = 4;

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