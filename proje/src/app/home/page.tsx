import Header from '../components/Header';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
            <Header />

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Instrucciones del Juego del Memory
                </h1>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>Haz clic en una carta para voltearla.</li>
                    <li>Intenta encontrar la carta que coincide volteando otra.</li>
                    <li>Si las cartas coinciden, permanecerán volteadas.</li>
                    <li>Si no coinciden, se voltearán de nuevo.</li>
                    <li>Continúa hasta que todas las cartas estén emparejadas.</li>
                    <li>¡Intenta completar el juego con el menor número de movimientos posible!</li>
                </ol>
            </div>
        </div>
    );
};

export default Home;