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
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  const mesesBase = [
    "Jan","Fev","Mar","Abr","Mai","Jun",
    "Jul","Ago","Set","Out","Nov","Dez"
  ];

  // 🔹 Carregar anos disponíveis
  useEffect(() => {
    async function carregarAnos() {
      try {
        const token = localStorage.getItem("token");

        const r = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await r.json();

        const lista = Array.isArray(json.info) ? json.info : [];

        const anos = [...new Set(lista.map(d => d.ano))].sort((a, b) => b - a);

        const anosFormatados = anos.map(a => ({
          value: a.toString(),
          label: a.toString()
        }));

        setAnosDisponiveis(anosFormatados);

        if (anos.length > 0) {
          setAnoSelecionado({
            value: anos[0].toString(),
            label: anos[0].toString()
          });
        }

      } catch (err) {
        console.error("Erro ao carregar anos:", err);
      }
    }

    carregarAnos();
  }, [url]);

  // 🔹 Carregar dados do ano selecionado
  useEffect(() => {
    if (!anoSelecionado || !anoSelecionado.value) return;

    async function carregarDados() {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        const r = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const json = await r.json();

        const lista = Array.isArray(json.info) ? json.info : [];

        const filtrado = lista.filter(item => item.ano == anoSelecionado.value);

        const mapaMes = {};
        filtrado.forEach(item => {
          mapaMes[item.mes] = item[dataKey] ?? 0;
        });

        const formatado = mesesBase.map((mes, i) => ({
          nome: mes,
          [dataKey]: mapaMes[i + 1] ?? 0
        }));

        setDados(formatado);

      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [anoSelecionado, url, dataKey]);

  return (
    <div className="w-full h-[400px] bg-[var(--branco)] p-4 shadow-md flex flex-col rounded-xl">
      <h2 className="text-[var(--azulescuro)] text-xl font-semibold mb-4 text-center">
        {titulo}
      </h2>

      <Combobox
        label="Ano"
        value={anoSelecionado}
        onChange={(novoAno) => setAnoSelecionado(novoAno)}
        options={anosDisponiveis}
        className="w-40 mb-4"
      />

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          Carregando...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={dataKey}
              fill="var(--azulclaro)"
              barSize={40}
              radius={[12, 12, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
