import React, { useState, useEffect } from 'react';

export default function Relatorio() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    // Puxa os dados
    const consultas = JSON.parse(localStorage.getItem('listaClinicaConsultas')) || [];
    const pets = JSON.parse(localStorage.getItem('listaClinicaPets')) || [];
    const funcs = JSON.parse(localStorage.getItem('listaClinicaFuncsV2')) || [];


    const dadosCruzados = consultas.map(consulta => {
      // Encontra o pet e o funcionário pelo ID
      const pet = pets.find(p => p.id === consulta.petId);
      const medico = funcs.find(f => f.id === consulta.funcId);

      return {
        id: consulta.id,
        data: consulta.data,
        nomePet: pet ? pet.nome : 'Registro Excluído',
        tipoPet: pet ? pet.tipo : '-',
        medicoResponsavel: medico ? medico.nome : 'Sem registro',
        diagnostico: consulta.doenca,
        procedimento: consulta.tratamento
      };
    });

    // Salva no estado para exibir na tela
    setRelatorio(dadosCruzados);
  }, []);

  return (
    <div>
      <h3>Prontuários e Histórico Clínico</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Paciente</th>
            <th>Tipo</th>
            <th>Profissional</th>
            <th>Diagnóstico</th>
            <th>Tratamento/Procedimento</th>
          </tr>
        </thead>
        <tbody>
          {relatorio.length > 0 ? (
            relatorio.map(item => (
              <tr key={item.id}>
                <td>{item.data}</td>
                <td><strong>{item.nomePet}</strong></td>
                <td>{item.tipoPet}</td>
                <td>{item.medicoResponsavel}</td>
                <td>{item.diagnostico}</td>
                <td>{item.procedimento}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum atendimento registrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}