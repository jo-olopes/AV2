import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (usuario === "admin" && senha === "admin") {
      localStorage.setItem("auth", "true");
      navigate("/home");
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-slate-200">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">Login - Aerocode</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Usuário</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Digite admin"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Digite admin"
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-slate-400 text-sm">
          <p><strong>Usuário:</strong> admin</p>
          <p><strong>Senha:</strong> admin</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
