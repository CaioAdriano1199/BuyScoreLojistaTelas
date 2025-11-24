"use client";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function Combobox({
  label,
  id,
  labelcolor = "var(--branco)",
  backgroundColor = "var(--branco)",
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
        onChange={(event, newValue) => onChange?.(newValue)}
        getOptionLabel={(option) => {
          if (option == null) return "";              
          if (typeof option === "string") return option;
          if (typeof option === "number") return option.toString();
          return option.label ?? "";                   
        }}
        size="small"
        className={className}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "",
            backgroundColor: `${backgroundColor}`,
            color: "black",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--cinza)",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d5db", // gray-300
          },
          "& .MuiInputBase-input": {
            padding: "px 12px",
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
