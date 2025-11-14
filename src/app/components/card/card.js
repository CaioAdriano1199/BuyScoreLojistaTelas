"use client";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[var(--azulclaro)] rounded-md shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
