"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../input/input";
import Button from "../button/button";
import Combobox from "../combobox/combobox";
import { top100Films, ufs } from "../combobox/comboboxdata";
import CameraButton from "../CameraButton/CameraButton";
import Modal from "../modal/modal";

export default function CadastroForm() {

  // -------------------------
  // STATES DO FORM
  // -------------------------
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nichoLoja, setNichoLoja] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [fotoUsuario, setfotoUsuario] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // -------------------------
  // STATES DO PIX
  // -------------------------
  const [isModalOpenPix, setIsModalOpenPix] = useState(false);
  const [pixImage, setPixImage] = useState("");
  const [pixCode, setPixCode] = useState("");
  const [pixId, setPixId] = useState(null);
  const [pendingCadastro, setPendingCadastro] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // --------------------------------------------------------
  // HANDLE SUBMIT → CRIA CLIENTE → CRIA PIX → ABRE O MODAL
  // --------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    

    try {
      // 1️⃣ Criar Customer
      const customerRes = await fetch("/api/abacatepay/createCustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email: email,
          taxId: cnpj,
          cellphone: fone,
        }),
      });

      const customerData = await customerRes.json();
      if (!customerRes.ok) {
        alert("Erro ao criar customer no AbacatePay");
        return;
      }

      // 2️⃣ Criar Pix
      const pixRes = await fetch("/api/abacatepay/createPix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customerData.id,
          customerName: nome,
          customerCellphone: fone,
          customerTaxId: cnpj,
          customerEmail: email,
          metadata: { description: "Cadastro do comércio" }
        }),
      });

      const pixData = await pixRes.json();
      
      
      if (!pixRes.ok) {
        alert("Erro ao criar Pix: " + (pixData?.error || pixData?.message || "Desconhecido"));
        return;
      }

      // A resposta vem com { error: null, data: {...} }
      const pix = pixData.data || pixData;
      
      
      
      setPixId(pix.id);
      setPixImage(pix.brCodeBase64);
      setPixCode(pix.brCode || "");

      // guarda os dados do cadastro para enviar após confirmação do pagamento
      // Sem o número (usado só no PIX) e com seguimento mapeado de nichoLoja
      setPendingCadastro({
        razaoSocial,
        seguimento: nichoLoja,
        nome,
        email,
        fone,
        senha,
        fotoUsuario,
        cnpj,
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        uf: estado,
        numero,
        abacateCustomerId: customerData.id,
        pixId: pix.id,
      });

      setIsModalOpenPix(true);

    } catch (err) {
      alert("Erro ao iniciar pagamento");
    }
  };

  // --------------------------------------------------------
  // SIMULAR PAGAMENTO → ABRE MODAL DE SUCESSO
  // --------------------------------------------------------
  async function simularPagamento() {
    if (!pixId) {
      alert("ID do Pix não encontrado!");
      return;
    }

    const r = await fetch("/api/abacatepay/simulatePayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pixId }),
    });

    if (!r.ok) {
      const errBody = await r.json().catch(() => ({}));
      alert("Erro ao simular pagamento: " + (errBody?.message || errBody?.error || r.statusText));
      return;
    }

    // Se simulação OK, persistir cadastro no backend (BFF) usando nossa rota
    if (!pendingCadastro) {
      setIsModalOpenPix(false);
      setIsModalOpen(true);
      return;
    }

    try {
      const cadastroRes = await fetch('/cadastro/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingCadastro),
      });

      const cadastroData = await cadastroRes.json().catch(() => ({}));

      if (!cadastroRes.ok) {
        alert('Erro ao finalizar cadastro: ' + (cadastroData?.mensagem || cadastroData?.message || 'Desconhecido'));
        return;
      }

      // sucesso: fecha modal pix e abre modal de sucesso
      setIsModalOpenPix(false);
      setIsModalOpen(true);
    } catch (err) {
      alert('Erro ao finalizar cadastro');
    }
  }

  function paralogin() {
    setIsModalOpen(false);
    router.push("/login");
  }

  return (
    <form className="grid grid-cols-6 gap-4" onSubmit={handleSubmit}>
      <h1 className="col-span-6 cursor-default text-3xl font-semibold text-center mb-2 text-[rgb(227,227,227)]">
        Cadastro
      </h1>

      {/* inputs do cadastro */}
      <Input label="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} colSpan="col-span-3" />
      <Combobox label="Nicho da Loja" options={top100Films} value={nichoLoja} onChange={(v) => setNichoLoja(v)} colSpan="col-span-3" />

      <Input label="Nome do Responsável" value={nome} onChange={(e) => setNome(e.target.value)} colSpan="col-span-3" />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} colSpan="col-span-3" />
      <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} colSpan="col-span-3" />
      <Input label="Confirmar Senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} colSpan="col-span-3" />

      <Input label="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} colSpan="col-span-3" />
      <Input label="Fone" value={fone} onChange={(e) => setFone(e.target.value)} colSpan="col-span-3" />
      <Input label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} colSpan="col-span-2" />
      <Input label="Número" value={numero} onChange={(e) => setNumero(e.target.value)} colSpan="col-span-1" />
      <Input label="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} colSpan="col-span-3" />
      <Input label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} colSpan="col-span-3" />
      <Input label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} colSpan="col-span-3" />
      <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} colSpan="col-span-2" />
      <Combobox label="UF" options={ufs} value={estado} onChange={(v) => setEstado(v)} colSpan="col-span-1" />

      <div className="col-span-3 flex justify-center">
        <CameraButton textolabel="Logo da Empresa" onImageChange={(base64) => setfotoUsuario(base64)} />
      </div>

      <div className="col-span-6 flex justify-center">
        <Button type="submit" variant="primary" className="w-1/2">
          Cadastrar
        </Button>
      </div>

      {/* modal de sucesso */}
      <Modal isOpen={isModalOpen} onClose={() => paralogin()} width="max-w-md" className="bg-white rounded-lg">
        <div className="flex justify-center items-center py-8">
          <span className="text-2xl text-[var(--azulescuro)]">Cadastro Realizado com Sucesso!</span>
        </div>
      </Modal>

      {/* modal pix */}
      <Modal isOpen={isModalOpenPix} onClose={() => setIsModalOpenPix(false)} width="max-w-md" className="bg-white rounded-lg">
        <div className="flex flex-col items-center py-4">
          <span className="text-2xl text-[var(--azulescuro)]">Realize o pagamento via Pix</span>

          {pixImage && <img src={pixImage} alt="QR Code" className="w-40 h-40 mt-4" />}

          <Input label="Código Copia e Cola" labelColor="[var(--azulescuro)]" value={pixCode} readOnly />

          <Button onClick={simularPagamento} className="mt-4" variant="primary">
            Simular Pagamento
          </Button>
        </div>
      </Modal>
    </form>
  );
}
