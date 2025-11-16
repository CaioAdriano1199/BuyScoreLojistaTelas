"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../input/input";
import Button from "../button/button";
import Combobox from "../combobox/combobox";
import { top100Films, ufs } from "../combobox/comboboxdata";
import CameraButton from "../CameraButton/CameraButton";

export default function CadastroForm() {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nichoLoja, setNichoLoja] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
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

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const payload = {
      cnpj,
      razaoSocial,
      descricao: nichoLoja?.label || nichoLoja || "", 
      seguimento: nichoLoja?.label || nichoLoja || "",  
      nome,
      email,
      senha,
      perfilUsuario: 1,            
      fotoUsuario,                 
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      numero: Number(numero),
      uf: estado?.value || estado || "",
    };

    try {
      const res = await fetch("/cadastro/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Enviando JSON:", payload);
      if (!res.ok) {
        alert(data.mensagem || "Erro ao criar comércio");
        return;
      }

      alert("Comércio criado com sucesso!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar comércio");
    }
  };

  return (
    <form className="grid grid-cols-6 gap-4" onSubmit={handleSubmit}>
      <Input
        label="Razão Social"
        value={razaoSocial}
        onChange={(e) => setRazaoSocial(e.target.value)}
        colSpan="col-span-3"
      />
      <Combobox
        label="Nicho da Loja"
        options={top100Films}
        value={nichoLoja}
        onChange={(newValue) => setNichoLoja(newValue)}
        colSpan="col-span-3"
      />

      <Input
        label="Nome do Responsável"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        colSpan="col-span-3"
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        colSpan="col-span-3"
      />
      <Input
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        colSpan="col-span-3"
      />
      <Input
        label="Confirmar Senha"
        type="password"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        colSpan="col-span-3"
      />

      <Input
        label="CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        colSpan="col-span-3"
      />
      <Input
        label="CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        colSpan="col-span-2"
      />
      <Input
        label="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        colSpan="col-span-1"
      />
      <Input
        label="Logradouro"
        value={logradouro}
        onChange={(e) => setLogradouro(e.target.value)}
        colSpan="col-span-3"
      />
      <Input
        label="Complemento"
        value={complemento}
        onChange={(e) => setComplemento(e.target.value)}
        colSpan="col-span-3"
      />
      <Input
        label="Bairro"
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        colSpan="col-span-2"
      />
      <Input
        label="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        colSpan="col-span-2"
      />
      <Combobox
        label="UF"
        options={ufs}
        value={estado}
        onChange={(newValue) => setEstado(newValue)}
        colSpan="col-span-1"
      />

      <div className="flex justify-center items-center col-span-4">
        <CameraButton
          textolabel="Foto do Responsável"
          onImageChange={(base64) => setfotoUsuario(base64)}
        />
      </div>

      <div className="col-span-6 flex justify-center">
        <Button type="submit" variant="primary" className="w-1/2">
          Cadastrar
        </Button>
      </div>

      <p className="text-sm text-center mt-2 text-[rgb(227,227,227)] col-span-6">
        Já possui uma conta? Realize o login{" "}
        <a href="/login" className="underline font-semibold">
          aqui!
        </a>
      </p>
    </form>
  );
}
