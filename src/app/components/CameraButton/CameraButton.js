"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Button from "../button/button";

export default function CameraButton({
  textolabel = "",
  labelcolor = "branco",
  initialImage = null,
  onImageChange
}) {
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelectedImage(initialImage);
  }, [initialImage]);

  // Apenas atualiza a imagem via URL
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setSelectedImage(url);
    onImageChange && onImageChange(url);
  };

  const labelColors = {
    azulclaro: "text-[var(--azulclaro)]",
    azulescuro: "text-[var(--azulescuro)]",
    branco: "text-[var(--branco)]",
    cinza: "text-[var(--cinza)]",
    preto: "text-[var(--preto)]",
  };

  return (
    <div className="flex flex-col items-center">
      <label
        className={`block mb-1 text-sm font-medium ${
          labelColors[labelcolor] || labelColors.branco
        } flex self-start`}
      >
        {textolabel}
      </label>

      <Button
        type="button"
        onClick={() => fileInputRef.current.click()}
        variant="outline"
        className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden bg-gray-100 hover:bg-gray-200"
      >
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Imagem selecionada"
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        ) : (
          <Image
            src="/camera.svg"
            alt="Ícone de câmera"
            width={40}
            height={40}
            className="opacity-70"
          />
        )}
      </Button>

      {/* Input de URL da imagem */}
      <input
        type="text"
        placeholder="Cole o link da imagem"
        value={selectedImage || ""}
        onChange={handleUrlChange}
        className="border p-2 mt-2 w-full rounded"
      />

      {/* Mantém input file caso queira usar upload real */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setSelectedImage(url);
            onImageChange && onImageChange(url);
          }
        }}
        className="hidden"
      />
    </div>
  );
}
