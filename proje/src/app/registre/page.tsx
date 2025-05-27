"use client";
import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const RegistroUsuarios = () => {
  const { registrarUsuario } = useAuth();
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarRegistro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !contraseña) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    const resultado = registrarUsuario({ nombre, contraseña });
    setMensaje(resultado);

    if (resultado === "Registrado!") {
      setNombre("");
      setContraseña("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h2>
      <form onSubmit={manejarRegistro} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Usuario:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl"
        >
          Registrar
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center text-green-600">{mensaje}</p>}
    </div>
  );
};

export default RegistroUsuarios;