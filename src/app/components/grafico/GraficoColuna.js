"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Combobox from "../combobox/combobox";

export default function GraficoColuna({ tipo }) {
  const [anoSelecionado, setAnoSelecionado] = useState("2025");
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const mesesBase = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  let titulo = "";
  let dataKey = "";

  switch (tipo) {
    case "pontos":
      titulo = "Pontos Acumulados";
      dataKey = "pontos";
      break;
    case "clientes":
      titulo = "Clientes Pontuando";
      dataKey = "clientes";
      break;
    case "itens":
      titulo = "Itens Resgatados";
      dataKey = "itens";
      break;
    default:
      titulo = "";
      dataKey = "";
  }

  // 🔄 Atualiza dados quando muda tipo ou ano
  useEffect(() => {
    async function buscarDados() {
      setLoading(true);
      try {
        // Aqui depois você troca pela sua API real:
        // const response = await fetch(`/api/estatisticas?tipo=${tipo}&ano=${anoSelecionado}`);
        // const json = await response.json();

        // Mock temporário (simula resposta da API):
        const json = {
          dados: Array(12)
            .fill(0)
            .map((_, i) => ({
              mes: mesesBase[i],
              valor: Math.floor(Math.random() * 500), // números aleatórios só pra simular
            })),
        };

        const formatado = mesesBase.map((mes, i) => ({
          nome: mes,
          [dataKey]: json.dados[i]?.valor ?? 0,
        }));

        setDados(formatado);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    buscarDados();
  }, [tipo, anoSelecionado]);

  return (
    <div className="w-full h-full bg-[var(--branco)] p-4 shadow-md flex flex-col">
      <h2 className="text-[var(--azulescuro)] text-xl font-semibold mb-4 text-center">
        {titulo}
      </h2>

      <Combobox
        label="Ano"
        labelcolor={"var(--azulescuro)"}
        value={anoSelecionado}
        onChange={(novoAno) => setAnoSelecionado(novoAno)}
        options={[
          { label: "2023", value: "2023" },
          { label: "2024", value: "2024" },
          { label: "2025", value: "2025" },
        ]}
        className="text-[var(--azulescuro)] mb-4 w-40"
      />

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-[var(--azulescuro)]">
          Carregando dados...
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--azulescuro)" />
              <XAxis dataKey="nome" stroke="var(--azulescuro)" />
              <YAxis stroke="var(--azulescuro)" />
              <Tooltip />
              <Bar
                dataKey={dataKey}
                fill="var(--azulclaro)"
                barSize={40}
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
