"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

type TarjetaPokemon = {
  id: number;
  nombre: string;
  img: string;
  girada: boolean;
  emparejada: boolean;
};

type JuegoContext = {
  tarjetas: TarjetaPokemon[];
  seleccionadas: number[];
  tiempo: number;
  totalClicks: number;
  clicksPorTarjeta: number[];
  paresEncontrados: number;
  bloquearTablero: boolean;
  manejarClickTarjeta: (index: number) => void;
};

export const JuegoContext = createContext<JuegoContext | undefined>(undefined);

const obtenerIdsAleatorios = (cantidad: number): number[] => {
  return Array.from({ length: cantidad }, () => Math.floor(Math.random() * 150) + 1);
};

const cargarPokemons = async (ids: number[]) => {
  const resultados = await Promise.all(
    ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()))
  );

  return resultados.map((p: any) => ({
    nombre: p.name,
    img: p.sprites.front_default,
  }));
};

export const JuegoProvider = ({ children }: { children: ReactNode }) => {
  const cantidad = 4;
  const [tarjetas, setTarjetas] = useState<TarjetaPokemon[]>([]);
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
      const cartas: TarjetaPokemon[] = [...pokemons, ...pokemons]
        .map((p, i) => ({
          ...p,
          id: i,
          girada: false,
          emparejada: false,
        }))
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
    if (bloquearTablero || tarjetas[index].girada || tarjetas[index].emparejada || seleccionadas.length === 2)
      return;

    const nuevasClicks = [...clicksPorTarjeta];
    nuevasClicks[index]++;
    setClicksPorTarjeta(nuevasClicks);

    const nuevas = [...tarjetas];
    nuevas[index].girada = true;
    setTarjetas(nuevas);
    setSeleccionadas((prev) => [...prev, index]);
    setTotalClicks((c) => c + 1);
  };

  return (
    <JuegoContext.Provider
      value={{
        tarjetas,
        seleccionadas,
        tiempo,
        totalClicks,
        clicksPorTarjeta,
        paresEncontrados,
        bloquearTablero,
        manejarClickTarjeta,
      }}
    >
      {children}
    </JuegoContext.Provider>
  );
};