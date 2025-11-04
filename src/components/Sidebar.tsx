import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/aeronaves", label: "Aeronaves" },
  { to: "/funcionarios", label: "Funcionários" },
  { to: "/importar-exportar", label: "Importar/Exportar" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("aero_user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 p-4 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold">AeroControl</h1>
        <p className="text-sm text-slate-400">Gestão de Produção</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? "bg-slate-700" : "hover:bg-slate-800"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-4">
        <button onClick={logout} className="w-full px-3 py-2 bg-red-600 rounded">Sair</button>
      </div>
    </aside>
  );
};

export default Sidebar;