// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Usuario = {
  nombre: string;
  contraseña: string;
};

type AuthContextType = {
  usuarios: Usuario[];
  usuarioActivo: Usuario | null;
  registrarUsuario: (nuevoUsuario: Usuario) => string;
  iniciarSesion: (nombre: string, contraseña: string) => string;
  cerrarSesion: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);

  useEffect(() => {
    const datos = localStorage.getItem("usuarios");
    if (datos) setUsuarios(JSON.parse(datos));

    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    if (usuarioGuardado) setUsuarioActivo(JSON.parse(usuarioGuardado));
  }, []);

  const registrarUsuario = (nuevoUsuario: Usuario): string => {
    const existe = usuarios.some((u) => u.nombre === nuevoUsuario.nombre);
    if (existe) return "El usuario ya existe";

    const actualizados = [...usuarios, nuevoUsuario];
    setUsuarios(actualizados);
    localStorage.setItem("usuarios", JSON.stringify(actualizados));
    return "¡Registrado!";
  };

  const iniciarSesion = (nombre: string, contraseña: string): string => {
    const usuario = usuarios.find(
      (u) => u.nombre === nombre && u.contraseña === contraseña
    );
    if (!usuario) return "Nombre de usuario o contraseña incorrectos.";

    setUsuarioActivo(usuario);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    return "Usuario iniciado correctamente!";
  };

  const cerrarSesion = () => {
    setUsuarioActivo(null);
    localStorage.removeItem("usuarioActivo");
  };

  return (
    <AuthContext.Provider
      value={{ usuarios, usuarioActivo, registrarUsuario, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth se usa dentro de AuthProvider");
  return context;
}