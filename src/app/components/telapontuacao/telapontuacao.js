"use client";
import { useState } from "react";
import Button from "../button/button";
import Input from "../input/input";
import Modal from "../modal/modal";

export default function Telapontuacao() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pontos, setValorCompra] = useState("");
  const [pontuacaoGerada, setPontuacaoGerada] = useState("(codigo)");

  const handleGerarPontuacao = async () => {
  try {
    const token = localStorage.getItem("token").toString();  

    const res = await fetch("home/api/gerarpontos", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,         
      },
      body: JSON.stringify({ pontos }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.mensagem ?? "Erro ao gerar pontuação");
      return;
    }

    setPontuacaoGerada(data?.codigo ?? "Código não encontrado");
    setIsModalOpen(true);

  } catch (e) {
    console.error(e);
    alert("Erro ao gerar pontuação");
  }
};


  return (
    <div className="p-8 flex items-center justify-center w-full flex-col">
      <h1 className="text-4xl font-bold mb-4 text-[var(--azulescuro)] p-20">Tela de Pontuação</h1>
      <div className="mb-4 w-[26%]">
        <Input
          label="Valor da Compra"
          type="number"
          labelColor="azulescuro"
          value={pontos}
          onChange={(e) => setValorCompra(e.target.value)}
          className=""
        />
        <Button
          type="button"
          variant="primary"
          className="w-[40%]"
          onClick={handleGerarPontuacao}
        >
          Gerar
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-md"
        className="bg-white rounded-lg"
      >
        <div className="flex justify-center items-center py-8">
          <span className="text-2xl text-[var(--azulescuro)]">
            {pontuacaoGerada}
          </span>
        </div>
      </Modal>
    </div>
  );
}