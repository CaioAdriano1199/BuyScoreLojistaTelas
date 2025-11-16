import GraficoColuna from "./GraficoColuna";

export default function GraficoItens() {
  return (
    <GraficoColuna
      titulo="Itens Resgatados"
      dataKey="itens"
      url="http://localhost:3002/itens/estatisticas"
    />
  );
}
