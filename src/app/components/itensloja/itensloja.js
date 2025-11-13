"use client";
import { useEffect, useState } from "react";
import Button from "../button/button";
import CameraButton from "../cameraButton/CameraButton";
import Modal from "../modal/modal";
import Input from "../input/input";
import { bffRequest } from "../../../lib/api";

export default function Itensloja({ tipo, searchTerm, token }) {
  const [produtos, setProdutos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Carrega produtos via BFF
  const carregarProdutos = async () => {
    if (!token) return;
    try {
      const dados = await bffRequest("/produto/meuprod", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(dados.produtos || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProdutos([]);
    }
  };

  // Atualizar produto
const atualizarProduto = async (produtoAtualizado) => {
  try {
    await fetch("/home/api/atualizarproduto", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(produtoAtualizado),
    });

    setProdutos((prev) =>
      prev.map((p) => (p.id === produtoAtualizado.id ? produtoAtualizado : p))
    );

    alert("Produto atualizado com sucesso!");
    setIsModalOpen(false);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    alert(error.message || "Erro ao atualizar produto");
  }
};


  // Ativar/Desativar produto
  const toggleAtivarProduto = async (id, ativar = true) => {
    try {
      await bffRequest(`/produto/${ativar ? "ativar" : "desativar"}/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      setProdutos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ativo: ativar } : p))
      );
    } catch (error) {
      console.error("Erro ao alterar status do produto:", error);
      alert(error.message || "Erro ao alterar status do produto");
    }
  };

  // Deletar produto
const deletarProduto = async (id) => {
  try {
    await bffRequest(`/produto/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setProdutos((prev) => prev.filter((p) => p.id !== id));
    alert("Produto removido com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    alert(error.message || "Erro ao excluir produto");
  }
};


  const modaleditarproduto = (produto) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  useEffect(() => {
    carregarProdutos();
  }, [token]);

  // Filtra produtos por ativo/inativo
  const produtosFiltradosPorStatus =
    tipo === "ativos"
      ? produtos.filter((p) => p.ativo)
      : produtos.filter((p) => !p.ativo);

  // Filtra por searchTerm
  const produtosFiltrados = produtosFiltradosPorStatus.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[450px] overflow-y-auto flex flex-col items-center gap-3 mt-6">
      {produtosFiltrados.length > 0 ? (
        produtosFiltrados.map((produto) => (
          <div
            key={produto.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center w-[84%] px-4 py-3 border-b border-[var(--azulclaro)]  shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2 md:mb-0">
              <img
                src={produto.fotoProduto}
                alt={produto.nome}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex flex-col">
                <span className="text-[var(--azulescuro)] font-semibold">{produto.nome}</span>
                <span className="text-[var(--cinza)] text-sm">{produto.descricao}</span>
              </div>
            </div>

            

            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-[var(--azulescuro)] font-semibold mr-6">{produto.valor} pts</span>
              <Button
                onClick={() => toggleAtivarProduto(produto.id, !produto.ativo)}
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

              <Button
                variant="primary"
                className="p-2"
                onClick={() => deletarProduto(produto.id)}
              >
                🗑️
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[var(--cinza)] mt-4">Nenhum produto encontrado.</p>
      )}

      {/* Modal de edição */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-md"
        className="bg-[var(--branco)] rounded-lg p-4"
      >
        {produtoSelecionado && (
          <div className="grid grid-cols-5 gap-2 auto-rows-max">
            <h2 className="text-2xl text-[var(--azulescuro)] font-bold text-center col-span-5 mb-4">
              Editar Produto
            </h2>

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
              label="Descrição"
              colSpan="col-span-5"
              value={produtoSelecionado.descricao}
              onChange={(e) =>
                setProdutoSelecionado({ ...produtoSelecionado, descricao: e.target.value })
              }
            />

            <Input
              labelColor="azulescuro"
              label="Valor em pontos"
              type="number"
              colSpan="col-span-3"
              value={produtoSelecionado.valor}
              onChange={(e) =>
                setProdutoSelecionado({ ...produtoSelecionado, valor: Number(e.target.value) })
              }
            />

            <div className="flex items-center col-span-3">
              <CameraButton
                textolabel="Imagem Produto"
                labelcolor="azulescuro"
                initialImage={produtoSelecionado.fotoProduto}
                onImageChange={(novaImagem) =>
                  setProdutoSelecionado({ ...produtoSelecionado, fotoProduto: novaImagem })
                }
              />
            </div>

            <Button
              variant="primary"
              className="col-span-5 mt-6 justify-self-center"
              onClick={() => atualizarProduto(produtoSelecionado)}
            >
              Salvar Alterações
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
