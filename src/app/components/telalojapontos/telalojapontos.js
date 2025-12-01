"use client";
import { useState } from "react";
import Input from "../input/input";
import Button from "../button/button";
import Itensloja from "../itensloja/itensloja";
import Modal from "../modal/modal";
import CameraButton from "../CameraButton/CameraButton";

export default function Telalojapontos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("ativos");
  const [reloadKey, setReloadKey] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [isModalmensagemOpen, setIsModalmensagemOpen] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    pontos: "",
    imagem: null,
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const modalnovoproduto = () => {
    setNovoProduto({ nome: "", pontos: "", descricao: "", imagem: null });
    setIsModalOpen(true);
  };

  function modalconfirma(msg) {
    setIsModalOpen(false);
    setMensagem(msg);
    setIsModalmensagemOpen(true);
  }

  const handleCriarProduto = async () => {
    try {
      if (!token) throw new Error("Token não encontrado");

      const payload = {
        nome: novoProduto.nome,
        descricao: novoProduto.descricao,
        valor: Number(novoProduto.pontos),
        fotoProduto: novoProduto.imagem || "", // aqui já está em base64
      };

      const res = await fetch("/home/api/criarproduto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        modalconfirma(data?.mensagem ?? "Erro ao criar produto");
        return;
      }

      modalconfirma("Produto criado com sucesso!");
      setIsModalOpen(false);
      setNovoProduto({ nome: "", pontos: "", descricao: "", imagem: null });
      setReloadKey(prev => prev + 1);
    } catch (e) {
      modalconfirma("Erro ao criar produto");
    }
  };

  return (
    <div className="p-8 flex flex-col">
      <h1 className="cursor-default text-3xl text-[var(--azulescuro)] font-bold text-center mb-8">
        Loja de pontos
      </h1>

      <div className="flex justify-between items-center mb-6 w-full max-w-5xl mx-auto">
        <div className="flex flex-col w-[60%]">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <Button variant="primary" className="h-10 px-6" onClick={modalnovoproduto}>
          Novo item
        </Button>
      </div>

      <div className="text-[var(--azulescuro)] border-b border-[var(--azulclaro)] w-full max-w-5xl mx-auto mb-4 pb-2 flex gap-2 justify-start">
        <a
          onClick={() => setAbaAtiva("ativos")}
          className={`cursor-pointer font-semibold transition ${abaAtiva === "ativos"
            ? "text-[var(--azulescuro)]"
            : "text-[var(--cinza)] hover:text-[var(--azulescuro)]"
            }`}
        >
          Itens Ativos
        </a>

        <span className="text-gray-400 cursor-default">/</span>

        <a
          onClick={() => setAbaAtiva("inativos")}
          className={`cursor-pointer font-semibold transition ${abaAtiva === "inativos"
            ? "text-[var(--azulescuro)]"
            : "text-[var(--cinza)] hover:text-[var(--azulescuro)]"
            }`}
        >
          Itens Inativos
        </a>
      </div>
      <div key={reloadKey}>
        {abaAtiva === "ativos" ? (
          <Itensloja tipo="ativos" searchTerm={searchTerm} token={token} />
        ) : (
          <Itensloja tipo="inativos" searchTerm={searchTerm} token={token} />
        )}
      </div>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-md"
        className="bg-[var(--branco)] rounded-lg"
      >
        <div className="grid grid-cols-5 justify-start auto-rows-max gap-2">
          <h2 className="cursor-default text-2xl text-[var(--azulescuro)] font-bold text-center col-span-5 mb-4">
            Novo produto
          </h2>

          <Input
            labelColor="azulescuro"
            label="Nome do produto"
            colSpan="col-span-5"
            value={novoProduto.nome}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, nome: e.target.value })
            }
          />

          <Input
            labelColor="azulescuro"
            label="Descrição do produto"
            colSpan="col-span-5"
            value={novoProduto.descricao}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, descricao: e.target.value })
            }
          />

          <Input
            labelColor="azulescuro"
            label="Pontos necessários"
            type="number"
            colSpan="col-span-3"
            value={novoProduto.pontos}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, pontos: e.target.value })
            }
          />

          <div className="flex items-center col-span-3">
            <CameraButton
              textolabel="Imagem Produto"
              labelcolor="azulescuro"
              onImageChange={(base64) =>
                setNovoProduto({ ...novoProduto, imagem: base64 })
              }
            />
          </div>

          <Button
            variant="primary"
            className="col-span-5 mt-6 justify-self-center"
            onClick={handleCriarProduto}
          >
            Adicionar Produto
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isModalmensagemOpen}
        onClose={() => setIsModalmensagemOpen(false)}
        width="max-w-md"
        className="bg-[var(--branco)] rounded-lg p-4"
      >
        <p className="text-center text-[var(--azulescuro)] text-lg">{mensagem}</p>
      </Modal>
    </div>
  );
}
