import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getStorage, setStorage } from "../utils/localStorage";
import type { Aeronave, Funcionario } from "../types";

const Aeronaves: React.FC = () => {
  // EST
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(() => getStorage("aeronaves", []));
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(() => getStorage("funcionarios", []));
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [funcionarioId, setFuncionarioId] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editModelo, setEditModelo] = useState("");
  const [editSerial, setEditSerial] = useState("");
  const [editFuncionarioId, setEditFuncionarioId] = useState("");

  // PRS
  useEffect(() => {
    setStorage("aeronaves", aeronaves);
  }, [aeronaves]);
  useEffect(() => {
    setStorage("funcionarios", funcionarios);
  }, [funcionarios]);

  // AddAER
  const adicionar = () => {
    if (!modelo.trim() || !serial.trim()) return;

    const nova: Aeronave = {
      id: uuidv4(),
      modelo,
      serial,
      status: "planejado",
      funcionariosIds: funcionarioId ? [funcionarioId] : [],
    };

    // ATUALIZAFunc
    if (funcionarioId) {
      setFuncionarios(prev =>
        prev.map(f =>
          f.id === funcionarioId
            ? { ...f, aeronavesIds: [...(f.aeronavesIds || []), nova.id] }
            : f
        )
      );
    }

    setAeronaves(prev => [nova, ...prev]);
    setModelo("");
    setSerial("");
    setFuncionarioId("");
  };

  // ExcAER
  const excluir = (id: string) => {
    const alvo = aeronaves.find(a => a.id === id);
    if (alvo) {
      setFuncionarios(prev =>
        prev.map(f =>
          f.aeronavesIds?.includes(id)
            ? { ...f, aeronavesIds: f.aeronavesIds.filter(aid => aid !== id) }
            : f
        )
      );
    }
    setAeronaves(prev => prev.filter(a => a.id !== id));
  };

  // MUDAStts
  const alternarStatus = (id: string) => {
    setAeronaves(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              status:
                a.status === "planejado"
                  ? "em-producao"
                  : a.status === "em-producao"
                  ? "concluido"
                  : "planejado",
            }
          : a
      )
    );
  };

  const iniciarEdicao = (a: Aeronave) => {
    setEditandoId(a.id);
    setEditModelo(a.modelo);
    setEditSerial(a.serial);
    setEditFuncionarioId(a.funcionariosIds[0] || "");
  };

  // Salva edição
  const salvarEdicao = (id: string) => {
    // Atualiza aeronave
    setAeronaves(prev =>
      prev.map(a =>
        a.id === id
          ? {
              ...a,
              modelo: editModelo,
              serial: editSerial,
              funcionariosIds: editFuncionarioId ? [editFuncionarioId] : [],
            }
          : a
      )
    );

    // Atualiza funcionários cada aero
    setFuncionarios(prev =>
      prev.map(f => {
        const possui = f.aeronavesIds?.includes(id);
        if (f.id === editFuncionarioId) {
          return possui ? f : { ...f, aeronavesIds: [...(f.aeronavesIds || []), id] };
        } else {
          return { ...f, aeronavesIds: f.aeronavesIds?.filter(aid => aid !== id) || [] };
        }
      })
    );

    setEditandoId(null);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Aeronaves</h2>

      {/* Formulário de cadastro */}
      <div className="p-4 bg-slate-800 rounded mb-6">
        <div className="flex flex-wrap gap-2">
          <input
            placeholder="Modelo"
            className="p-2 rounded bg-slate-700 flex-1"
            value={modelo}
            onChange={e => setModelo(e.target.value)}
          />
          <input
            placeholder="Serial"
            className="p-2 rounded bg-slate-700 w-48"
            value={serial}
            onChange={e => setSerial(e.target.value)}
          />
          <select
            value={funcionarioId}
            onChange={e => setFuncionarioId(e.target.value)}
            className="p-2 rounded bg-slate-700"
          >
            <option value="">Sem funcionário</option>
            {funcionarios.map(f => (
              <option key={f.id} value={f.id}>{f.nome}</option>
            ))}
          </select>
          <button
            onClick={adicionar}
            className="px-4 py-2 bg-green-600 rounded text-white"
          >
            Adicionar
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-slate-800 rounded p-4 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="text-slate-300 text-sm">
              <th>Modelo</th>
              <th>Serial</th>
              <th>Status</th>
              <th>Funcionário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aeronaves.map(a => (
              <tr key={a.id} className="odd:bg-slate-900">
                <td className="py-2">
                  {editandoId === a.id ? (
                    <input
                      value={editModelo}
                      onChange={e => setEditModelo(e.target.value)}
                      className="p-1 bg-slate-700 rounded"
                    />
                  ) : (
                    a.modelo
                  )}
                </td>

                <td>
                  {editandoId === a.id ? (
                    <input
                      value={editSerial}
                      onChange={e => setEditSerial(e.target.value)}
                      className="p-1 bg-slate-700 rounded"
                    />
                  ) : (
                    a.serial
                  )}
                </td>

                <td className="capitalize">{a.status}</td>

                <td>
                  {editandoId === a.id ? (
                    <select
                      value={editFuncionarioId}
                      onChange={e => setEditFuncionarioId(e.target.value)}
                      className="p-1 rounded bg-slate-700"
                    >
                      <option value="">Nenhum</option>
                      {funcionarios.map(f => (
                        <option key={f.id} value={f.id}>{f.nome}</option>
                      ))}
                    </select>
                  ) : (
                    (Array.isArray(a.funcionariosIds) ? a.funcionariosIds : [])
                    .map(id => funcionarios.find(f => f.id === id)?.nome)
                    .filter(Boolean)
                    .join(", ") || <span className="text-slate-400">Nenhum</span>
                  )}
                </td>

                <td className="py-2 flex gap-2">
                  {editandoId === a.id ? (
                    <button
                      onClick={() => salvarEdicao(a.id)}
                      className="px-2 py-1 bg-green-600 rounded text-sm"
                    >
                      Salvar
                    </button>
                  ) : (
                    <button
                      onClick={() => iniciarEdicao(a)}
                      className="px-2 py-1 bg-blue-600 rounded text-sm"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => alternarStatus(a.id)}
                    className="px-2 py-1 bg-yellow-600 rounded text-sm"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => excluir(a.id)}
                    className="px-2 py-1 bg-red-600 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {aeronaves.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-slate-400 text-center">
                  Nenhuma aeronave cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aeronaves;
