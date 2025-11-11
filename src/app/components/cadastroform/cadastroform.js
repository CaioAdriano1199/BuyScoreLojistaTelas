"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../input/input";
import Button from "../button/button";
import Combobox from "../combobox/combobox";
import { top100Films, ufs } from "../combobox/comboboxdata";
import CameraButton from "../cameraButton/CameraButton";
import { Router } from "next/router";

export default function CadastroForm() {
  const [isFranqueado, setIsFranqueado] = useState(false);
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nichoLoja, setNichoLoja] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cnpjMatriz, setCnpjMatriz] = useState("");
  const [codigoVerificacao, setCodigoVerificacao] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      razaoSocial,
      nichoLoja,
      email,
      celular,
      cnpj,
      cep,
      logradouro,
      numero,
      cidade,
      estado,
      senha,
      confirmarSenha,
      isFranqueado,
      cnpjMatriz,
      codigoVerificacao,
    };

    try {
      const res = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(result?.mensagem ?? "Erro ao cadastrar");
      }

      if (result?.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        alert("Cadastro realizado com sucesso!");
        router.push("/login");
      }

      

    } catch (error) {
      console.error(error);
      alert(error.message ?? "Erro ao cadastrar!");
    }
  };

  return (
    <form className="grid grid-cols-6 gap-4">

      <Input label="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} colSpan="col-span-3" />
      <Combobox label="Nicho da Loja" options={top100Films} value={nichoLoja} onChange={(newValue) => setNichoLoja(newValue?.label || null)} colSpan="col-span-3" />

      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} colSpan="col-span-3" />
      <Input label="Celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} colSpan="col-span-3" />
      <Input label="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} colSpan="col-span-3" />
      <Input label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} colSpan="col-span-2" />
      <Input label="Número" value={numero} onChange={(e) => setNumero(e.target.value)} colSpan="col-span-1" />
      <Input label="Logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} colSpan="col-span-3" />
      <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} colSpan="col-span-2" />
      <Combobox label="UF" options={ufs} value={estado} onChange={(newValue) => setEstado(newValue?.value || null)} colSpan="col-span-1" />

      <div className="flex flex-col gap-4 col-span-2">
        <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <Input label="Confirmar Senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
      </div>

      <div className="flex justify-center items-center col-span-4">
        <CameraButton textolabel="Logo" />
      </div>

      <label className="flex items-center gap-2 text-[rgb(227,227,227)] col-span-4 mt-2">
        <input
          type="checkbox"
          checked={isFranqueado}
          onChange={() => setIsFranqueado(!isFranqueado)}
          className="w-4 h-4"
        />
        É um franqueado?
      </label>

      {isFranqueado && (
        <>
          <Input label="CNPJ da Matriz" value={cnpjMatriz} onChange={(e) => setCnpjMatriz(e.target.value)} colSpan="col-span-3" />
          <Input label="Código de verificação" value={codigoVerificacao} onChange={(e) => setCodigoVerificacao(e.target.value)} colSpan="col-span-3" />
          <div className="col-span-6 flex justify-center">
            <Button variant="primary" className="w-1/2">Enviar código</Button>
          </div>
        </>
      )}

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
