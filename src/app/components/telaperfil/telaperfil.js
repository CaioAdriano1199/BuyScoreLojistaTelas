"use client";
import { useState } from "react";
import Card from "../card/card";
import Button from "../button/button";
import CameraButton from "../CameraButton/CameraButton";
import Modal from "../modal/modal";
import Input from "../input/input";

/*  */

export default function Telaperfil() {
    const [lojista, setlojista] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modaleditarperfil = (lojista) => {
        setIsModalOpen(true);
    };

    return (
        <div className="p-8 flex items-center justify-center w-full flex-col">
            <h1 className="text-4xl font-bold mb-4 text-[var(--azulescuro)] p-20">Perfil</h1>
            <Card className="bg-[var(--branco)] p-4 space-y-4">
                <div>
                    <span className="text-[var(--azulescuro)]">Razão Social</span>
                    <span className="text-[var(--azulclaro)]">{lojista.razaoSocial}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Seguimento</span>
                    <span className="text-[var(--azulclaro)]">{lojista.seguimento}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Nome</span>
                    <span className="text-[var(--azulclaro)]">{lojista.nome}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Email</span>
                    <span className="text-[var(--azulclaro)]">{lojista.email}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">CEP</span>
                    <span className="text-[var(--azulclaro)]">{lojista.cep}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Logradouro</span>
                    <span className="text-[var(--azulclaro)]">{lojista.logradouro}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Complemento</span>
                    <span className="text-[var(--azulclaro)]">{lojista.complemento}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Bairro</span>
                    <span className="text-[var(--azulclaro)]">{lojista.bairro}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Cidade</span>
                    <span className="text-[var(--azulclaro)]">{lojista.cidade}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Número</span>
                    <span className="text-[var(--azulclaro)]">{lojista.numero}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">UF</span>
                    <span className="text-[var(--azulclaro)]">{lojista.uf}</span>
                </div>

                <div>
                    <span className="text-[var(--azulescuro)]">Foto</span>
                    <img src={lojista.fotoUsuario} alt={lojista.nome} className="w-20 h-20 rounded-full mt-2" />
                </div>
            </Card>

            <div className="flex ">
                <Button type="button" variant="primary" onClick={() => modaleditarperfil(lojista)}>Atualizar</Button>
                <Button type="button" variant="exit">Sair</Button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="max-w-md"
                className="bg-[var(--branco)] rounded-lg p-4 max-h-[90vh] overflow-y-auto"
            >
                <div className="grid grid-cols-5 gap-2 auto-rows-max">
                    <h2 className="text-2xl text-[var(--azulescuro)] font-bold text-center col-span-5 mb-4">Editar perfil</h2>
                    <Input labelColor="azulescuro"
                        label="Razão Social"
                        colSpan="col-span-5"
                        value={lojista.razaoSocial}
                        onChange={(e) =>
                            setlojista({ ...lojista, razaoSocial: e.target.value })
                        } />
                    <Input
                        labelColor="azulescuro"
                        label="Seguimento"
                        colSpan="col-span-5"
                        value={lojista.seguimento}
                        onChange={(e) =>
                            setlojista({ ...lojista, seguimento: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Nome"
                        colSpan="col-span-5"
                        value={lojista.nome}
                        onChange={(e) =>
                            setlojista({ ...lojista, nome: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Email"
                        colSpan="col-span-5"
                        value={lojista.email}
                        onChange={(e) =>
                            setlojista({ ...lojista, email: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="CEP"
                        colSpan="col-span-2"
                        value={lojista.cep}
                        onChange={(e) =>
                            setlojista({ ...lojista, cep: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Número"
                        colSpan="col-span-1"
                        value={lojista.numero}
                        onChange={(e) =>
                            setlojista({ ...lojista, numero: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Logradouro"
                        colSpan="col-span-5"
                        value={lojista.logradouro}
                        onChange={(e) =>
                            setlojista({ ...lojista, logradouro: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Complemento"
                        colSpan="col-span-5"
                        value={lojista.complemento}
                        onChange={(e) =>
                            setlojista({ ...lojista, complemento: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Bairro"
                        colSpan="col-span-3"
                        value={lojista.bairro}
                        onChange={(e) =>
                            setlojista({ ...lojista, bairro: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="Cidade"
                        colSpan="col-span-3"
                        value={lojista.cidade}
                        onChange={(e) =>
                            setlojista({ ...lojista, cidade: e.target.value })
                        }
                    />

                    <Input
                        labelColor="azulescuro"
                        label="UF"
                        colSpan="col-span-1"
                        value={lojista.uf}
                        onChange={(e) =>
                            setlojista({ ...lojista, uf: e.target.value })
                        }
                    />
                    <CameraButton
                        textolabel="Logo da loja"
                        labelcolor="azulescuro"
                        initialImage={lojista.fotoUsuario}
                        onImageChange={(novaImagem) =>
                            setlojista({ ...produtoSelecionado, fotoUsuario: novaImagem })
                        }
                    />
                </div>
                <Button type="button" variant="primary">Salvar</Button>
            </Modal>
        </div>

    );
}