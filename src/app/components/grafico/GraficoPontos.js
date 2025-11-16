import GraficoColuna from "./GraficoColuna";

export default function GraficoPontos() {
  return (
    <GraficoColuna
      titulo="Pontos Acumulados"
      dataKey="pontos"
      url="http://localhost:3000/ponto/estatisticas"
    />
  );
}
