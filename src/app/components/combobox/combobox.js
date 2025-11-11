"use client";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Combobox({
  label,
  id,
  labelcolor = "var(--branco)",
  name,
  value,
  onChange,
  colSpan = "col-span-1",
  options = [],
  className = "",
  placeholder = "",
  required = false,
  error,
}) {
  const inputId =
    id || name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`mb-4 ${colSpan}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-1 text-sm font-medium text-[${labelcolor}]`}
        >
          {label}
        </label>
      )}

      <Autocomplete
        id={inputId}
        name={name}
        value={value}
        disableClearable
        options={options}
        onChange={(event, newValue) => onChange?.(newValue?.value || "")}
        size="small"
        className={className}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.5rem", // rounded-md
            backgroundColor: "white",
            color: "black",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9ca3af", // gray-400
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2563eb", // blue-600
              boxShadow: "0 0 0 2px rgba(37,99,235,0.3)",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d5db", // gray-300
          },
          "& .MuiInputBase-input": {
            padding: "8px 12px",
            fontSize: "0.875rem",
          },
          "& .MuiAutocomplete-popupIndicator": {
            color: "#4b5563", // seta cinza escuro
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            required={required}
            error={!!error}
            helperText={error}
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}
