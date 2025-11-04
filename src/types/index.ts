export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  aeronavesIds: string[]; // aeronaves associadas
}

export interface Aeronave {
  id: string;
  modelo: string;
  serial: string;
  status: string; // planejado, em-producao, concluido
  funcionariosIds: string[]; // funcionários associados
}