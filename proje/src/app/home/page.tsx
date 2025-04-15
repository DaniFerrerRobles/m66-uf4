import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <h1>Bienvenido a la Página Principal</h1>
            <p>Esta es la vista de inicio de la aplicación.</p>
        </div>
    );
};

export default Home;