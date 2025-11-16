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

export default function GraficoColuna({ titulo, dataKey, url }) {
  const [anoSelecionado, setAnoSelecionado] = useState("2025");
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const mesesBase = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ];

  useEffect(() => {
    async function buscarDados() {
      setLoading(true);
      try {
        const response = await fetch(`${url}?ano=${anoSelecionado}`);
        const json = await response.json();

        const mapaMes = {};
        json.dados.forEach(item => {
          mapaMes[item.mes] = item.valor;
        });

        const formatado = mesesBase.map((mes, i) => ({
          nome: mes,
          [dataKey]: mapaMes[i + 1] ?? 0,
        }));

        setDados(formatado);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    buscarDados();
  }, [anoSelecionado]);

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
