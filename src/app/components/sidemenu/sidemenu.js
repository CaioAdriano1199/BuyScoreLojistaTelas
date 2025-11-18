"use client";
import { useState } from "react";
import Button from "../button/button";
const imageSrc = "/favicon.ico";

//<Button type="button" variant="secondary" onClick={() => onSelect("estatisticas")} aria-current={currentView === "estatisticas" ? "page" : undefined} className="w-full py-5">Estatísticas</Button>
export default function Sidemenu({ currentView, onSelect }) {
    return (
        <div className="ml-[15%]">
            <div className="fixed top-0 left-0 bg-[var(--azulclaro)] flex flex-col items-center justify-between gap-4 h-screen w-[15%]">
                <div className="flex items-center justify-center h-30 mt-4 bg-[var(--branco)] rounded-full">
                    <img src={imageSrc} alt="Camera Icon" className="w-29 h-20 ml-1" />
                </div>

                <div className="flex flex-col justify-between w-full">
                    <Button type="button" variant="secondary" onClick={() => onSelect("pontuacao")} aria-current={currentView === "pontuacao" ? "page" : undefined} className="w-full py-5">Pontuação</Button>
                    <Button type="button" variant="secondary" className="w-full py-5" onClick={() => onSelect("Loja de pontos")}>Loja de pontos</Button>
                    
                </div>

                <Button type="button" variant="secondary" className="w-full py-5" onClick={() => onSelect("perfil")}>Perfil</Button>
            </div>
        </div>
    );
}