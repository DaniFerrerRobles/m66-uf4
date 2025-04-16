import Header from '../components/Header';

const Acerca = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
            <Header />

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Acerca de</h1>
                <p className="mb-4 text-center">
                    Hola! Soy Dani Ferrer, estudiante de DAW. Esta aplicación es un proyecto realizado con Next.js, es el juego del Memory.
                    El objetivo principal es poner en práctica conocimientos de Next JS, con Tailwind CSS y navegación entre páginas.
                </p>
            </div>
        </div>
    );
};

export default Acerca;