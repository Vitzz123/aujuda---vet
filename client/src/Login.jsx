import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    
    try {
      // Faz a requisição para o servidor
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se o login der certo, salva no localStorage
        localStorage.setItem('usuarioLogado', data.token);
        onLogin(true); // Liberar a tranca do login
      } else {
        // Mensagem de erro de login
        setErro(data.error || 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      setErro('Erro ao tentar conectar com o servidor. Verifique se ele está rodando.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h2>Acesso ao Sistema - AUJUDA</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' }}>
        <input 
          type="email" 
          placeholder="E-mail (ex: admin@email.com)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Senha (ex: 123456)" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>

      {erro && <p style={{ color: 'red', marginTop: '15px' }}>{erro}</p>}
    </div>
  );
}