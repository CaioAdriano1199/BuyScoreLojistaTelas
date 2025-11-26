"use client";

import GraficoColuna from "../grafico/GraficoColuna";

export default function Telaestatistica() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="flex justify-between bg-[var(--azulescuro)] w-full items-center">
        <h1 className="text-4xl text-[var(--branco)] p-5">Estatísticas</h1>
      </div>

      <div className="grid grid-cols-10 gap-10 w-full p-6">

        <div className="col-span-10">
          <GraficoColuna
            titulo="Clientes Pontuando"
            dataKey="quantidadeClientes"
            url="http://localhost:3000/ponto/estatisticas"
          />
        </div>

        <div className="col-span-5">
          <GraficoColuna
            titulo="Pontos Resgatados"
            dataKey="totalPontosResgatados"
            url="http://localhost:3000/ponto/estatisticas/pontos-resgatados"
          />
        </div>

        <div className="col-span-5">
          <GraficoColuna
            titulo="Itens Resgatados"
            dataKey="quantidadeCompras"
            url="http://localhost:3000/ponto/estatisticas/compras"
          />
        </div>

      </div>
    </div>
  );
}
