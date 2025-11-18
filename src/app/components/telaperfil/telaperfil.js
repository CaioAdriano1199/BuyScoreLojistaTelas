"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../card/card";
import Button from "../button/button";
import CameraButton from "../CameraButton/CameraButton";
import Modal from "../modal/modal";
import Input from "../input/input";
import Combobox from "../combobox/combobox";
import { top100Films, ufs } from "../combobox/comboboxdata";

async function atualizarComercio(comercioAtualizado) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/comercio", {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comercioAtualizado),
    });

    const data = await response.json();
    return data;
}


async function buscarMeuComercio() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/comercio", {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data;
}


export default function Telaperfil() {
    const [lojista, setlojista] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const modaleditarperfil = (lojista) => {
        setIsModalOpen(true);
    };

    function logout() {
        localStorage.clear();
        router.push("/login");
    };

    useEffect(() => {
        buscarMeuComercio().then((res) => {
            if (res.sucesso) {
                setlojista(res.comercio);
            }
        });
    }, []);

    return (
        <div className="p-8 flex items-center justify-center w-full flex-col">
            <h1 className="cursor-default text-4xl font-bold mb-4 text-[var(--azulescuro)] p-4">Perfil</h1>
            <Card className="bg-[var(--branco)] w-[80%] grid grid-cols-6 gap-4 p-4 space-y-4">
                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Razão Social</span>
                    <span className="text-[var(--azulclaro)]">{lojista.razaoSocial}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Seguimento</span>
                    <span className="text-[var(--azulclaro)]">{lojista.seguimento}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Nome</span>
                    <span className="text-[var(--azulclaro)]">{lojista.nome}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Email</span>
                    <span className="text-[var(--azulclaro)]">{lojista.email}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">CEP</span>
                    <span className="text-[var(--azulclaro)]">{lojista.cep}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Logradouro</span>
                    <span className="text-[var(--azulclaro)]">{lojista.logradouro}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Complemento</span>
                    <span className="text-[var(--azulclaro)]">{lojista.complemento}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Bairro</span>
                    <span className="text-[var(--azulclaro)]">{lojista.bairro}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Cidade</span>
                    <span className="text-[var(--azulclaro)]">{lojista.cidade}</span>
                </div>

                <div className="cursor-default cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">Número</span>
                    <span className="text-[var(--azulclaro)]">{lojista.numero}</span>
                </div>

                <div className="cursor-default flex flex-col col-span-3">
                    <span className="text-[var(--azulescuro)]">UF</span>
                    <span className="text-[var(--azulclaro)]">{lojista.uf}</span>
                </div>

                <div className="col-span-6">
                    <span className="cursor-default text-[var(--azulescuro)]">Foto</span>
                    <img src={lojista.fotoUsuario} alt={lojista.nome} className="w-20 h-20 rounded-[6] mt-2" />
                </div>
            </Card>

            <div className="flex gap-4 mt-10">
                <Button type="button" variant="primary" onClick={() => modaleditarperfil(lojista)}>Atualizar</Button>
                <Button type="button" variant="exit" onClick={() => logout()}>Sair</Button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="max-w-md"
                className="bg-[var(--branco)] rounded-lg p-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                <div className="grid grid-cols-6 gap-3 auto-rows-max">

                    {/* TITULO */}
                    <h2 className="text-2xl text-[var(--azulescuro)] font-bold text-center col-span-6 mb-2">
                        Editar perfil
                    </h2>

                    {/* RAZÃO SOCIAL */}
                    <Input
                        labelColor="azulescuro"
                        label="Razão Social"
                        colSpan="col-span-6"
                        value={lojista.razaoSocial}
                        onChange={(e) => setlojista({ ...lojista, razaoSocial: e.target.value })}
                    />

                    {/* NICHO LOJA */}
                    <Combobox
                        label="seguimento"
                        labelcolor="var(--azulescuro)"
                        options={top100Films}
                        value={lojista.seguimento}
                        onChange={(value) => setlojista({ ...lojista, seguimento: value })}
                        colSpan="col-span-3"
                    />

                    {/* NOME */}
                    <Input
                        labelColor="azulescuro"
                        label="Nome"
                        colSpan="col-span-6"
                        value={lojista.nome}
                        onChange={(e) => setlojista({ ...lojista, nome: e.target.value })}
                    />

                    {/* EMAIL */}
                    <Input
                        labelColor="azulescuro"
                        label="Email"
                        colSpan="col-span-6"
                        value={lojista.email}
                        onChange={(e) => setlojista({ ...lojista, email: e.target.value })}
                    />

                    {/* CEP */}
                    <Input
                        labelColor="azulescuro"
                        label="CEP"
                        colSpan="col-span-2"
                        value={lojista.cep}
                        onChange={(e) => setlojista({ ...lojista, cep: e.target.value })}
                    />

                    {/* NUMERO */}
                    <Input
                        labelColor="azulescuro"
                        label="Número"
                        colSpan="col-span-2"
                        value={lojista.numero}
                        onChange={(e) => setlojista({ ...lojista, numero: e.target.value })}
                    />

                    {/* UF */}
                    <Combobox
                        label="UF"
                        labelcolor="var(--azulescuro)"
                        options={ufs}
                        value={lojista.uf}
                        onChange={(value) => setlojista({ ...lojista, uf: value })}
                        colSpan="col-span-2"
                    />

                    {/* LOGRADOURO */}
                    <Input
                        labelColor="azulescuro"
                        label="Logradouro"
                        colSpan="col-span-6"
                        value={lojista.logradouro}
                        onChange={(e) => setlojista({ ...lojista, logradouro: e.target.value })}
                    />

                    {/* COMPLEMENTO */}
                    <Input
                        labelColor="azulescuro"
                        label="Complemento"
                        colSpan="col-span-6"
                        value={lojista.complemento}
                        onChange={(e) => setlojista({ ...lojista, complemento: e.target.value })}
                    />

                    {/* BAIRRO */}
                    <Input
                        labelColor="azulescuro"
                        label="Bairro"
                        colSpan="col-span-3"
                        value={lojista.bairro}
                        onChange={(e) => setlojista({ ...lojista, bairro: e.target.value })}
                    />

                    {/* CIDADE */}
                    <Input
                        labelColor="azulescuro"
                        label="Cidade"
                        colSpan="col-span-3"
                        value={lojista.cidade}
                        onChange={(e) => setlojista({ ...lojista, cidade: e.target.value })}
                    />

                    {/* LOGO DA LOJA */}
                    <div className="col-span-6 flex justify-center">
                        <CameraButton
                            textolabel="Logo da loja"
                            labelcolor="azulescuro"
                            initialImage={lojista.fotoUsuario}
                            onImageChange={(base64) =>
                                setlojista({ ...lojista, fotoUsuario: base64 })
                            }
                        />
                    </div>
                </div>

                <Button
                    type="button"
                    variant="primary"
                    className="mt-4 w-full"
                    onClick={async () => {
                        try {
                            const res = await atualizarComercio(lojista);
                            if (res.sucesso) {
                                setlojista(res.comercio); 
                                setIsModalOpen(false);    
                                alert("Perfil atualizado com sucesso!");
                            } else {
                                alert(res.mensagem || "Erro ao atualizar o comércio");
                            }
                        } catch (err) {
                            console.error(err);
                            alert("Erro de comunicação com o servidor");
                        }
                    }}
                >
                    Salvar
                </Button>

            </Modal>

        </div>

    );
}