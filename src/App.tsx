import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Aeronaves from "./pages/Aeronaves";
import Funcionarios from "./pages/Funcionarios";
import ImportarExportar from "./pages/ImportarExportar";
import Login from "./pages/Login"; // 🔹 nova tela de login

// 🔒 Rota protegida
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const autenticado = localStorage.getItem("auth") === "true";
  return autenticado ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* 🔹 Rota pública de login */}
      <Route path="/login" element={<Login />} />

      {/* 🔹 Área protegida */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="aeronaves" element={<Aeronaves />} />
        <Route path="funcionarios" element={<Funcionarios />} />
        <Route path="importar-exportar" element={<ImportarExportar />} />
      </Route>

      {/* 🔹 Qualquer rota inválida → redireciona para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
