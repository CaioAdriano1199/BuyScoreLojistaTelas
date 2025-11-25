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
          titulo="Pontos Resgatados"
          dataKey="Pontos"
          url="http://localhost:3000/ponto/estatisticas/pontos-resgatados"
        />

        <GraficoColuna
          titulo="Clientes Pontuando"
          dataKey="Clientes"
          url="http://localhost:3000/ponto/estatisticas"
        />

        <GraficoColuna
          titulo="Itens Resgatados"
          dataKey="ItensResgatados"
          url="http://localhost:3000/ponto/estatisticas/compras"
        />

      </div>
    </div>
  );
}
