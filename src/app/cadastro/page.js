"use client";
import Image from "next/image";
import Card from "../components/card/card";
import CadastroForm from "../components/cadastroform/cadastroform";

export default function CadastroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Image src="/logo.png" alt="Logo" width={80} height={80} priority className="mb-4 w-32 h-auto" />
      <h1 className="text-2xl font-bold text-[rgb(0,65,100)] mb-6">Cadastro Lojista</h1>

      <Card className="rounded-2xl shadow-lg p-8 w-full max-w-lg mb-[5%]">
        <CadastroForm />
      </Card>
    </div>
  );
}
