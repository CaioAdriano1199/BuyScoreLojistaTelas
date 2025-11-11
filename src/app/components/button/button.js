"use client";

export default function Button({
  children,
  id,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}) {
  const baseStyles =
    "px-4 py-2  ";

  const buttonId =
    id ||
    (typeof children === "string"
      ? children.toLowerCase().replace(/\s+/g, "-")
      : undefined);

  const variants = {
    primary:
      "bg-[var(--azulescuro)] font-medium rounded-md text-[rgb(227,227,227)] hover:bg-[var(--azulclaro)] focus:ring-blue-500 mx-auto block",
    secondary:
      "bg-[var(--azulclaro)] text-2xl text-[var(--branco)] hover:bg-[var(--branco)] hover:text-[var(--azulclaro)] w-full",
    terciary: "border-none bg-[var(--azulescuro)] text-1xl text-[var(--branco)] hover:bg-[var(--branco)] hover:text-[var(--azulescuro)] w-full",
    quadruple: "border-none bg-[var(--branco)] text-1xl text-[var(--azulescuro)] w-full",

    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
    >
      {children}
    </button>
  );
}
