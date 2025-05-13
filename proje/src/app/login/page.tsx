"use client";
import React, { useState } from 'react';

const LoginUsuarios = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nombre || !contraseña) {
      setMensaje('CAMPOS INCOMPLETOS');
      return;
    }

    const usuariosLogin = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioExistenteLogin = usuariosLogin.find(
      (usuario: { nombre: string; contraseña: string }) =>
        usuario.nombre === nombre && usuario.contraseña === contraseña
    );
    console.log(usuariosLogin);

    if (usuarioExistenteLogin) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuarioExistenteLogin));

      setMensaje('Usuario iniciado correctamente!');
    } else {
      setMensaje('Nombre de usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Inicio de Sesión</h2>
      <form onSubmit={manejarLogin} className="space-y-4">
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
          Iniciar Sesión
        </button>
      </form>

      {mensaje && (
        <p className="mt-4 text-green-600 text-center font-medium">{mensaje}</p>
      )}
    </div>
  );
};

export default LoginUsuarios;