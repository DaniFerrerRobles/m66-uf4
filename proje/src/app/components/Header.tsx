import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-center items-center">
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
          </nav>
        </div>
      </div>
    </header>
  );
}