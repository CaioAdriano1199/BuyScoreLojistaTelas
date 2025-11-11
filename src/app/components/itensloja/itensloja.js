"use client";
import { useEffect, useState } from "react";
import Button from "../button/button";
import CameraButton from "../cameraButton/CameraButton";
import Modal from "../modal/modal";
import Input from "../input/input";

export default function Itensloja({ tipo, searchTerm }) {
  const [produtos, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const ativarProduto = async (id) => {
    try {
      const response = await fetch(`/api/ativarproduto/${id}`, { method: "PUT" });
      const data = await response.json();
      if (!response.ok) {
        alert(data.mensagem || "Erro ao ativar produto");
        return;
      }
      setProdutos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ativo: true } : p))
      );
    } catch (error) {
      console.error("Erro ao ativar produto:", error);
      alert("Erro de conexão");
    }
  };

  const deletarProduto = async (id) => {
    try {
      const response = await fetch(`/api/deletarproduto/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        alert(data.mensagem || "Erro ao excluir produto");
        return;
      }
      setProdutos((prev) => prev.filter((p) => p.id !== id));
      alert("Produto removido com sucesso!");
} catch (error) {
  console.error("Erro ao excluir produto:", error);
  alert("Erro de conexão");
}
  };

const desativarProduto = async (id) => {
  try {
    const response = await fetch(`/api/desativarproduto/${id}`, { method: "PUT" });
    const data = await response.json();
    if (!response.ok) {
      alert(data.mensagem || "Erro ao desativar produto");
      return;
    }
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ativo: false } : p))
    );
  } catch (error) {
    console.error("Erro ao desativar produto:", error);
    alert("Erro de conexão");
  }
};


const modaleditarproduto = (produto) => {
  setProdutoSelecionado(produto);
  setIsModalOpen(true);
};

const handleAtualizarproduto = async () => {
  try {
    const response = await fetch("/api/atualizarproduto", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoSelecionado),
    });
    const data = await response.json();

    if (!response.ok) {
      alert(data.mensagem || "Erro ao atualizar produto");
      return;
    }

    setProdutos((prev) =>
      prev.map((p) =>
        p.id === produtoSelecionado.id ? produtoSelecionado : p
      )
    );

    alert("Produto atualizado com sucesso!");
    setIsModalOpen(false);
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    alert("Erro de conexão");
  }
};

useEffect(() => {
  const carregarProdutos = async () => {
    try {
      const resposta = await fetch("/mock/produtos.json");
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.error("Erro ao carregar produtos:", erro);
    }
  };
  carregarProdutos();
}, []);


const produtosFiltradosPorStatus =
  tipo === "ativos"
    ? produtos.filter((p) => p.ativo)
    : produtos.filter((p) => !p.ativo);

const produtosFiltrados = produtosFiltradosPorStatus.filter((p) =>
  p.nome.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div className="flex flex-col items-center gap-3 mt-6">
    {produtosFiltrados.length > 0 ? (
      produtosFiltrados.map((produto) => (
        <div
          key={produto.id}
          className="flex justify-between items-center w-[80%] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <img src={produto.imagem} alt={produto.nome} className="w-12 h-12" />
            <span className="text-[var(--azulescuro)] font-semibold">{produto.nome}</span>
          </div>

          <span className="text-[var(--azulescuro)] font-semibold">{produto.pontos} pts</span>

          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                produto.ativo
                  ? desativarProduto(produto.id)
                  : ativarProduto(produto.id)
              }
              variant="primary"
              className="p-2"
            >
              {produto.ativo ? "🚫" : "✅"}
            </Button>

            <Button
              variant="primary"
              className="p-2"
              onClick={() => modaleditarproduto(produto)}
            >
              ✏️
            </Button>

            <Button variant="primary" className="p-2" onClick={() => deletarProduto(produto.id)}>🗑️</Button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-[var-(--cinza)]">Nenhum produto encontrado.</p>
    )}

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="max-w-md" className="bg-[var(--branco)] rounded-lg">
      {produtoSelecionado && (
        <div className="grid grid-cols-5 justify-start auto-rows-max">
          <h2 className="text-2xl text-[var(--azulescuro)] font-bold text-center col-span-5 mb-4">Editar Produto</h2>

          <Input
            labelColor="azulescuro"
            label="Nome do produto"
            colSpan="col-span-5"
            value={produtoSelecionado.nome}
            onChange={(e) =>
              setProdutoSelecionado({ ...produtoSelecionado, nome: e.target.value })
            }
          />

          <Input
            labelColor="azulescuro"
            label="Pontos necessários"
            type="number"
            colSpan="col-span-3"
            value={produtoSelecionado.pontos}
            onChange={(e) =>
              setProdutoSelecionado({ ...produtoSelecionado, pontos: Number(e.target.value) })
            }
          />

          <div className="flex items-center col-span-3">
            <CameraButton
              textolabel="Imagem Produto"
              labelcolor="azulescuro"
              initialImage={produtoSelecionado.imagem}
              onImageChange={(novaImagem) =>
                setProdutoSelecionado({ ...produtoSelecionado, imagem: novaImagem })
              }
            />
          </div>

          <Button variant="primary" className="col-span-5 mt-6 justify-self-center" onClick={handleAtualizarproduto}>
            Salvar Alterações
          </Button>
        </div>
      )}
    </Modal>
  </div>
);
}
