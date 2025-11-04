import React from "react";

const Topbar: React.FC = () => {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-slate-700 bg-slate-900">
      <div className="text-slate-200 font-semibold">Painel</div>
      <div className="text-slate-400 text-sm">Usuário: Demo</div>
    </header>
  );
};

export default Topbar;