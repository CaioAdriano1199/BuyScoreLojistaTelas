"use client";

import GraficoColuna from "../grafico/GraficoColuna";

export default function Telaestatistica() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="flex justify-between bg-[var(--azulescuro)] w-full items-center">
        <h1 className="text-4xl text-[var(--branco)] p-5">Estatísticas</h1>
      </div>

      <div className="flex flex-col gap-10 w-full p-6">

        <GraficoColuna
          titulo="Pontos Usados / Ganhos"
          dataKey="totalPontosResgatados"
          url="/mocks/pontos.json"
        />

        <GraficoColuna
          titulo="Novos Clientes"
          dataKey="quantidadeClientes"
          url="/mocks/clientes.json"
        />

        <GraficoColuna
          titulo="Itens Vendidos"
          dataKey="quantidadeCompras"
          url="/mocks/itens.json"
        />

      </div>
    </div>
  );
}
