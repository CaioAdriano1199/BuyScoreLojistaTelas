"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../input/input";
import Button from "../button/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
 try {
      const res = await fetch("/login/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (data.sucesso) {
        console.log("Login realizado com sucesso!");
        console.log("Token:", data.token);
        localStorage.setItem("token", data.token);
        router.push("/home");
      } else {
        setMensagem(data.mensagem || "Erro no login");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1 className="cursor-default text-3xl font-semibold text-center mb-2 text-[rgb(227,227,227)]">Login</h1>

      <Input
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu Email"
        required
      />

      <Input
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
        required
      />

      <Button type="submit" variant="primary" className="w-full mt-2">
        Login
      </Button>

      <p className="cursor-default text-sm text-center mt-2 text-[rgb(227,227,227)]">
        Não tem conta? cadastre-se{" "}
        <a href="/cadastro" className="cursor-pointer underline font-semibold">
           aqui!
        </a>
      </p>
    </form>
  );
}
