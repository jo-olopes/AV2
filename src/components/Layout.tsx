import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getStorage } from "../utils/localStorage";

const Layout: React.FC = () => {
  const [totalAeronaves, setTotalAeronaves] = useState(0);
  const [totalFuncionarios, setTotalFuncionarios] = useState(0);

  useEffect(() => {
    try {
      const aeronaves = getStorage("aeronaves", []);
      const funcionarios = getStorage("funcionarios", []);

      const listaAeronaves = Array.isArray(aeronaves) ? aeronaves : [];
      const listaFuncionarios = Array.isArray(funcionarios) ? funcionarios : [];

      setTotalAeronaves(listaAeronaves.length);
      setTotalFuncionarios(listaFuncionarios.length);
    } catch (error) {
      console.error("❌ Erro ao carregar dados do localStorage:", error);
    }
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* Conteúdo principal */}
        <main className="p-6 overflow-auto bg-slate-800">
          {/* Painel de resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-slate-900 rounded text-slate-200 shadow">
              <h4 className="text-sm text-slate-400">Total de Aeronaves</h4>
              <p className="text-2xl font-semibold mt-1">{totalAeronaves}</p>
            </div>
            <div className="p-4 bg-slate-900 rounded text-slate-200 shadow">
              <h4 className="text-sm text-slate-400">Funcionários</h4>
              <p className="text-2xl font-semibold mt-1">{totalFuncionarios}</p>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
