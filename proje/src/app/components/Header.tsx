"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [usuarioActivo, setUsuarioActivo] = useState<string | null>(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo") || "null");
    if (usuario && usuario.nombre) {
      setUsuarioActivo(usuario.nombre);
    }
  }, []);

  const manejarLogout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuarioActivo(null);
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <nav className="space-x-6">
            <Link
              href="/home"
              className="text-white hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/juego"
              className="text-white hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              Juego
            </Link>
            <Link
              href="/acercaDe"
              className="text-white hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              Acerca de
            </Link>
            <Link
              href="/registre"
              className="text-white hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              Regístrate!
            </Link>
            <Link
              href="/login"
              className="text-white hover:text-indigo-400 transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Sesión
            </Link>
          </nav>

          {usuarioActivo ? (
            <div className="flex items-center">
              <span className="text-white font-semibold mr-4">
                Bienvenido, {usuarioActivo}
              </span>
              <button
                onClick={manejarLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
              >
                Cerrar sesión
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}