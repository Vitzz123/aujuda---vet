import React, { useState, useEffect } from 'react';

export default function Consultas() {
  const [consultas, setConsultas] = useState([]);
  const [pets, setPets] = useState([]);
  const [funcs, setFuncs] = useState([]);
  const [form, setForm] = useState({ id: null, petId: '', funcId: '', doencaSelect: '', doencaOutro: '', tratSelect: '', tratOutro: '' });

  useEffect(() => {
    // Busca as listas atualizadas do localStorage
    setPets(JSON.parse(localStorage.getItem('listaClinicaPets')) || []);
    setFuncs(JSON.parse(localStorage.getItem('listaClinicaFuncsV2')) || []);
    setConsultas(JSON.parse(localStorage.getItem('listaClinicaConsultas')) || []);
  }, []);

  const salvar = (lista) => {
    setConsultas(lista);
    localStorage.setItem('listaClinicaConsultas', JSON.stringify(lista));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pega o valor do campo "Outro" se ele for selecionado
    const doencaFinal = form.doencaSelect === 'Outro' ? form.doencaOutro : form.doencaSelect;
    const tratFinal = form.tratSelect === 'Outro' ? form.tratOutro : form.tratSelect;
    // Obrigatioriedade de preenchimento
    if (!form.petId || !form.funcId || !doencaFinal || !tratFinal) {
      return alert("Preencha todos os campos da consulta!");
    }

    // JSON da nova consulta
    const novaConsulta = {
      id: form.id || Date.now(),
      data: new Date().toLocaleDateString(),
      petId: Number(form.petId),
      funcId: Number(form.funcId),
      doenca: doencaFinal,
      tratamento: tratFinal
    };

    // Se o ID não for passado cria uma nova.
    if (form.id) {
      salvar(consultas.map(c => c.id === form.id ? novaConsulta : c));
    } else {
      salvar([...consultas, novaConsulta]);
    }
    
    // Limpa o formulário após salvar
    setForm({ id: null, petId: '', funcId: '', doencaSelect: '', doencaOutro: '', tratSelect: '', tratOutro: '' });
  };

  return (
    <div>
      <h3>Registro de Consultas</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        
        {/* Select de Animais */}
        <select value={form.petId} onChange={e => setForm({...form, petId: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cceeee' }}>
          <option value="">Paciente (Animal)...</option>
          {pets.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        
        {/* Select de Funcionários */}
        <select value={form.funcId} onChange={e => setForm({...form, funcId: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cceeee' }}>
          <option value="">Profissional Responsável...</option>
          {funcs.map(f => <option key={f.id} value={f.id}>{f.nome} - {f.cargo}</option>)}
        </select>

        {/* Select de Doenças */}
        <select value={form.doencaSelect} onChange={e => setForm({...form, doencaSelect: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cceeee' }}>
          <option value="">Diagnóstico...</option>
          <option value="Virose">Virose</option>
          <option value="Fratura">Fratura</option>
          <option value="Infecção Intestinal">Infecção Intestinal</option>
          <option value="Rotina/Checkup">Rotina/Checkup</option>
          <option value="Outro">Outro (Digitar)</option>
        </select>
        {form.doencaSelect === 'Outro' && <input type="text" placeholder="Qual doença?" value={form.doencaOutro} onChange={e => setForm({...form, doencaOutro: e.target.value})} />}

        {/* Select de Tratamentos */}
        <select value={form.tratSelect} onChange={e => setForm({...form, tratSelect: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cceeee' }}>
          <option value="">Tratamento...</option>
          <option value="Vacinação">Vacinação</option>
          <option value="Cirurgia">Cirurgia</option>
          <option value="Antibióticos">Antibióticos</option>
          <option value="Outro">Outro (Digitar)</option>
        </select>
        {form.tratSelect === 'Outro' && <input type="text" placeholder="Qual tratamento?" value={form.tratOutro} onChange={e => setForm({...form, tratOutro: e.target.value})} />}

        <button type="submit">{form.id ? 'Atualizar' : 'Registrar'}</button>
      </form>

      {/* Tabela de exibição rápida */}
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>ID Pet</th>
            <th>Diagnóstico</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map(c => (
            <tr key={c.id}>
              <td>{c.data}</td>
              <td>#{c.petId}</td>
              <td>{c.doenca}</td>
              <td>
                <button onClick={() => salvar(consultas.filter(x => x.id !== c.id))} style={{backgroundColor: '#ff8787'}}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 