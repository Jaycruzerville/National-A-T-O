import { glass } from "./customStyles"

export const Button = {
  baseStyle: {
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "14px",
    _focus: {
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
    },
  },
  variants: {
    "app-primary": {
      backgroundColor: "brand.primary",
      color: "#FFFFFF",
      borderRadius: "8px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      _hover: {
        backgroundColor: "brand.primary",
        opacity: 0.9,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        _disabled: {
          opacity: 0.5,
          backgroundColor: "brand.primary",
          cursor: "not-allowed",
        },
      },
      _active: {
        backgroundColor: "brand.primary",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
    },
    "app-secondary": {
      backgroundColor: "#FFFFFF",
      color: "brand.primary",
      border: "1px solid",
      borderColor: "gray.300",
      borderRadius: "8px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      _hover: {
        backgroundColor: "gray.50",
        borderColor: "gray.400",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
    },
    "app-danger": {
      backgroundColor: "#DC2626",
      color: "#FFFFFF",
      borderRadius: "8px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      _hover: {
        backgroundColor: "#B91C1C",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        _disabled: {
          opacity: 0.5,
          backgroundColor: "#DC2626",
          cursor: "not-allowed",
        },
      },
    },
    "app-safety": {
      backgroundColor: "#16A34A",
      color: "#FFFFFF",
      borderRadius: "8px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      _hover: {
        backgroundColor: "#15803D",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        _disabled: {
          opacity: 0.5,
          backgroundColor: "#16A34A",
          cursor: "not-allowed",
        },
      },
    },
    "app-iconButton": glass,
  },
  sizes: {
    xl: {
      h: "66px",
      fontSize: "26px",
      w: "179px",
      fontWeight: "bold",
    },
  },
}
