import React, { useState, useEffect } from 'react';
import Login from './Login';
import Pets from './components/Pets';
import Funcionarios from './components/Funcionarios';
import Consultas from './components/Consultas';
import Relatorio from './components/Relatorio';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('pets'); // Define Pets como tela inicial após logar

  // Verifica se o usuário já está logado ao atualizar a página
  useEffect(() => {
    const user = localStorage.getItem('usuarioLogado');
    if (user) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setIsLoggedIn(false);
  };

  // A "Catraca": Se não estiver logado, mostra APENAS a tela de login
  if (!isLoggedIn) {
    // Passando o setIsLoggedIn diretamente para o Login.jsx
    return <Login onLogin={setIsLoggedIn} />;
  }

  // Se passou da catraca, renderiza o sistema completo
  return (
    <div className="app-container">
      <header style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
        <h1 style={{ margin: '0 0 15px 0' }}>AUJUDA - Clínica Veterinária</h1>
        
        <nav style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('funcionarios')} style={{ padding: '8px', cursor: 'pointer' }}>1. Funcionários</button>
          <button onClick={() => setActiveTab('pets')} style={{ padding: '8px', cursor: 'pointer' }}>2. Animais</button>
          <button onClick={() => setActiveTab('consultas')} style={{ padding: '8px', cursor: 'pointer' }}>3. Consultas Médicas</button>
          <button onClick={() => setActiveTab('relatorio')} style={{ padding: '8px', cursor: 'pointer' }}>4. Prontuários (JOIN)</button>
          
          <button 
            onClick={handleLogout} 
            style={{ 
              marginLeft: 'auto', 
              backgroundColor: '#ff4d4d', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Sair (Logout)
          </button>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        {activeTab === 'pets' && <Pets />}
        {activeTab === 'funcionarios' && <Funcionarios />}
        {activeTab === 'consultas' && <Consultas />}
        {activeTab === 'relatorio' && <Relatorio />}  
      </main>
    </div>
  );
}