"use client";
import TextField from '@mui/material/TextField';
export default function Input({
  label,
  id,
  name,
  type = "text",
  value,
  colSpan = "col-span-1",
  onChange,
  className = "",
  placeholder = "",
  required = false,
  autoComplete = "off",
  error,
  labelColor = "branco",
}) {
  // gera um id a partir do label/name se não for passado
  const inputId = id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  const labelColors = {
    azulclaro: "text-[var(--azulclaro)]",
    azulescuro: "text-[var(--azulescuro)]",
    branco: "text-[var(--branco)]",
    cinza: "text-[var(--cinza)]",
    preto: "text-[var(--preto)]",
  };

  const baseStyles = `block mb-1 text-sm font-medium ${labelColors[labelColor] || labelColors.branco}`;

  return (
    <div className={`mb-4 ${colSpan}`}>
      {label && (
        <label htmlFor={inputId} className={baseStyles}>
          {label}
        </label>
      )}



      <TextField
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        size="small"
        className={`w-full p-2 border rounded-md bg-[rgb(227,227,227)] text-[rgb(0,0,0)] focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${error ? "border-red-500" : "border-gray-300"}`}
        
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
