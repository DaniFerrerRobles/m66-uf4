'use client';
import React from 'react';

const RegistroUsuarios = () => {
  const manejarRegistro = (e: React.FormEvent) => {
    e.preventDefault();

    const nombreInput = document.querySelector('#nombre') as HTMLInputElement | null;
    const contrasenaInput = document.querySelector('#contraseña') as HTMLInputElement | null;
    const mensaje = document.querySelector('#mensaje') as HTMLParagraphElement | null;

    if (nombre && contrasena) {
      const nuevoUsuario = { id: Date.now().toString(), nombre, contrasena };

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      if (mensaje) mensaje.textContent = '¡Usuario registrado con éxito!';

      if (nombreInput) nombreInput.value = '';
      if (contrasenaInput) contrasenaInput.value = '';
    } else {
      if (mensaje) mensaje.textContent = 'Faltan campos por rellenar';
    }
  };

  return (
    <div>
      <h2>Registro de Usuarios</h2>
      <form onSubmit={manejarRegistro}>
        <div>
          <label>Nombre:</label>
          <input id="nombre" type="text" placeholder="Nombre" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input id="contraseña" type="password" placeholder="Contraseña" required />
        </div>
        <button type="submit">Registrar</button>
      </form>

      <p id="mensaje"></p>
    </div>
  );
};

export default RegistroUsuarios;