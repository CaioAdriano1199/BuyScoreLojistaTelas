"use client";
import { useRef, useState, useEffect } from "react"; // ✅ adicionar useEffect
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
    setSelectedImage(initialImage); // atualiza imagem se mudar o produto
  }, [initialImage]);

  const handleClick = () => fileInputRef.current.click();

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      onImageChange && onImageChange(base64String);
    };
    reader.readAsDataURL(file);
  }
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
      <label className={`block mb-1 text-sm font-medium ${labelColors[labelcolor] || labelColors.branco} flex self-start`}>
        {textolabel}
      </label>
      <Button
        type="button"
        onClick={handleClick}
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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
