import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-center text-slate-200">
        <h1 className="text-3xl font-semibold mb-2">Bem-vindo ao Sistema Aerocode</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Utilize o menu lateral para navegar entre as seções do sistema — como Aeronaves,
          Funcionários e Exportação de dados.
        </p>

        <div className="mt-6 text-slate-500 text-xs">
          <p>Versão: 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
