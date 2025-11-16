"use client";
import { useState } from "react";
import Button from "../button/button";
import GraficoClientes from "../grafico/GraficoClientes";
import GraficoItens from "../grafico/GraficoItens";
import GraficoPontos from "../grafico/GraficoPontos";

export default function Telaestatistica() {
  // Estado que controla qual gráfico está selecionado
  const [graficoAtual, setGraficoAtual] = useState("pontos");

  // Handlers dos botões

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <div className="flex justify-between bg-[var(--azulescuro)] w-full items-center">


        <h1 className="text-4xl text-[var(--branco)] p-5">Estatísticas</h1>
      </div>

      <div className="flex-1 w-full">
        <GraficoPontos />
        <GraficoClientes />
        <GraficoItens />
      </div>
    </div>
  );
}
