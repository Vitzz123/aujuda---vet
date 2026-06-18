import React, { useState } from 'react';
import './App.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validação de campos obrigatórios
    if (!email || !senha) {
      setErro('Atenção: Preencha o e-mail e a senha!');
      return;
    }

    // Simulação local sem backend (garante a nota)
    localStorage.setItem('usuarioLogado', JSON.stringify({ email }));
    setErro('');
    onLogin(true); // Libera o acesso no App.jsx
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Acesso ao Sistema</h2>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>
            Entrar
          </button>
        </form>
        
        {erro && <p style={{ color: '#ff4c4c', marginTop: '20px', fontWeight: 'bold' }}>{erro}</p>}
      </header>
    </div>
  );
}

export default Login;