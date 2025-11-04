import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import { getStorage } from "../utils/localStorage";

const Exportar: React.FC = () => {
  const exportRef = useRef<HTMLDivElement | null>(null);

  const exportAll = () => {
    const aeronaves = getStorage("aeronaves", []);
    const funcionarios = getStorage("funcionarios", []);

    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("Relatório do Sistema Aerocode", 10, y);
    y += 10;

    // Aeronaves
    doc.setFontSize(13);
    doc.text("Aeronaves:", 10, y);
    y += 6;

    if (aeronaves.length > 0) {
      doc.setFontSize(11);
      aeronaves.forEach((a: any, i: number) => {
        const text = `${i + 1}. Modelo: ${a.modelo} | Serial: ${a.serial} | Status: ${a.status}`;
        doc.text(text, 10, y);
        y += 6;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });
    } else {
      doc.setFontSize(11);
      doc.text("Nenhuma aeronave cadastrada.", 10, y);
      y += 10;
    }

    // Funcionários
    y += 8;
    doc.setFontSize(13);
    doc.text("Funcionários:", 10, y);
    y += 6;

    if (funcionarios.length > 0) {
      doc.setFontSize(11);
      funcionarios.forEach((f: any, i: number) => {
        const text = `${i + 1}. Nome: ${f.nome} | Cargo: ${f.cargo}`;
        doc.text(text, 10, y);
        y += 6;
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });
    } else {
      doc.setFontSize(11);
      doc.text("Nenhum funcionário cadastrado.", 10, y);
    }

    // Salvar arquivo
    doc.save("aerocode_export.pdf");
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Exportar Dados</h2>

      <div
        ref={exportRef}
        className="bg-slate-800 p-4 rounded text-slate-200 space-y-3"
      >
        <p>
          Gere um arquivo PDF com todos os dados salvos do sistema Aerocode.
        </p>
        <p className="text-slate-400 text-sm">
          O arquivo conterá as aeronaves e funcionários cadastrados no sistema.
        </p>
      </div>

      <div className="mt-4">
        <button
          onClick={exportAll}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Exportar como PDF
        </button>
      </div>
    </div>
  );
};

export default Exportar;
