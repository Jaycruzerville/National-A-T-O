export const Input = {
  baseStyle: {
    field: {
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "gray.300",
      background: "white",
      _focus: {
        borderColor: "blue.500",
        boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.5)",
        outline: "none",
      },
      _hover: {
        borderColor: "gray.400",
      },
      _placeholder: {
        color: "gray.500",
      },
    },
  },
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
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        _focus: {
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.5)",
        },
        _disabled: {
          background: "#F9FAFB",
          border: "1px solid #D1D5DB",
          color: "#6B7280",
          opacity: 1,
        },
        _invalid: {
          borderColor: "red.500",
          boxShadow: "0 0 0 1px rgba(239, 68, 68, 0.5)",
        },
      },
    },
    "form-input": {
      field: {
        border: "1px solid",
        borderColor: "gray.300",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        background: "#fff",
        borderRadius: "8px",
        _focus: {
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.5)",
        },
        _placeholder: {
          color: "gray.500",
          fontSize: "14px",
          opacity: 1,
        },
      },
    },
  },
}
