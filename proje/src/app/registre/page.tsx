"use client";
import React, { useState } from 'react';

const RegistroUsuarios = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarRegistro = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nombre || !contraseña) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    const usuariosRegistro = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioExistenteRegistro = usuariosRegistro.find((usuario: { nombre: string }) => usuario.nombre === nombre);

    if (usuarioExistenteRegistro) {
      setMensaje('El nombre de usuario ya está registrado.');
      return;
    }

    usuariosRegistro.push({nombre, contraseña});
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistro));

    setMensaje('Registrado!');
    setNombre('');
    setContraseña('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Usuario</h2>
      <form onSubmit={manejarRegistro} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Usuario:</label>
          <input
            type="text"
            placeholder="Introduce tu nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Contraseña:</label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          Registrar
        </button>
      </form>

      {mensaje && (
        <p className="mt-4 text-green-600 text-center font-medium">{mensaje}</p>
      )}
    </div>
  );
};

export default RegistroUsuarios;