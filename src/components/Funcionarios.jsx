import React, { useState, useEffect } from 'react';

const LinhaFunc = ({ func, onEdit, onDelete }) => (
  <tr>
    <td>{func.nome}</td>
    <td>{func.cargo}</td>
    <td>
      <button onClick={() => onEdit(func)}>Editar</button>
      <button onClick={() => onDelete(func.id)}>Excluir</button>
    </td>
  </tr>
);

export default function Funcionarios() {
  const [funcs, setFuncs] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', cargoSelect: '', cargoOutro: '' });

  // Popula com dados iniciais para não parecer que o arquivo está faltando
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem('listaClinicaFuncsV2'));
    if (dadosSalvos && dadosSalvos.length > 0) {
      setFuncs(dadosSalvos);
    } else {
      const equipeInicial = [
        { id: 201, nome: 'Dra. Ana Silva', cargo: 'Veterinário(a)' },
        { id: 202, nome: 'Carlos Souza', cargo: 'Enfermeiro(a)' },
        { id: 203, nome: 'Beatriz Costa', cargo: 'Recepção' }
      ];
      setFuncs(equipeInicial);
      localStorage.setItem('listaClinicaFuncsV2', JSON.stringify(equipeInicial));
    }
  }, []);

  const salvar = (lista) => {
    setFuncs(lista);
    localStorage.setItem('listaClinicaFuncsV2', JSON.stringify(lista));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cargoFinal = form.cargoSelect === 'Outro' ? form.cargoOutro : form.cargoSelect;

    if (!form.nome || !cargoFinal) {
      alert("⚠️ Preencha o nome e o cargo do funcionário!");
      return;
    }

    const novoFunc = { id: form.id || Date.now(), nome: form.nome, cargo: cargoFinal };

    if (form.id) {
      salvar(funcs.map(f => f.id === form.id ? novoFunc : f));
    } else {
      salvar([...funcs, novoFunc]);
    }
    setForm({ id: null, nome: '', cargoSelect: '', cargoOutro: '' });
  };

  const deletar = (id) => {
    if (window.confirm("🚨 TEM CERTEZA? O funcionário será apagado e não poderá ser selecionado em novas consultas.")) {
      salvar(funcs.filter(f => f.id !== id));
    }
  };

  return (
    <div>
      <h3>Equipe Veterinária</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" placeholder="Nome do Funcionário" value={form.nome} 
          onChange={e => setForm({...form, nome: e.target.value})} 
        />
        
        <select value={form.cargoSelect} onChange={e => setForm({...form, cargoSelect: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cceeee' }}>
          <option value="">Selecione o Cargo...</option>
          <option value="Veterinário(a)">Veterinário(a)</option>
          <option value="Enfermeiro(a)">Enfermeiro(a)</option>
          <option value="Recepção">Recepção</option>
          <option value="Outro">Outro (Digitar)</option>
        </select>

        {form.cargoSelect === 'Outro' && (
          <input 
            type="text" placeholder="Qual cargo?" value={form.cargoOutro} 
            onChange={e => setForm({...form, cargoOutro: e.target.value})} 
          />
        )}

        <button type="submit">{form.id ? 'Atualizar' : 'Contratar'}</button>
      </form>
      <table>
        <thead><tr><th>Nome</th><th>Cargo</th><th>Ações</th></tr></thead>
        <tbody>
          {funcs.map(f => (
            <LinhaFunc 
              key={f.id} func={f} onDelete={deletar}
              onEdit={() => setForm({...f, cargoSelect: 'Outro', cargoOutro: f.cargo})} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}