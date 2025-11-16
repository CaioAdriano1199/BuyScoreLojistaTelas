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

  // Função para comprimir e converter a imagem em Base64
const compressImage = (file, maxSize = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new globalThis.Image(); // <-- AQUI!
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL("image/jpeg", quality);
        resolve(base64);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};


  const labelColors = {
    azulclaro: "text-[var(--azulclaro)]",
    azulescuro: "text-[var(--azulescuro)]",
    branco: "text-[var(--branco)]",
    cinza: "text-[var(--cinza)]",
    preto: "text-[var(--preto)]",
  };

  return (
<div className="flex flex-col items-center w-full">
  <label
    className={`block mb-2 text-sm font-medium ${labelColors[labelcolor] || labelColors.branco} text-center w-full`}
  >
    {textolabel}
  </label>

  <Button
    type="button"
    onClick={() => fileInputRef.current.click()}
    variant="outline"
    className="w-32 h-32 rounded-[10] flex items-center justify-center overflow-hidden bg-gray-100 hover:bg-gray-200"
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

  {/* URL manual */}
  <input
    type="text"
    placeholder="Cole o link da imagem"
    value={selectedImage || ""}
    onChange={(e) => {
      setSelectedImage(e.target.value);
      onImageChange && onImageChange(e.target.value);
    }}
    className=" p-2 mt-2 w-full rounded text-center bg-[var(--branco)]"
  />

  {/* INPUT DE IMAGEM */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={async (e) => {
      const file = e.target.files[0];
      if (file) {
        // Comprimir e converter para Base64
        const base64 = await compressImage(file);

        setSelectedImage(base64);

        // Retorna a imagem comprimida em Base64
        onImageChange && onImageChange(base64);
      }
    }}
    className="hidden"
  />
</div>

  );
}
