import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getStorage, setStorage } from "../utils/localStorage";
import type { Funcionario, Aeronave } from "../types";

const Funcionarios: React.FC = () => {
  const [funcs, setFuncs] = useState<Funcionario[]>(() => getStorage("funcionarios", []));
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(() => getStorage("aeronaves", []));
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState("");
  const [editCargo, setEditCargo] = useState("");

  // AtualizaLocal
  useEffect(() => {
    setStorage("funcionarios", funcs);
  }, [funcs]);
  useEffect(() => {
    setStorage("aeronaves", aeronaves);
  }, [aeronaves]);

  // ADDFunc
  const add = () => {
    if (!nome) return;
    const novo: Funcionario = { id: uuidv4(), nome, cargo, aeronavesIds: [] };
    setFuncs(prev => [novo, ...prev]);
    setNome("");
    setCargo("");
  };

  //remove funcionario aeronave
  const remove = (id: string) => {
    const funcionario = funcs.find(f => f.id === id);
    if (funcionario) {
      const atualizadas = aeronaves.map(a =>
        a.funcionariosIds.includes(id)
          ? { ...a, funcionariosIds: a.funcionariosIds.filter(fid => fid !== id) }
          : a
      );
      setAeronaves(atualizadas);
    }
    setFuncs(prev => prev.filter(f => f.id !== id));
  };

  // Editar
  const startEdit = (f: Funcionario) => {
    setEditId(f.id);
    setEditNome(f.nome);
    setEditCargo(f.cargo);
  };

  // Salva alterações
  const saveEdit = (id: string) => {
    setFuncs(prev =>
      prev.map(f => (f.id === id ? { ...f, nome: editNome, cargo: editCargo } : f))
    );
    setEditId(null);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Funcionários</h2>

      {/* Adicionar novo funcionário */}
      <div className="mb-4 p-4 bg-slate-800 rounded">
        <div className="flex gap-2">
          <input
            placeholder="Nome"
            className="p-2 rounded bg-slate-700 flex-1"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <input
            placeholder="Cargo"
            className="p-2 rounded bg-slate-700 w-48"
            value={cargo}
            onChange={e => setCargo(e.target.value)}
          />
          <button onClick={add} className="px-4 py-2 bg-green-600 rounded">
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista de funcionários */}
      <div className="bg-slate-800 rounded p-4">
        <ul className="space-y-2">
          {funcs.map(f => (
            <li
              key={f.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center odd:bg-slate-900 p-2 rounded"
            >
              <div className="flex-1">
                {editId === f.id ? (
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      className="p-1 rounded bg-slate-700"
                      value={editNome}
                      onChange={e => setEditNome(e.target.value)}
                    />
                    <input
                      className="p-1 rounded bg-slate-700"
                      value={editCargo}
                      onChange={e => setEditCargo(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div className="font-semibold">{f.nome}</div>
                    <div className="text-sm text-slate-400">{f.cargo}</div>
                  </>
                )}

                {/* Aeronaves vinculadas */}
                <div className="text-xs text-slate-400 mt-1">
                  <strong>Aeronaves:</strong>{" "}
                  {f.aeronavesIds?.length
                    ? f.aeronavesIds
                        .map(id => aeronaves.find(a => a.id === id)?.modelo)
                        .filter(Boolean)
                        .join(", ")
                    : "Nenhuma vinculada"}
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 mt-2 md:mt-0">
                {editId === f.id ? (
                  <button
                    onClick={() => saveEdit(f.id)}
                    className="px-3 py-1 bg-green-600 rounded text-sm"
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(f)}
                    className="px-3 py-1 bg-blue-600 rounded text-sm"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => remove(f.id)}
                  className="px-3 py-1 bg-red-600 rounded text-sm"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
          {funcs.length === 0 && (
            <li className="text-slate-400">Nenhum funcionário cadastrado.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Funcionarios;
