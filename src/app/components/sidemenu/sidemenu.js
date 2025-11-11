"use client";
import { useState } from "react";
import Button from "../button/button";
const imageSrc = "/camera.svg";

export default function Sidemenu({ currentView, onSelect }) {
    return (
        <div className="bg-[var(--azulclaro)] flex flex-col items-center justify-between gap-4 h-screen w-[15%]">

            <img src={imageSrc} alt="Camera Icon" className="w-16 h-16 mb-4 mt-4" />

            <div className="flex flex-col justify-between w-full">
                <Button type="button" variant="secondary" onClick={() => onSelect("pontuacao")} aria-current={currentView === "pontuacao" ? "page" : undefined} className="w-full py-5">Pontuação</Button>
                <Button type="button" variant="secondary" className="w-full py-5" onClick={()=> onSelect("Loja de pontos")}>Loja de pontos</Button>
                <Button type="button" variant="secondary" onClick={() => onSelect("estatisticas")} aria-current={currentView === "estatisticas" ? "page" : undefined} className="w-full py-5">Estatisticas</Button>
            </div>

            <Button type="button" variant="secondary" className="w-full py-5">Perfil</Button>
        </div>

    );
}