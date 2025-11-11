"use client";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[rgb(1,109,167)] rounded-md shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}
