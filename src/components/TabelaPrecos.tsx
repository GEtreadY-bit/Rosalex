import React from "react";


const TabelaPrecos: React.FC = () => {
  const tabela = [
    { ano: "1ª", total: "8.451,80", psicopedagogico: true },
    { ano: "2ª", total: "8.451,80", psicopedagogico: true },
    { ano: "3ª", total: "8.451,80", ingles: true, psicopedagogico: true },
    { ano: "4ª", total: "10.451,80", ingles: true, psicopedagogico: true },
    { ano: "5ª", total: "10.451,80", caligrafia: true, ingles: true, info: true, psicopedagogico: true },
    { ano: "6ª", total: "13.055,50", ingles: true, caligrafia: true, info: true, psicopedagogico: true },
    { ano: "7ª", total: "13.055,50", caligrafia: true, info: true, psicopedagogico: true },
    { ano: "8ª", total: "13.055,50", caligrafia: true, info: true, psicopedagogico: true },
    { ano: "9ª", total: "13.055,50", caligrafia: true, info: true, psicopedagogico: true },
  ];
  const custos = [
    { nome: "Confirmação", valor: "5.000,00" },
    { nome: "Matrícula", valor: "6.000,00" },
    { nome: "Cartão Escolar", valor: "1.000,00" },
    { nome: "Transferência", valor: "2.500,00" },
  ];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-rosalex-brown-200 animate-fade-in">
        <h2 className="text-2xl font-bold text-rosalex-brown-800 mb-6 text-center">Tabela de Preços por Classe</h2>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm text-center rounded-lg overflow-hidden">
            <thead className="bg-rosalex-brown-100">
              <tr>
                <th className="px-2 py-2 font-semibold text-rosalex-brown-700 whitespace-nowrap">Ano</th>
                <th className="px-2 py-2 font-semibold text-rosalex-accent-blue whitespace-nowrap">Inglês</th>
                <th className="px-2 py-2 font-semibold text-rosalex-accent-orange whitespace-nowrap">Caligrafia</th>
                <th className="px-2 py-2 font-semibold text-rosalex-accent-green whitespace-nowrap">Informática</th>
                <th className="px-2 py-2 font-semibold text-rosalex-accent-pink whitespace-nowrap">Acomp. Psicopedagógico</th>
              </tr>
            </thead>
            <tbody>
              {tabela.map((linha, index) => (
                <tr key={index} className="hover:bg-rosalex-brown-50 transition">
                  <td className="px-4 py-2 font-bold text-rosalex-brown-700 border-b">{linha.ano}</td>
                  <td className={`px-4 py-2 border-b ${linha.ingles ? 'bg-rosalex-accent-blue/20 text-rosalex-accent-blue font-semibold rounded' : ''}`}>{linha.ingles ? '✔' : ''}</td>
                  <td className={`px-4 py-2 border-b ${linha.caligrafia ? 'bg-rosalex-accent-orange/20 text-rosalex-accent-orange font-semibold rounded' : ''}`}>{linha.caligrafia ? '✔' : ''}</td>
                  <td className={`px-4 py-2 border-b ${linha.info ? 'bg-rosalex-accent-green/20 text-rosalex-accent-green font-semibold rounded' : ''}`}>{linha.info ? '✔' : ''}</td>
                  <td className={`px-4 py-2 border-b ${linha.psicopedagogico ? 'bg-rosalex-accent-pink/20 text-rosalex-accent-pink font-semibold rounded' : ''}`}>{linha.psicopedagogico ? '✔' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          {/* Segunda tabela removida */}
    </div>
  );
};

export default TabelaPrecos;
