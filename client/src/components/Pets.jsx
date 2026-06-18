import React, { useState, useEffect } from 'react';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', especieSelect: '', especieOutro: '', foto: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('listaClinicaPets')) || [];
    setPets(dadosSalvos);
  }, []);

  const salvar = (novaLista) => {
    setPets(novaLista);
    localStorage.setItem('listaClinicaPets', JSON.stringify(novaLista));
  };

  // Automação: Define se é exótico ou doméstico sem o usuário digitar
  const classificarTipo = (especie) => {
    const domesticos = ['Cachorro', 'Gato'];
    return domesticos.includes(especie) ? 'Doméstico' : 'Exótico';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const especieFinal = form.especieSelect === 'Outro' ? form.especieOutro : form.especieSelect;

    if (!form.nome || !especieFinal) {
      setErro("⚠️ Preencha o nome e a espécie do animal!");
      return;
    }

    const novoPet = {
      id: form.id || Date.now(),
      nome: form.nome,
      especie: especieFinal,
      tipo: classificarTipo(form.especieSelect), // Salva o tipo automaticamente
      foto: form.foto
    };

    if (form.id) {
      salvar(pets.map(p => p.id === form.id ? novoPet : p));
    } else {
      salvar([...pets, novoPet]);
    }
    setForm({ id: null, nome: '', especieSelect: '', especieOutro: '', foto: '' });
    setErro('');
  };

  const deletar = (id) => {
    // Alerta de confirmação solicitado
    if (window.confirm("🚨 TEM CERTEZA? Ao clicar em OK, este animal será apagado do sistema para sempre.")) {
      salvar(pets.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h3>Pacientes (Animais)</h3>
      {erro && <p style={{ color: '#ff4c4c', fontWeight: 'bold' }}>{erro}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Nome do Animal" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
        
        <select value={form.especieSelect} onChange={e => setForm({...form, especieSelect: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cceeee' }}>
          <option value="">Selecione a Espécie...</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
          <option value="Ave">Ave</option>
          <option value="Roedor">Roedor</option>
          <option value="Réptil">Réptil</option>
          <option value="Outro">Outro (Digitar)</option>
        </select>

        {form.especieSelect === 'Outro' && (
          <input type="text" placeholder="Qual espécie?" value={form.especieOutro} onChange={e => setForm({...form, especieOutro: e.target.value})} />
        )}

        <input type="text" placeholder="URL da Foto (opcional)" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} />
        <button type="submit">{form.id ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <table>
        <thead><tr><th>Foto</th><th>Nome</th><th>Espécie</th><th>Classificação</th><th>Ações</th></tr></thead>
        <tbody>
          {pets.map(p => (
            <tr key={p.id}>
              <td>{p.foto ? <img src={p.foto} alt="pet" style={{ width: '40px', borderRadius: '50%' }}/> : '🐾'}</td>
              <td>{p.nome}</td>
              <td>{p.especie}</td>
              <td><strong>{p.tipo}</strong></td> {/* Gerado automaticamente */}
              <td>
                <button onClick={() => setForm({...p, especieSelect: 'Outro', especieOutro: p.especie})}>Editar</button>
                <button onClick={() => deletar(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}