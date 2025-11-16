import GraficoColuna from "./GraficoColuna";

export default function GraficoClientes() {
  return (
    <GraficoColuna
      titulo="Clientes Pontuando"
      dataKey="clientes"
      url="http://localhost:3001/clientes/estatisticas"
    />
  );
}
