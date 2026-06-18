import React, { useState, useEffect } from 'react';
import Login from './Login';
import Pets from './components/Pets';
import Funcionarios from './components/Funcionarios';
import Consultas from './components/Consultas';
import Relatorio from './components/Relatorio';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('pets');

  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      <header>
        <h1>AUJUDA</h1>
        <nav>
          <button onClick={() => setActiveTab('funcionarios')}>1. Funcionários</button>
          <button onClick={() => setActiveTab('pets')}>2. Animais</button>
          <button onClick={() => setActiveTab('consultas')}>3. Consultas Médicas</button>
          <button onClick={() => setActiveTab('relatorio')}>4. Prontuários (JOIN)</button>
          <button onClick={handleLogout} style={{ marginLeft: 'auto', backgroundColor: '#ff4d4d', color: 'white' }}>
            Sair (Logout)
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'pets' && <Pets />}
        {activeTab === 'funcionarios' && <Funcionarios />}
        {activeTab === 'consultas' && <Consultas />}
        {activeTab === 'relatorio' && <Relatorio />}
      </main>
    </div>
  );
}