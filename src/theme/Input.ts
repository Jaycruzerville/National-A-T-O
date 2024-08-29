export const Input = {
  variants: {
    "app-input": {
      field: {
        bg: "#FFF",
        w: "368px",
        h: "48px",
        px: "14px",
        py: "12px",
        color: "#003E51",
        fontSize: "14px",
        lineHeight: "24px",
        fontWeight: 400,
        borderRadius: "8px",
        border: "1px solid #D9DDE3",
        _disabled: {
          background: "#D3D3D3",
          border: "1px solid #D9DDE3",
          color: "#003E51",
          opacity: 1,
        },
        _invalid: {
          border: "2px solid red",
        },
      },
    },
    "form-input": {
      field: {
        border: "1px solid",
        borderColor: "gray.500",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        background: "#fff",
        focusBorderColor: "#0C288D",
        _placeholder: {
          color: "#003E51",
          fontWeight: "light",
          fontSize: "14px",
          opacity: 1,
        },
      },
    },
  },
}
