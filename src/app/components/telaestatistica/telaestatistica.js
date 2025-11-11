"use client";
import { useState } from "react";
import Button from "../button/button";
import GraficoColuna from "../grafico/GraficoColuna";

export default function Telaestatistica() {
  // Estado que controla qual gráfico está selecionado
  const [graficoAtual, setGraficoAtual] = useState("pontos");

  // Handlers dos botões
  const grafpontos = () => setGraficoAtual("pontos");
  const grafclientes = () => setGraficoAtual("clientes");
  const grafitens = () => setGraficoAtual("itens");

  return (
    <div className="flex flex-col items-center justify-start w-full h-screen">
      <div className="flex justify-between bg-[var(--azulescuro)] w-full items-center">
        <div className="flex divide-x divide-white">
          <Button
            variant={graficoAtual === "pontos" ? "quadruple" : "terciary"}
            onClick={grafpontos}
            className=" px-6 py-4"
          >
            Pontos
          </Button>

          <Button
            variant={graficoAtual === "clientes" ? "quadruple" : "terciary"}
            onClick={grafclientes}
            className="px-6 py-4"
          >
            Clientes Pontuando
          </Button>

          <Button
            variant={graficoAtual === "itens" ? "quadruple" : "terciary"}
            onClick={grafitens}
            className=" "
          >
            Itens Resgatados
          </Button>
        </div>

        <h1 className="text-4xl text-[var(--branco)] p-5">Estatísticas</h1>
      </div>

      {/* Área do gráfico */}
      <div className="flex-1 w-full">
        <GraficoColuna tipo={graficoAtual} />
      </div>
    </div>
  );
}
