import Header from '../components/Header';

const GrupoTarjetas = [
  { nombre: "pokemon1", img: "/pokemon1.jpg" },
  { nombre: "pokemon2", img: "/pokemon2.jpeg" },
  { nombre: "pokemon3", img: "/pokemon3.png" },
  { nombre: "pokemon4", img: "/pokemon4.png" },
  { nombre: "pokemon2", img: "/pokemon2.jpeg" },
  { nombre: "pokemon4", img: "/pokemon4.png" },
  { nombre: "pokemon3", img: "/pokemon3.png" },
  { nombre: "pokemon1", img: "/pokemon1.jpg" },
];

const Tarjeta = ({ nombre, img }: { nombre: string; img: string }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <img src={img} alt={nombre} className="w-full h-32 object-contain mb-2" />
    </div>
  );
};

const Juego = () => {
  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold text-center mt-4">Juego</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
        {GrupoTarjetas.map((tarjeta, index) => (
          <Tarjeta key={index} nombre={tarjeta.nombre} img={tarjeta.img} />
        ))}
      </div>
    </div>
  );
};

export default Juego;